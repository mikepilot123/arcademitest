if (!customElements.get('media-gallery')) {
  customElements.define(
    'media-gallery',
    class MediaGallery extends HTMLElement {
      constructor() {
        super();
        this.elements = {
          liveRegion: this.querySelector('[id^="GalleryStatus"]'),
          viewer: this.querySelector('[id^="GalleryViewer"]'),
          thumbnails: this.querySelector('[id^="GalleryThumbnails"]'),
        };
        this.mql = window.matchMedia('(min-width: 750px)');
        
        // Always set up the viewer event listener if it exists
        if (this.elements.viewer) {
          this.elements.viewer.addEventListener('slideChanged', this.debounce(this.onSlideChanged.bind(this), 500));
        }

        // Set up thumbnail click handlers if thumbnails exist
        if (this.elements.thumbnails) {
          this.setupThumbnailListeners();
          if (this.dataset.desktopLayout && this.dataset.desktopLayout.includes('thumbnail') && this.mql.matches) {
            this.removeListSemantic();
          }
        }
        
        // Initialize retail product display
        this.initRetailProductDisplay();
      }
      
      initRetailProductDisplay() {
        const isRetailProduct = document.querySelector('.retail-product, .retail-products');
        if (isRetailProduct && this.elements.viewer) {
          // Hide all media items except the active one
          const allMediaItems = this.elements.viewer.querySelectorAll('.product__media-item');
          let activeMediaItem = this.elements.viewer.querySelector('.product__media-item.is-active');
          
          // If no active item is found, make the first item active
          if (!activeMediaItem && allMediaItems.length > 0) {
            activeMediaItem = allMediaItems[0];
            activeMediaItem.classList.add('is-active');
            
            // Update thumbnail to reflect the active state
            if (this.elements.thumbnails) {
              const firstThumbnail = this.elements.thumbnails.querySelector('button');
              if (firstThumbnail) {
                firstThumbnail.setAttribute('aria-current', 'true');
              }
            }
          }
          
          allMediaItems.forEach((item) => {
            if (item !== activeMediaItem) {
              item.style.display = 'none';
            }
          });
          
          if (activeMediaItem) {
            activeMediaItem.style.display = 'block';
          }
        }
      }

      setupThumbnailListeners() {
        const thumbnailElements = this.elements.thumbnails.querySelectorAll('[data-target]');
        thumbnailElements.forEach((mediaToSwitch) => {
          const button = mediaToSwitch.querySelector('button');
          if (button && mediaToSwitch.dataset.target) {
            button.addEventListener('click', this.setActiveMedia.bind(this, mediaToSwitch.dataset.target, false));
          }
        });
      }

      onSlideChanged(event) {
        if (!this.elements.thumbnails) return;
        
        const thumbnail = this.elements.thumbnails.querySelector(
          `[data-target="${event.detail.currentElement.dataset.mediaId}"]`
        );
        this.setActiveThumbnail(thumbnail);
      }

      setActiveMedia(mediaId, prepend) {
        if (!this.elements.viewer) return;
        
        const activeMedia =
          this.elements.viewer.querySelector(`[data-media-id="${mediaId}"]`) ||
          this.elements.viewer.querySelector('[data-media-id]');
        if (!activeMedia) {
          return;
        }
        
        // Remove active class from all media elements
        this.elements.viewer.querySelectorAll('[data-media-id]').forEach((element) => {
          element.classList.remove('is-active');
        });
        activeMedia.classList.add('is-active');

        // Force a reflow to ensure class changes are processed immediately
        activeMedia.offsetHeight;
        
        // Additional fix for retail products: ensure only one image is visible
        const isRetailProduct = document.querySelector('.retail-product, .retail-products');
        if (isRetailProduct) {
          // Hide all media items first
          this.elements.viewer.querySelectorAll('.product__media-item').forEach((element) => {
            element.style.display = 'none';
          });
          // Show only the active media item
          const activeMediaItem = activeMedia.closest('.product__media-item');
          if (activeMediaItem) {
            activeMediaItem.style.display = 'block';
          }
        }

        if (prepend) {
          if (activeMedia.parentElement.firstChild !== activeMedia) {
            activeMedia.parentElement.prepend(activeMedia);
          }

          if (this.elements.thumbnails) {
            const activeThumbnail = this.elements.thumbnails.querySelector(`[data-target="${mediaId}"]`);
            if (activeThumbnail && activeThumbnail.parentElement.firstChild !== activeThumbnail) {
              activeThumbnail.parentElement.prepend(activeThumbnail);
            }
          }

          if (this.elements.viewer.resetPages) this.elements.viewer.resetPages();
        }

        this.preventStickyHeader();
        window.setTimeout(() => {
          if (!this.mql.matches || this.elements.thumbnails) {
            activeMedia.parentElement.scrollTo({ left: activeMedia.offsetLeft });
          }
          const activeMediaRect = activeMedia.getBoundingClientRect();
          // Don't scroll if the image is already in view
          if (activeMediaRect.top > -0.5) return;
          const top = activeMediaRect.top + window.scrollY;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }, 16);
        this.playActiveMedia(activeMedia);

        if (this.elements.thumbnails) {
          const activeThumbnail = this.elements.thumbnails.querySelector(`[data-target="${mediaId}"]`);
          if (activeThumbnail) {
            this.setActiveThumbnail(activeThumbnail);
            this.announceLiveRegion(activeMedia, activeThumbnail.dataset.mediaPosition);
          }
        }
      }

      setActiveThumbnail(thumbnail) {
        if (!this.elements.thumbnails || !thumbnail) return;

        this.elements.thumbnails
          .querySelectorAll('button')
          .forEach((element) => element.removeAttribute('aria-current'));
        thumbnail.querySelector('button').setAttribute('aria-current', true);

        // Force sync of media activation with thumbnail state
        const mediaId = thumbnail.dataset.target;
        if (mediaId) {
          const targetMedia = this.elements.viewer ? this.elements.viewer.querySelector(`[data-media-id="${mediaId}"]`) : null;
          if (targetMedia && !targetMedia.classList.contains('is-active')) {
            console.log('🔄 Syncing media activation with thumbnail:', mediaId);
            this.setActiveMedia(mediaId, false);
          }
        }        
        // Check if thumbnail slider has the isSlideVisible method and slider property
        if (this.elements.thumbnails.isSlideVisible && this.elements.thumbnails.isSlideVisible(thumbnail, 10)) return;

        // Use the slider component's scroll method if available, otherwise use direct scrollTo
        if (this.elements.thumbnails.slider) {
          this.elements.thumbnails.slider.scrollTo({ left: thumbnail.offsetLeft });
        } else {
          // Fallback to scrolling the thumbnail container directly
          const thumbnailSlider = this.elements.thumbnails.querySelector('[id^="Slider-Thumbnails"]');
          if (thumbnailSlider) {
            thumbnailSlider.scrollTo({ left: thumbnail.offsetLeft, behavior: 'smooth' });
          }
        }
      }

      announceLiveRegion(activeItem, position) {
        const image = activeItem.querySelector('.product__modal-opener--image img');
        if (!image) return;
        image.onload = () => {
          this.elements.liveRegion.setAttribute('aria-hidden', false);
          this.elements.liveRegion.innerHTML = window.accessibilityStrings.imageAvailable.replace('[index]', position);
          setTimeout(() => {
            this.elements.liveRegion.setAttribute('aria-hidden', true);
          }, 2000);
        };
        image.src = image.src;
      }

      playActiveMedia(activeItem) {
        window.pauseAllMedia();
        const deferredMedia = activeItem.querySelector('.deferred-media');
        if (deferredMedia) deferredMedia.loadContent(false);
      }

      preventStickyHeader() {
        this.stickyHeader = this.stickyHeader || document.querySelector('sticky-header');
        if (!this.stickyHeader) return;
        this.stickyHeader.dispatchEvent(new Event('preventHeaderReveal'));
      }

      removeListSemantic() {
        if (!this.elements.viewer.slider) return;
        this.elements.viewer.slider.setAttribute('role', 'presentation');
        this.elements.viewer.sliderItems.forEach((slide) => slide.setAttribute('role', 'presentation'));
      }

      debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
          const later = () => {
            clearTimeout(timeout);
            func(...args);
          };
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
        };
      }
    }
  );
}
