if (!customElements.get('product-form')) {
  customElements.define(
    'product-form',
    class ProductForm extends HTMLElement {
      constructor() {
        super();

        this.form = this.querySelector('form');
        this.variantIdInput.disabled = false;
        this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
        this.cart = document.querySelector('cart-notification') || document.querySelector('cart-drawer');
        this.submitButton = this.querySelector('[type="submit"]');
        this.submitButtonText = this.submitButton.querySelector('span');

        if (document.querySelector('cart-drawer')) this.submitButton.setAttribute('aria-haspopup', 'dialog');

        this.hideErrors = this.dataset.hideErrors === 'true';
      }

      onSubmitHandler(evt) {
        evt.preventDefault();
        if (this.submitButton.getAttribute('aria-disabled') === 'true') return;

        this.handleErrorMessage();

        this.submitButton.setAttribute('aria-disabled', true);
        this.submitButton.classList.add('loading');
        this.querySelector('.loading__spinner').classList.remove('hidden');

        const config = fetchConfig('javascript');
        config.headers['X-Requested-With'] = 'XMLHttpRequest';
        delete config.headers['Content-Type'];

        const formData = new FormData(this.form);
        if (this.cart) {
          formData.append(
            'sections',
            this.cart.getSectionsToRender().map((section) => section.id)
          );
          formData.append('sections_url', window.location.pathname);
          this.cart.setActiveElement(document.activeElement);
        }
        config.body = formData;

        fetch(`${routes.cart_add_url}`, config)
          .then((response) => response.json())
          .then((response) => {
            if (response.status) {
              publish(PUB_SUB_EVENTS.cartError, {
                source: 'product-form',
                productVariantId: formData.get('id'),
                errors: response.errors || response.description,
                message: response.message,
              });
              this.handleErrorMessage(response.description);

              const soldOutMessage = this.submitButton.querySelector('.sold-out-message');
              if (!soldOutMessage) return;
              this.submitButton.setAttribute('aria-disabled', true);
              this.submitButtonText.classList.add('hidden');
              soldOutMessage.classList.remove('hidden');
              this.error = true;
              return;
            } else if (!this.cart) {
              window.location = window.routes.cart_url;
              return;
            }

            if (!this.error)
              publish(PUB_SUB_EVENTS.cartUpdate, {
                source: 'product-form',
                productVariantId: formData.get('id'),
                cartData: response,
              });
            this.error = false;
            const quickAddModal = this.closest('quick-add-modal');
            if (quickAddModal) {
              const isRetailProduct = document.querySelector('.retail-product, .retail-products');
              document.body.addEventListener(
                'modalClosed',
                () => {
                  setTimeout(() => {
                    if (isRetailProduct) {
                      // For retail products, use the custom cart drawer
                      document.body.classList.add("js-drawer-open-right");
                      const priceSection = document.querySelector('.price-sec');
                      const shippingSection = document.querySelector('.shipping');
                      const emptySection = document.querySelector('.cart-drawer-empty');
                      if (priceSection) priceSection.style.display = 'block';
                      if (shippingSection) shippingSection.style.display = 'block';
                      if (emptySection) emptySection.style.display = 'none';
                      
                      if (typeof updateCart === 'function') {
                        updateCart();
                      }
                    } else {
                      this.cart.renderContents(response);
                    }
                  });
                },
                { once: true }
              );
              quickAddModal.hide(true);
            } else {
              // Check if this is a retail product
              const isRetailProduct = document.querySelector('.retail-product, .retail-products');
              if (isRetailProduct) {
                // For retail products, use the custom cart drawer
                document.body.classList.add("js-drawer-open-right");
                // Show price section and hide empty state
                const priceSection = document.querySelector('.price-sec');
                const shippingSection = document.querySelector('.shipping');
                const emptySection = document.querySelector('.cart-drawer-empty');
                if (priceSection) priceSection.style.display = 'block';
                if (shippingSection) shippingSection.style.display = 'block';
                if (emptySection) emptySection.style.display = 'none';
                
                // Update cart contents if updateCart function exists
                if (typeof updateCart === 'function') {
                  updateCart();
                } else {
                  // Fallback: fetch cart data and update
                  fetch('/cart.js')
                    .then(response => response.json())
                    .then(cartData => {
                      // Trigger a custom event or directly update the cart UI
                      const event = new CustomEvent('cartUpdated', { detail: cartData });
                      document.dispatchEvent(event);
                    });
                }
              } else {
                // For non-retail products, use the standard cart drawer
                this.cart.renderContents(response);
              }
            }
          })
          .catch((e) => {
            console.error(e);
          })
          .finally(() => {
            this.submitButton.classList.remove('loading');
            if (this.cart && this.cart.classList.contains('is-empty')) this.cart.classList.remove('is-empty');
            if (!this.error) this.submitButton.removeAttribute('aria-disabled');
            this.querySelector('.loading__spinner').classList.add('hidden');
          });
      }

      handleErrorMessage(errorMessage = false) {
        if (this.hideErrors) return;

        this.errorMessageWrapper =
          this.errorMessageWrapper || this.querySelector('.product-form__error-message-wrapper');
        if (!this.errorMessageWrapper) return;
        this.errorMessage = this.errorMessage || this.errorMessageWrapper.querySelector('.product-form__error-message');

        this.errorMessageWrapper.toggleAttribute('hidden', !errorMessage);

        if (errorMessage) {
          this.errorMessage.textContent = errorMessage;
        }
      }

      toggleSubmitButton(disable = true, text) {
        if (disable) {
          this.submitButton.setAttribute('disabled', 'disabled');
          if (text) this.submitButtonText.textContent = text;
        } else {
          this.submitButton.removeAttribute('disabled');
          this.submitButtonText.textContent = window.variantStrings.addToCart;
        }
      }

      get variantIdInput() {
        return this.form.querySelector('[name=id]');
      }
    }
  );
}
