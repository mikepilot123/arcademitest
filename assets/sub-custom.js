$('.footer-block__image-wrapper').click(function(){
     $("html").animate({ scrollTop: 0 }, "slow");
});
$(document).on("click", ".sub_custom_widget .cms_box", function(event) { 
    var inputElement = $(this).find('input');
    
    if (inputElement.is(':checked')) {
        // Uncheck all inputs within the closest .sub_custom_widget
        $(this).closest('.sub_custom_widget').find('input').prop('checked', false);
    } else {      
       $(".message_pop_up .custom-model-main").addClass('model-open');
       $(this).closest('.sub_custom_widget').find('input').prop('checked', true);
    }
});

$(".close-btn, .bg-overlay").click(function(){
  $(".custom-model-main").removeClass('model-open');
});



$(document).on("click",".btn_wrap_login .cartbuttonnew",function(e) {
  e.preventDefault();
  console.log('Checkout button clicked for non-logged-in user - checking cart instantly');
  
  // Check cart contents instantly using synchronous approach
  var cartIsRetailOnly = true;
  var hasItems = false;
  
  // Get current cart data immediately
  $.ajax({
    url: '/cart.js',
    type: 'GET',
    dataType: 'JSON',
    async: false, // Make synchronous for instant response
    success: function(cartData) {
      if (!cartData.items || cartData.items.length === 0) {
        cartIsRetailOnly = false;
      } else {
        hasItems = true;
        for (var i = 0; i < cartData.items.length; i++) {
          var item = cartData.items[i];
          var itemIsRetail = (item.properties && item.properties['_is_retail'] === 'true');
          if (!itemIsRetail) {
            cartIsRetailOnly = false;
            break;
          }
        }
      }
    },
    error: function() {
      console.log('Error checking cart, defaulting to login modal');
      cartIsRetailOnly = false;
    }
  });
  
  // Decide action based on cart contents
  if (cartIsRetailOnly && hasItems) {
    console.log('Cart contains only retail products - going directly to checkout');
    window.location.href = "/checkout";
  } else {
    console.log('Cart contains non-retail products or is empty - showing login modal');
    $(".account_pp .custom-model-main").addClass('model-open');
  }
});




$(document).ready(function(){

var cartdrawer=$(".cart-drawer").attr("cart_drawer_on");
if(cartdrawer == 'true'){
$(".header__icon.header__icon--cart").addClass("site-header__cart");
$(".cart_button_custom").addClass("cart_drawer_custom_code");
$(".cart_button_custom").removeClass("redirecttocart");
}
else{
$(".header__icon.header__icon--cart").removeClass("site-header__cart");
$(".cart_button_custom").removeClass("cart_drawer_custom_code");
$(".cart_button_custom").addClass("redirecttocart");
}  
   
  
});  
/* Cart Note */   
$(".tax_section.order_note span.note_open").click(function(){
$(this).toggleClass("active");
$(".oder_note_texarea").toggleClass("active");
});
  
/* Checkout Button Redirection Code */ 
$(document).on("click",".check .cartbuttonnew",function(){
  console.log('Checkout button clicked for logged-in user - proceeding instantly');
  
  // Get cart note for potential later use, but don't wait for it
  var cartnote = $(".cart_note").val();
  
  // If there's a cart note, update it asynchronously (don't wait)
  if (cartnote && cartnote.trim() !== '') {
    var data = { note: cartnote };
    $.ajax({
      url: '/cart/update.js',
      type: "POST",
      dataType: 'JSON',
      data: data,
      success: function(res) {
        console.log('Cart note updated successfully');
      },
      error: function(xhr, status, error) {
        console.log('Cart note update failed, but proceeding to checkout anyway');
      }
    });
  }
  
  // Redirect immediately without waiting for note update
  window.location.href = "/checkout";
});
  
// Helper function to check if cart contains only retail products
function updateCartRetailStatus() {
  $.ajax({
    url: '/cart.js',
    type: 'GET',
    dataType: 'JSON',
    success: function(cartData) {
      var cartIsRetailOnly = true;
      var cartHasItems = false;
      
      if (!cartData.items || cartData.items.length === 0) {
        // Empty cart is treated as non-retail
        cartIsRetailOnly = false;
      } else {
        cartHasItems = true;
        
        // Check each item in the cart
        for (var i = 0; i < cartData.items.length; i++) {
          var item = cartData.items[i];
          var itemIsRetail = (item.properties && item.properties['_is_retail'] === 'true');
          
          if (!itemIsRetail) {
            cartIsRetailOnly = false;
            break;
          }
        }
      }
      
      // Update global variable
      window.cartIsRetailOnly = cartIsRetailOnly;
      console.log('Cart retail status updated:', cartIsRetailOnly ? 'RETAIL ONLY' : 'CONTAINS NON-RETAIL');
      
      // Update checkout button visibility dynamically
      updateCheckoutButtonVisibility(cartIsRetailOnly);
    },
    error: function() {
      console.log('Error checking cart retail status');
      window.cartIsRetailOnly = false;
    }
  });
}

// Helper function to ensure proper checkout button visibility
function updateCheckoutButtonVisibility(cartIsRetailOnly) {
  // Always show appropriate checkout button based on login status
  // Button functionality will change based on cart contents (handled in click handler)
  if (window.customerLoggedIn) {
    $('.check_btn_bottom .shipping').show();
    $('.check_btn_bottom .btn_wrap_login').hide();
    console.log('Showing direct checkout button for logged-in customer');
  } else {
    $('.check_btn_bottom .shipping').hide();
    $('.check_btn_bottom .btn_wrap_login').show();
    console.log('Showing checkout button with dynamic functionality based on cart contents');
  }
}

// Helper function to force immediate price update
function updateCartPrice() {
  $.ajax({
    url: '/cart.js',
    type: 'GET',
    dataType: 'JSON',
    success: function(res) {
      var finalprice = parseFloat(res['total_price']/100);
      var finalprice = finalprice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'); 
      var finalprice = finalprice.replace(",",",");
      
      let curr = $('.disclosure__button.localization-form__select').data('curr');
      
      // Remove existing total price and add updated one
      $(".cart-drawer .subtotal-sec .total-price").remove();
      $(".cart-drawer .subtotal-sec").append("<div class='total-price'>"+curr+finalprice+"</div>");
      
      console.log('Price updated to:', curr+finalprice);
    },
    error: function() {
      console.log('Error updating cart price');
    }
  });
}

function updateCart(){
var currencySymbol = '';
if (Shopify.currency && Shopify.currency.active) {
    // You can define a custom mapping of currency symbols if needed
    var currencySymbols = {
        'USD': '$',
        'EUR': '€',
        'GBP': '£',
        // Add more currency symbols as needed
    };

    currencySymbol = currencySymbols[Shopify.currency.active] || '';
} else {
    console.error("Shopify.currency is not defined or not active.");
}

let curr = $('.disclosure__button.localization-form__select').data('curr');

var cartdrawer=$(".cart-drawer").attr("cart_drawer_on");
if(cartdrawer == 'true'){
$(".header__icon.header__icon--cart").addClass("site-header__cart");
$(".cart_button_custom").addClass("cart_drawer_custom_code");
$(".cart_button_custom").removeClass("redirecttocart");
}
else{
$(".header__icon.header__icon--cart").removeClass("site-header__cart");
$(".cart_button_custom").removeClass("cart_drawer_custom_code");
$(".cart_button_custom").addClass("redirecttocart");
}  
  
    $.ajax({
    url:'/cart.js',
     type:"GET",
     dataType: 'JSON',
    success:function(res){
      console.log(res);
      
     var note=res['note'];
     $(".cart_note").attr("value",note);
     console.log("note");
      
      
       var items=res['items'];
       var cond=items.length;
      
      if(cond==0)
      {
      $(".price-sec").hide();
      $(".shipping").hide();
      $(".cart-drawer-empty").show();
      $(".cart-drawer-sec").addClass("heights");
      $(".this-close").show();
       $('.check_btn_bottom').hide();
      }
    else
      {
        
      $(".price-sec").show();
      $(".shipping").show();
      $(".cart-drawer-empty").hide();
      $(".this-close").hide();
         $('.check_btn_bottom').show();
      }
     var finalprice=parseFloat(res['total_price']/100);
     var finalprice = finalprice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'); 
     var finalprice = finalprice.replace(",",","); 
     // Remove existing total price (fix selector to match where it's added)
     $(".cart-drawer .subtotal-sec .total-price").remove();
      
      
      var shipping_price= $(".shipping_custom_calculate").attr("qly_price");
      var shipping_total=parseInt(shipping_price-finalprice);
      var finalpriceshipis=Math.abs(finalprice);
      
      var progressbar=parseInt(finalprice) + parseInt(150);
            $(".cart-drawer .shipping_custom_calculate").show();
      $(".cart-drawer .shipping_custom_calculate .custom_calculate").html('');
      if(parseInt(finalprice) < parseInt(shipping_price)){
        $(".cart-drawer .shipping_custom_calculate .custom_calculate").append(shipping_total);
            $(".shipping_custom_calculate_less").hide();
        $("span.inner_progressbar").css("width", progressbar);
        
      }
      else{
      $(".shipping_custom_calculate_less").show();
      $(".cart-drawer .shipping_custom_calculate").hide();
       }
      
      
     // Add updated total price
     $(".cart-drawer .subtotal-sec").append("<div class='total-price'>"+curr+finalprice+"</div>");
     var itemcount=res['item_count'];
     
      // Update cart count immediately in header (always show, even when 0)
      $(".cart-count-bubble span[aria-hidden='true']").text(itemcount);
      $(".cart-count-bubble span.visually-hidden").text("Cart (" + itemcount + " items)");
      $(".cart-count-bubble").show();
      
      var i; var j;
      $(".content-block").remove();
      $('.cart-drawer-sec .bottom').append("<div class='content-block'></div>");
      var line_item_id = '1';
       var token=0;
      
      for(i=0;i<items.length;i++){
        
      var title=items[i]['product_title'];   
      var producturl=items[i]['url'];   
      var price=parseFloat(items[i]['price']/100);
      var price = price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'); 
      var price = price.replace(",",",");
      var price_new=parseFloat(items[i]['price']/100);
      var discount=parseFloat(items[i]['total_discount']/100);
      var discount=((price_new) - (discount));
      var discount=discount.toFixed(2);
      var discount = discount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'); 
      var discount = discount.replace(",",",");
      var img=items[i]['image'];
     var qty=items[i]['quantity'];
     var product_id=items[i]['product_id'];
      var variant_id=items[i]['variant_id'];
      var key=items[i]['key']; 
      var sku=items[i]['sku']; 
        var sell_item=items[i]['selling_plan_allocation']; 
        if ( typeof sell_item === 'undefined' ) {
}else{
   var sell_name = sell_item.selling_plan.name;
console.log(sell_name);       
}

       console.log('sell_name', sell_item);
        var property1 = items[i]['properties']['ID'];
   $('.cart-drawer-sec .bottom .content-block').append("<div class='part loop-"+i+"' data-id='"+i+"' product-id='"+product_id+"' var-id='"+variant_id+"' key='"+key+"' prop='"+property1+"'></div>");
   $(".cart-drawer-sec .bottom .content-block .loop-"+i).append("<div class='image'></div>");
   $(".cart-drawer-sec .bottom .content-block .loop-"+i).append("<div class='content'></div>");
   $(".cart-drawer-sec .bottom .content-block .loop-"+i+" .content").append("<div class='titlesec'></div>");
   $(".cart-drawer-sec .bottom .content-block .loop-"+i+" .content").append("<div class='quantitybox'></div>");
   $(".cart-drawer-sec .bottom .content-block .loop-"+i+" .content").append("<div class='sku'></div>");
   $(".cart-drawer-sec .bottom .content-block .loop-"+i+" .content").append("<div class='sell_plan'></div>");
   $(".cart-drawer-sec .bottom .content-block .loop-"+i+" .image").append("<div class='img'><img src="+img+"></div>");

   $(".cart-drawer-sec .bottom .content-block .loop-"+i+" .content .titlesec").append("<div class='title'><a href='"+producturl+"'>" +title+ "</a></div>");
   
   // Check if product is retail from cart properties
   var isRetail = items[i]['properties'] && items[i]['properties']['_is_retail'] === 'true';
   
   // Display price with or without Ex. VAT based on retail status
   if (isRetail) {
     // Retail products: no Ex. VAT
     $(".cart-drawer-sec .bottom .content-block .loop-"+i+" .content .quantitybox").append("<div data-price='"+price+"' class='price price-"+i+"'>"+curr+price+"</div>");
   } else {
     // Non-retail products: include Ex. VAT
     $(".cart-drawer-sec .bottom .content-block .loop-"+i+" .content .quantitybox").append("<div data-price='"+price+"' class='price price-"+i+"'>"+curr+price+ " Ex. VAT</div>");
   }

       
        var variant_names = items[i]['options_with_values'];
        var k;
        for(k=0;k<variant_names.length;k++){
         var variant_name = variant_names[k]['name'];
         var variant = variant_names[k]['value'];
          if(variant != null ){
            if(variant.indexOf("Title") == -1){
                 $(".cart-drawer-sec .bottom .content-block .loop-"+i+" .content").append("<div class='varintbox'></div>");
             $(".cart-drawer-sec .bottom .content-block .loop-"+i+" .content .varintbox").append("<div class='vartitle_size'>" +variant_name+ ":</div>");
             $(".cart-drawer-sec .bottom .content-block .loop-"+i+" .content .varintbox").append("<div class='vartitle'>" +variant+ "</div>");
            }
          }
          
        } 
        
          
       var property = items[i]['properties'];      
       if(property != null ){
         var frequency_num = items[i]['properties']['frequency_num'];
          if(frequency_num != undefined){
                  $(".cart-drawer-sec .bottom .content-block .loop-"+i+" .content .titlesec").append("<div class='num'>Every " +frequency_num+ " </div>");
          }
          
          var frequency_type_text = items[i]['properties']['frequency_type_text'];
          if(frequency_type_text != undefined){
              $(".cart-drawer-sec .bottom .content-block .loop-"+i+" .content .titlesec").append("<div class='mnts'>" +frequency_type_text+ " </div>");
          }
           var properties = items[i]['properties']['group_id'];
            if(properties != undefined){
                token=1;
           }
         }
        
   $(".cart-drawer-sec .bottom .content-block .loop-"+i+" .content .quantitybox").append("<span>x"+qty+"</span>");
   $(".cart-drawer-sec .bottom .content-block .loop-"+i+" .content .quantitybox").append("<div class='rightnew'><button class='minus_quantity' data-id='"+line_item_id+"'>-</button><input type='number' class='cart__qty-input' data-id='"+line_item_id+"' value="+qty+" min='0' pattern='[0-9]*'><button class='plus_quantity' data-id='"+line_item_id+"'>+</button></div>");
     $(".cart-drawer-sec .bottom .content-block .loop-"+i+" .content").append("<div class='remove' data-id="+i+"><button class='btn' type='button'>Remove Item</button></div>");
        var line_item_id = parseInt(line_item_id)+parseInt(1); 
      

       $(".cart-drawer-sec .bottom .content-block .loop-"+i+" .content .sku").text(sku);
         if ( typeof sell_item === 'undefined' ) {
}else{
         $(".cart-drawer-sec .bottom .content-block .loop-"+i+" .content .sell_plan").text(sell_name);
        }
      }
      
     $(".cart-drawer-sec").append("<input class='datasub' type='hidden' value="+token+">"); 
}
     
 });
  }
  
/* Open Cart Drawer After Add To Cart */   
// $(document).on("click",".redirecttocart",function(){
//  var formdata=$(".product__info-container .product-form form").serialize();
//  $.ajax({
//      url:"/cart/add.js",
//      type:"POST",
//      data:formdata,
//      dataType:"JSON",
//     success:function(result){
//       window.location.href="/cart";
     
//    } 
    
// });
  
  
  
// });
/* Open Cart Drawer After Add To Cart */   
// $(document).on("click",".cart_drawer_custom_code",function(event){
//     event.preventDefault();

//         $('body').addClass("js-drawer-open-right");

   
//     var id = $("select#ProductSelect-product-template").find(":selected").val();
//     var formdata=$(".product__info-container .product-form form").serialize();
// //console.log(formdata);
//    var qty = $(".Product-quantity input#quantity").val();

//     var data={
//       id:id,
//       quantity:qty
    
//     };

//     $.ajax({
//      url:"/cart/add.js",
//      type:"POST",
//      data:formdata,
//      dataType:"JSON",
//     success:function(result){
//       updateCart();
//    } 
    
// });
 
   
//    });
  
/*Open  Cart Drawer On Header Cart Icon */ 
$(document).on("click","a.header__icon.header__icon--cart",function( e ){ 
     e.preventDefault();
  $(".price-sec").show();
      $(".shipping").show();
   $(".cart-drawer-empty").hide();
  
   $('body').addClass("js-drawer-open-right");
   $.ajax({
    url:'/cart.js',
     type:"GET",
     dataType: 'JSON',
    success:function(res){
        updateCart(); 
}
     
 });
 
    
 
  
  
});

/* Cartdrawer plus quantity */    
$(document).on("click", "button.plus_quantity", function(event) {
    event.preventDefault(); 
    
    var data_id = $(this).attr('data-id');
    var $button = $(this);
    var $part = $button.closest('.part');
    var prop = $part.attr('prop'); 
    var currentQty = parseInt($(".cart__qty-input[data-id='"+data_id+"']").val());
    var requestedQty = currentQty + 1;
    var key = [];
    
    $('.content-block .part[prop="' + prop + '"]').each(function() {
      var key1 = $(this).attr('key');      
      key.push(key1); 
    });
    
    console.log('Cart plus: Attempting to increase quantity from', currentQty, 'to', requestedQty);
    
    // Check if this is a retail product by checking cart properties
    var isRetailProduct = false;
    
    // Get current cart to check product properties and determine max quantity
    fetch(window.Shopify.routes.root + 'cart.js', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(cartData => {
      console.log('Cart plus: Current cart data:', cartData);
      
      // Find the current item to check if it's retail and get inventory info
      var currentItem = null;
      if (cartData.items) {
        for (var i = 0; i < cartData.items.length; i++) {
          if (key.includes(cartData.items[i].key)) {
            currentItem = cartData.items[i];
            break;
          }
        }
      }
      
      if (!currentItem) {
        console.log('Cart plus: Could not find current item in cart');
        updateCart();
        return;
      }
      
      // Check if it's a retail product
      isRetailProduct = (currentItem.properties && currentItem.properties['_is_retail'] === 'true');
      console.log('Cart plus: Item is retail:', isRetailProduct);
      
      // For retail products, enforce maximum quantity of 1
      var maxQuantity = isRetailProduct ? 1 : null;
      
      // If we have a max quantity limit and we're already at it, don't increase
      if (maxQuantity && currentQty >= maxQuantity) {
        console.log('Cart plus: Maximum quantity reached (' + maxQuantity + '), showing availability notice');
        showCartAvailabilityNotice($part, 0); // 0 because no items were added
        return;
      }
      
      // Build updates object for server sync
      let updates = key.reduce((acc, id) => {
        acc[id] = requestedQty; 
        return acc;
      }, {}); 
      
      // Send request to server to update the quantity
      return fetch(window.Shopify.routes.root + 'cart/update.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ updates })
      });
    })
    .then(response => {
      if (!response) return; // Exit if we already handled the max quantity case
      return response.json();
    })
    .then(cartData => {
      if (!cartData) return; // Exit if we already handled the max quantity case
      
      console.log('Cart plus: Server response for quantity increase:', cartData);
      
      // Check if the quantity was actually updated
      var actualQty = currentQty;
      if (cartData.items) {
        // Find the item in the cart data to see the actual quantity
        for (var i = 0; i < cartData.items.length; i++) {
          if (key.includes(cartData.items[i].key)) {
            actualQty = cartData.items[i].quantity;
            break;
          }
        }
      }
      
      // If the quantity didn't increase as requested, show availability notice
      if (actualQty < requestedQty && actualQty === currentQty) {
        console.log('Cart plus: Quantity was not increased due to server limits, showing availability notice');
        showCartAvailabilityNotice($part, 0);
      } else if (actualQty < requestedQty && actualQty > currentQty) {
        // Some items were added but not all requested
        var addedQty = actualQty - currentQty;
        console.log('Cart plus: Only ' + addedQty + ' items were added due to limits');
        showCartAvailabilityNotice($part, addedQty);
      }
      
      // Update cart to reflect actual server state
      updateCart(); 
    })
    .catch((error) => {
      console.error('Cart plus: Failed to update quantity on server:', error);
      updateCart();
    });
});







   
/* Cart drawer minus quantity */
$(document).on("click","button.minus_quantity",function(){
    event.preventDefault(); 
    var data_id = $(this).attr('data-id');
    var $button = $(this);
    var $part = $button.closest('.part');
    var prop = $part.attr('prop'); 
    var currentQty = parseInt($(".cart__qty-input[data-id='"+data_id+"']").val());
    var requestedQty = Math.max(0, currentQty - 1);
    var key = [];
    
    $('.content-block .part[prop="' + prop + '"]').each(function() {
      var key1 = $(this).attr('key');      
      key.push(key1); 
    });
    
    console.log('Attempting to decrease quantity from', currentQty, 'to', requestedQty);
    
    // Build updates object for server sync
    let updates = key.reduce((acc, id) => {
      acc[id] = requestedQty; 
      return acc;
    }, {}); 
    
    // Send request to server to update the quantity
    fetch(window.Shopify.routes.root + 'cart/update.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ updates })
    })
    .then(response => {
      console.log('Server confirmed quantity decrease');
      // Update cart to reflect actual server state
      updateCart(); 
    })
    .catch((error) => {
      console.error('Failed to update quantity on server:', error);
      updateCart();
    });
});
  
  
/* Cart drawer remove button */ 
$(document).on("click", ".content-block .remove", function() {     
    var data_id = $(this).closest('.remove').attr('data-id');  
    var $button = $(this);
    var $part = $button.closest('.part');
    var prop = $part.attr('prop'); 
    var qty = 0;
    var key = [];
    
    // Collect all parts with the same property (for grouped items)
    var $partsToRemove = $('.content-block .part[prop="' + prop + '"]');
    
    $partsToRemove.each(function() {
      var key1 = $(this).attr('key');      
      key.push(key1); 
    });
    
    // OPTIMISTIC UI UPDATE: Remove items from display immediately
    console.log('Removing items from cart display immediately...');
    $partsToRemove.fadeOut(200, function() {
      $(this).remove();
    });
    
    // Update cart count immediately (optimistic)
    var currentCount = parseInt($(".cart-count-bubble span[aria-hidden='true']").text()) || 0;
    var newCount = Math.max(0, currentCount - $partsToRemove.length);
    $(".cart-count-bubble span[aria-hidden='true']").text(newCount);
    $(".cart-count-bubble span.visually-hidden").text("Cart (" + newCount + " items)");
    
    // Always show cart count, even when 0
    $(".cart-count-bubble").show();
    
    // Build updates object for server sync
    let updates = key.reduce((acc, id) => {
      acc[id] = 0; 
      return acc;
    }, {});  

    // Send request to server to sync the change
    fetch(window.Shopify.routes.root + 'cart/update.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ updates })
    })
    .then(response => {
      console.log('Server confirmed item removal');
      // Update cart to get accurate totals and counts
      updateCart(); 
    })
    .catch((error) => {
      console.error('Failed to remove item from server:', error);
      // TODO: Could implement error recovery here
      // For now, just update cart to get the correct state
      updateCart();
    });  

});

// $(document).on("click",".content-block .remove", function(){
   
//    var removeid=$(this).attr("data-id");

//    var parentid = $(this).closest(".part").attr('data-id');
   
//    var i;
//   if(removeid == parentid){
//     var data=$(".cart-drawer-sec .bottom .content-block .loop-"+i);
  

//  var line= $(this).attr('data-id');
//     var line = parseInt(line)+parseInt(1);
  
//   $.ajax({
// 		url:'/cart/change?line='+line+'&quantity=0',
// 		type:'GET',
//       dataType:"JSON",
//       success:function(res){
//         var items=res['items'];
//        var cond=items.length;
      
//       if(cond==0)
//       {
//       $(".price-sec").hide();
//       $(".shipping").hide();
//       $(".cart-drawer-empty").show();
//       $(".cart-drawer-sec").addClass("heights");
//       $(".this-close").show();
        
//       }
//     else
//       {
        
//       $(".price-sec").show();
//       $(".shipping").show();
//       $(".cart-drawer-empty").hide();
//       $(".this-close").hide();
//       }
        
//       var finalprice=parseFloat(res['total_price']/100);
//        var finalprice = finalprice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'); 
//        var finalprice = finalprice.replace(",",".");
//      $(".cart-drawer-sec .bottom .content-block .loop-"+removeid).remove();
//           $(".subtotal-sec .total-price").remove();
//      $(".cart-drawer .subtotal-sec").append("<div class='total-price'>$"+finalprice+"</div>");
          
//           var i = 0;
//           $(".part").each(function(i){
//           $(this).attr('class','');
//           $(this).addClass('part');
//             var loop_class = "loop-"+i;
        
//            $(this).addClass('loop-'+i);
//           $(this).attr('data-id',i);
//           $(this).find(".remove").attr('data-id',i);
//             var i = parseInt(i)+parseInt(1);
//           });
    
//     }
// });
      
//    } 
   
// });

 
/* Cartdrawer close */    
$(document).on("click",'.cart-drawer .close',function(){
    $('body').removeClass('js-drawer-open-right');    
        
});


$(document).on("click", "button.add_cart", function() {
    var btn = $(this).attr('click'); // Ensure this attribute exists on the button
  
    if (btn == 'true') {   
        var dt = new Date();
var time = dt.getHours()+"_"+dt.getMinutes()+"_"+dt.getSeconds();
      var input =$('.sub_custom_widget .cms_box input');
 if (input.is(':checked')) {
       var requestedQty = 1;
       var var_id = $('.subscription.cms_box .sell_div span').attr('var_id');
       var sell_id = $('.subscription.cms_box .sell_div span').attr('sell_id');
       var product_id = $('.subscription.cms_box .sell_div').attr('product_id');
       var product_tax = $('.subscription.cms_box .sell_div').attr('meta_tax');
       // Ensure `sell_plan` is defined
       var sell_plan = $('.subscription.cms_box .sell_div span').attr('sell_plan');
       console.log(sell_plan);
       var cus_var_id = $('.sub_custom_widget .one_time').attr('custom_id');
       var add_product_tax = $('.sub_custom_widget .one_time').attr('meta_tax');

       // Check quantity limits before proceeding (check main subscription product)
       checkAndHandleQuantityForAddCart(var_id, requestedQty, function(allowedQty) {
         if (allowedQty <= 0) {
           // Quantity checking function will have shown error message
           return;
         }

         $('body').addClass("js-drawer-open-right");

         $("body").append(
             "<form class='cart-add' name='cart-add' method='post' action='/cart/add'>" +
                 "<input type='hidden' name='items[0][id]' value='" + var_id + "'/>" +
                 "<input type='hidden' class='items_" + var_id + "' name='items[0][quantity]' value='" + allowedQty + "'/>" +
                 "<input type='hidden' name='items[0][selling_plan]' value='" + sell_id + "'>" + 
                 "<input type='hidden' class='items_" + var_id + "' name='items[0][properties][ID]' value='" + product_id + "'/>" +
                   "<input type='hidden' class='items_" + var_id + "' name='items[0][properties][Tax]' value='" + product_tax + "'/>" +
                 "<input type='hidden' name='items[1][id]' value='" + cus_var_id + "'/>" +
                 "<input type='hidden' class='items_" + var_id + "' name='items[1][quantity]' value='" + allowedQty + "'/>" +
                  "<input type='hidden' class='items_" + var_id + "' name='items[1][properties][ID]' value='" + product_id + "'/>" +
                 "<input type='hidden' class='items_" + var_id + "' name='items[1][properties][Tax]' value='" + add_product_tax + "'/>" +
             "</form>"
         );
         
         var formdata = $("body form.cart-add").serialize();
         
         $.ajax({
             url: "/cart/add.js",
             type: "POST",
             data: formdata,
             dataType: "JSON",
             success: function(result) {
                 // Hide any existing error messages since item was successfully added
                 hideRetailQuantityError();
                 hideAvailabilityNotice();
                 updateCart(); 
                 $("body form.cart-add").remove();
                 // Force immediate price update after adding item
                 updateCartPrice();
                 // Update retail status for checkout button logic
                 updateCartRetailStatus();
                 // STEP 2: After adding non-retail product, clear any retail products
                 clearRetailProductsFromCart();
             } 
         });
       });
    } else {  
 
// alert('please check box select');
   $('.text_select_box').show();
     setTimeout(function() {
     $('.text_select_box').hide();   
     }, 2500);
    }
       
        
    } else {
      var requestedQty = 1;
      var var_id = $('.main_sub_pr').attr('custom_id');
      var new_tax = $('.main_sub_pr').attr('meta_tax'); 
      var new_id = $('.main_sub_pr').attr('new_id'); 

      // Check quantity limits before proceeding
      checkAndHandleQuantityForAddCart(var_id, requestedQty, function(allowedQty) {
        if (allowedQty <= 0) {
          // Quantity checking function will have shown error message
          return;
        }

        var formel=  "<form class='cart-add' name='cart-add' method='post' action='/cart/add'>" +
                      "<input type='hidden' name='items[0][id]' value='" + var_id + "'/>" +
                      "<input type='hidden' class='items_" + var_id + "' name='items[0][quantity]' value='" + allowedQty + "'/>" +
                      "<input type='hidden' class='items_" + var_id + "' name='items[0][properties][ID]' value='" + new_id + "'/>" +
                        "<input type='hidden' class='items_" + var_id + "' name='items[0][properties][Tax]' value='" + new_tax + "'/>"+ 
                      
                  "</form>";
        $("body").append(
            formel
          );
        console.log(formel);
        $('body').addClass("js-drawer-open-right");
        var formdata = $("body form.cart-add").serialize();
        
        $.ajax({
            url: "/cart/add.js",
            type: "POST",
            data: formdata,
            dataType: "JSON",
            success: function(result) {
                // Hide any existing error messages since item was successfully added
                hideRetailQuantityError();
                hideAvailabilityNotice();
                updateCart();
                // Force immediate price update after adding item
                updateCartPrice();
                // Update retail status for checkout button logic
                updateCartRetailStatus();
                // STEP 2: After adding non-retail product, clear any retail products
                clearRetailProductsFromCart();
            }
        });
      });
    }
});


// Helper function to clear retail products from cart (optimistic + server sync)
function clearRetailProductsFromCart() {
  console.log('Clearing retail products from cart...');
  
  // First, get current cart from server to check actual product properties
  $.ajax({
    url: '/cart.js',
    type: 'GET',
    dataType: 'JSON',
    success: function(cartData) {
      if (!cartData.items || cartData.items.length === 0) {
        console.log('Cart is empty, nothing to clear');
        return;
      }
      
      var itemsToRemove = [];
      var $retailItems = [];
      
      // Check each item in server cart data
      cartData.items.forEach(function(item) {
        var itemIsRetail = (item.properties && item.properties['_is_retail'] === 'true');
        
        if (itemIsRetail) {
          itemsToRemove.push(item.key);
          
          // Find corresponding DOM element
          $('.content-block .part').each(function() {
            var $part = $(this);
            var partKey = $part.attr('key');
            if (partKey === item.key) {
              $retailItems.push({
                element: $part,
                key: item.key,
                title: item.product_title
              });
            }
          });
        }
      });
  
      if ($retailItems.length > 0) {
        console.log('Found', $retailItems.length, 'retail items to remove:', $retailItems.map(i => i.title));
        
        // OPTIMISTIC UI UPDATE: Remove retail items immediately
        $retailItems.forEach(function(item) {
          item.element.fadeOut(200, function() {
            $(this).remove();
          });
        });
        
        // Update cart count immediately (optimistic)
        var currentCount = parseInt($(".cart-count-bubble span[aria-hidden='true']").text()) || 0;
        var newCount = Math.max(0, currentCount - $retailItems.length);
        $(".cart-count-bubble span[aria-hidden='true']").text(newCount);
        $(".cart-count-bubble span.visually-hidden").text("Cart (" + newCount + " items)");
        
        // Always show cart count
        $(".cart-count-bubble").show();
        
        // SERVER SYNC: Remove items from server cart
        var updates = {};
        itemsToRemove.forEach(function(key) {
          updates[key] = 0;
        });
        
        // Send removal request to server
        fetch(window.Shopify.routes.root + 'cart/update.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ updates })
        })
        .then(response => {
          console.log('Server confirmed removal of retail products');
          // Force immediate price update after server confirms removal
          updateCartPrice();
          // Update retail status for checkout button logic
          updateCartRetailStatus();
        })
        .catch((error) => {
          console.error('Failed to remove retail products from server:', error);
        });
      } else {
        console.log('No retail products found in cart');
      }
    },
    error: function() {
      console.log('Error checking cart for retail products');
    }
  });
}

// Helper function to show standard Shopify quantity error message
function showRetailQuantityError(maxQuantity) {
  console.log('Showing retail quantity error for max:', maxQuantity);
  
  // Get or create error message wrapper near the add_cartretail button
  var $button = $('button.add_cartretail');
  var $errorWrapper = $button.closest('.product-form__buttons, .product-form, .product-form-wrapper').find('.retail-quantity-error-wrapper');
  
  // If no existing error wrapper found, look for it near the button
  if ($errorWrapper.length === 0) {
    $errorWrapper = $button.parent().find('.retail-quantity-error-wrapper');
  }
  
  // If still not found, create it above the button
  if ($errorWrapper.length === 0) {
    var errorHtml = 
      '<div class="retail-quantity-error-wrapper product-form__error-message-wrapper" role="alert" style="margin-bottom: 1rem;">' +
        '<svg aria-hidden="true" focusable="false" class="icon icon-error" viewBox="0 0 13 13" style="flex-shrink: 0; width: 1.5rem; height: 1.5rem; margin-right: 0.5rem;">' +
          '<circle cx="6.5" cy="6.50049" r="5.5" stroke="white" stroke-width="2"/>' +
          '<circle cx="6.5" cy="6.5" r="5.5" fill="#EB001B" stroke="#EB001B" stroke-width="0.7"/>' +
          '<path d="M5.87413 3.52832L5.97439 7.57216H7.02713L7.12739 3.52832H5.87413ZM6.50076 9.66091C6.88091 9.66091 7.18169 9.37267 7.18169 9.00504C7.18169 8.63742 6.88091 8.34917 6.50076 8.34917C6.12061 8.34917 5.81982 8.63742 5.81982 9.00504C5.81982 9.37267 6.12061 9.66091 6.50076 9.66091Z" fill="white"/>' +
          '<path d="M5.87413 3.17832H5.51535L5.52424 3.537L5.6245 7.58083L5.63296 7.92216H5.97439H7.02713H7.36856L7.37702 7.58083L7.47728 3.537L7.48617 3.17832H7.12739H5.87413ZM6.50076 10.0109C7.06121 10.0109 7.5317 9.57872 7.5317 9.00504C7.5317 8.43137 7.06121 7.99918 6.50076 7.99918C5.94031 7.99918 5.46982 8.43137 5.46982 9.00504C5.46982 9.57872 5.94031 10.0109 6.50076 9.66091Z" fill="white" stroke="#EB001B" stroke-width="0.7"/>' +
        '</svg>' +
        '<span class="product-form__error-message retail-quantity-error-message"></span>' +
      '</div>';
    
    // Insert before the button
    $button.before(errorHtml);
    $errorWrapper = $button.parent().find('.retail-quantity-error-wrapper');
  }
  
  // Set the error message text using the requested message
  var errorMessage = "The maximum quantity of this item is already in your cart.";
  $errorWrapper.find('.retail-quantity-error-message').text(errorMessage);
  
  // Show the error message
  $errorWrapper.removeAttr('hidden').show();
  
  // Auto-hide after 10 seconds
  setTimeout(function() {
    hideRetailQuantityError();
  }, 10000);
}

// Helper function to hide the retail quantity error message
function hideRetailQuantityError() {
  $('.retail-quantity-error-wrapper').attr('hidden', '').hide();
}

// Helper function to show availability notice (for when items are added but with limitations)
function showAvailabilityNotice(message) {
  console.log('Showing availability notice:', message);
  
  // Get or create error message wrapper near any add to cart button
  var $button = $('button.add_cart, button.add_cartretail').first();
  var $noticeWrapper = $button.closest('.product-form__buttons, .product-form, .product-form-wrapper').find('.availability-notice-wrapper');
  
  // If no existing notice wrapper found, look for it near the button
  if ($noticeWrapper.length === 0) {
    $noticeWrapper = $button.parent().find('.availability-notice-wrapper');
  }
  
  // If still not found, create it above the button
  if ($noticeWrapper.length === 0) {
    var noticeHtml = 
      '<div class="availability-notice-wrapper product-form__error-message-wrapper" role="alert" style="margin-bottom: 1rem; background-color: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 4px; padding: 0.75rem;">' +
        '<svg aria-hidden="true" focusable="false" class="icon icon-info" viewBox="0 0 20 20" style="flex-shrink: 0; width: 1.5rem; height: 1.5rem; margin-right: 0.5rem; color: #0ea5e9;">' +
          '<path fill="currentColor" d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm1 15H9v-6h2v6zm0-8H9V5h2v2z"/>' +
        '</svg>' +
        '<span class="availability-notice-message" style="color: #0ea5e9; font-size: 1.3rem;"></span>' +
      '</div>';
    
    // Insert before the button
    $button.before(noticeHtml);
    $noticeWrapper = $button.parent().find('.availability-notice-wrapper');
  }
  
  // Set the notice message text
  $noticeWrapper.find('.availability-notice-message').text(message);
  
  // Show the notice message
  $noticeWrapper.removeAttr('hidden').show();
  
  // Auto-hide after 8 seconds
  setTimeout(function() {
    hideAvailabilityNotice();
  }, 8000);
}

// Helper function to hide the availability notice message
function hideAvailabilityNotice() {
  $('.availability-notice-wrapper').attr('hidden', '').hide();
}

// Helper function to show availability notice above the remove button for a specific cart item
function showCartAvailabilityNotice($cartItem, addedQuantity) {
  console.log('Showing cart availability notice for item:', addedQuantity);
  
  // Find the remove button for this specific cart item
  var $removeButton = $cartItem.find('.remove');
  
  // Remove any existing cart availability notice for this item
  $cartItem.find('.cart-availability-notice').remove();
  
  // Create the notice HTML based on quantity added
  var noticeText = '';
  if (addedQuantity === 0) {
    noticeText = 'The maximum quantity of this item is already in your cart.';
  } else {
    noticeText = 'Only ' + addedQuantity + ' item' + (addedQuantity > 1 ? 's were' : ' was') + ' added to your cart due to availability.';
  }
  
  var noticeHtml = 
    '<div class="cart-availability-notice" style="margin: 0.5rem 0; padding: 0.5rem; background-color: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 4px; font-size: 0.9rem; color: #0ea5e9; display: flex; align-items: center;">' +
      '<svg aria-hidden="true" focusable="false" style="flex-shrink: 0; width: 1rem; height: 1rem; margin-right: 0.5rem; color: #0ea5e9;" viewBox="0 0 20 20">' +
        '<path fill="currentColor" d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm1 15H9v-6h2v6zm0-8H9V5h2v2z"/>' +
      '</svg>' +
      '<span>' + noticeText + '</span>' +
    '</div>';
  
  // Insert the notice above the remove button
  $removeButton.before(noticeHtml);
  
  // Auto-hide after 5 seconds
  setTimeout(function() {
    $cartItem.find('.cart-availability-notice').fadeOut(300, function() {
      $(this).remove();
    });
  }, 5000);
}

// Helper function to check quantity limits for add_cart (non-retail products)
function checkAndHandleQuantityForAddCart(var_id, requestedQty, callback) {
  // Check current cart to see if maximum quantity would be exceeded
  $.ajax({
    url: '/cart.js',
    type: 'GET',
    dataType: 'JSON',
    success: function(cartData) {
      // Find current quantity of this variant in cart
      var currentQuantityInCart = 0;
      if (cartData.items && cartData.items.length > 0) {
        for (var i = 0; i < cartData.items.length; i++) {
          if (cartData.items[i].variant_id == var_id) {
            currentQuantityInCart += cartData.items[i].quantity;
          }
        }
      }
      
      console.log("Add_cart: Current quantity in cart for variant", var_id, ":", currentQuantityInCart);
      
      // Get maximum quantity rule from the product page (if available)
      var maxQuantity = null;
      
      // Try to get max from various sources
      var quantityInput = $('input[data-max]');
      if (quantityInput.length > 0) {
        var maxValue = quantityInput.attr('data-max');
        if (maxValue && maxValue !== '' && maxValue !== 'null') {
          maxQuantity = parseInt(maxValue);
        }
      }
      
      if (!maxQuantity) {
        var quantityInputMax = $('input[type="number"][max]');
        if (quantityInputMax.length > 0) {
          var maxValue = quantityInputMax.attr('max');
          if (maxValue && maxValue !== '' && maxValue !== 'null' && maxValue !== 'undefined') {
            maxQuantity = parseInt(maxValue);
          }
        }
      }
      
      console.log("Add_cart: Maximum quantity rule:", maxQuantity);
      
      // Calculate how many we can actually add
      var allowedQty = requestedQty;
      
      if (maxQuantity) {
        var availableQty = maxQuantity - currentQuantityInCart;
        
        if (availableQty <= 0) {
          // Can't add any - show error message and don't add
          showRetailQuantityError(maxQuantity);
          return;
        } else if (availableQty < requestedQty) {
          // Can add some but not all requested
          allowedQty = availableQty;
          // Show availability notice after successful add
          setTimeout(function() {
            var message = "Only " + allowedQty + " item" + (allowedQty > 1 ? "s were" : " was") + " added to your cart due to availability.";
            showAvailabilityNotice(message);
          }, 500);
        }
      }
      
      console.log("Add_cart: Proceeding with quantity:", allowedQty, "out of requested:", requestedQty);
      
      // Call the callback with the allowed quantity
      callback(allowedQty);
    },
    error: function() {
      console.log('Add_cart: Error checking cart for quantity validation, proceeding with original quantity');
      // If we can't check cart, proceed with original quantity
      callback(requestedQty);
    }
  });
}

// Helper function to clear non-retail products from cart (optimistic + server sync)
function clearNonRetailProductsFromCart() {
  console.log('Clearing non-retail products from cart...');
  
  // First, get current cart from server to check actual product properties
  $.ajax({
    url: '/cart.js',
    type: 'GET',
    dataType: 'JSON',
    success: function(cartData) {
      if (!cartData.items || cartData.items.length === 0) {
        console.log('Cart is empty, nothing to clear');
        return;
      }
      
      var itemsToRemove = [];
      var $nonRetailItems = [];
      
      // Check each item in server cart data
      cartData.items.forEach(function(item) {
        var itemIsRetail = (item.properties && item.properties['_is_retail'] === 'true');
        
        // If item is NOT retail, it should be removed
        if (!itemIsRetail) {
          itemsToRemove.push(item.key);
          
          // Find corresponding DOM element
          $('.content-block .part').each(function() {
            var $part = $(this);
            var partKey = $part.attr('key');
            if (partKey === item.key) {
              $nonRetailItems.push({
                element: $part,
                key: item.key,
                title: item.product_title
              });
            }
          });
        }
      });
  
      if ($nonRetailItems.length > 0) {
        console.log('Found', $nonRetailItems.length, 'non-retail items to remove:', $nonRetailItems.map(i => i.title));
        
        // OPTIMISTIC UI UPDATE: Remove non-retail items immediately
        $nonRetailItems.forEach(function(item) {
          item.element.fadeOut(200, function() {
            $(this).remove();
          });
        });
        
        // Update cart count immediately (optimistic)
        var currentCount = parseInt($(".cart-count-bubble span[aria-hidden='true']").text()) || 0;
        var newCount = Math.max(0, currentCount - $nonRetailItems.length);
        $(".cart-count-bubble span[aria-hidden='true']").text(newCount);
        $(".cart-count-bubble span.visually-hidden").text("Cart (" + newCount + " items)");
        
        // Always show cart count
        $(".cart-count-bubble").show();
        
        // SERVER SYNC: Remove items from server cart
        var updates = {};
        itemsToRemove.forEach(function(key) {
          updates[key] = 0;
        });
        
        // Send removal request to server
        fetch(window.Shopify.routes.root + 'cart/update.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ updates })
        })
        .then(response => {
          console.log('Server confirmed removal of non-retail products');
          // Force immediate price update after server confirms removal
          updateCartPrice();
          // Update retail status for checkout button logic
          updateCartRetailStatus();
        })
        .catch((error) => {
          console.error('Failed to remove non-retail products from server:', error);
        });
      } else {
        console.log('No non-retail products found in cart');
      }
    },
    error: function() {
      console.log('Error checking cart for non-retail products');
    }
  });
}

$(document).on("click", "button.add_cartretail", function() {
  // For retail products, get variant ID directly from button data attributes
  console.log("Adding retail product to cart...");
  var qty = 1;
  
  // Method 0: Get variant ID directly from button data attributes (most reliable for retail)
  var var_id = $(this).data('variant-id');
  var product_id = $(this).data('product-id');
  
  // Fallback methods if data attributes are not available
  if (!var_id) {
    // Method 1: Try standard Shopify form method
    var_id = $('.product-variant-id').val();
  }
  
  if (!var_id) {
    // Method 2: Try to get from data-selected-variant JSON script
    try {
      var selectedVariantScript = $('script[data-selected-variant]').text();
      if (selectedVariantScript) {
        var selectedVariant = JSON.parse(selectedVariantScript);
        var_id = selectedVariant.id;
      }
    } catch (e) {
      console.log("Could not parse selected variant JSON:", e);
    }
  }
  
  if (!var_id) {
    // Method 3: Try to get first available variant ID from page context
    var productInfoElement = $('product-info');
    if (productInfoElement.length > 0) {
      // Look for any hidden input with variant ID
      var hiddenInputs = productInfoElement.find('input[name="id"]');
      if (hiddenInputs.length > 0) {
        var_id = hiddenInputs.first().val();
      }
    }
  }
  
  // Method 4: Last resort - try to extract from URL parameters
  if (!var_id) {
    var urlParams = new URLSearchParams(window.location.search);
    var_id = urlParams.get('variant');
  }
  
  // Fallback for product ID if not in button data
  if (!product_id) {
    product_id = $('product-info').attr('data-product-id') || '';
  }
  
  // Debug logging
  console.log("Retail add to cart - Variant ID:", var_id, "Product ID:", product_id);
  console.log("Button data-variant-id:", $(this).data('variant-id'));
  console.log("Button data-product-id:", $(this).data('product-id'));
  console.log("Available .product-variant-id inputs:", $('.product-variant-id').length);
  console.log("Available data-selected-variant scripts:", $('script[data-selected-variant]').length);
  console.log("Available input[name='id'] elements:", $('input[name="id"]').length);
  
  // Defensive: check for required values
  if (!var_id) {
    console.error("No variant ID found for add_cartretail after trying multiple methods");
    return;
  }

  // Check current cart to see if maximum quantity is already reached
  $.ajax({
    url: '/cart.js',
    type: 'GET',
    dataType: 'JSON',
    success: function(cartData) {
      // Find current quantity of this variant in cart
      var currentQuantityInCart = 0;
      if (cartData.items && cartData.items.length > 0) {
        for (var i = 0; i < cartData.items.length; i++) {
          if (cartData.items[i].variant_id == var_id) {
            currentQuantityInCart += cartData.items[i].quantity;
          }
        }
      }
      
      console.log("Current quantity in cart for variant", var_id, ":", currentQuantityInCart);
      
      // Get maximum quantity rule from the product page (if available)
      var maxQuantity = null;
      
      // Method 1: Try to get max from quantity input data attribute
      var quantityInput = $('input[data-max]');
      if (quantityInput.length > 0) {
        var maxValue = quantityInput.attr('data-max');
        if (maxValue && maxValue !== '' && maxValue !== 'null') {
          maxQuantity = parseInt(maxValue);
        }
      }
      
      // Method 2: Try to get from button or other elements
      if (!maxQuantity) {
        var maxElement = $('[data-variant-max]');
        if (maxElement.length > 0) {
          var maxValue = maxElement.attr('data-variant-max');
          if (maxValue && maxValue !== '' && maxValue !== 'null') {
            maxQuantity = parseInt(maxValue);
          }
        }
      }
      
      // Method 3: Try to get from quantity input max attribute
      if (!maxQuantity) {
        var quantityInputMax = $('input[type="number"][max]');
        if (quantityInputMax.length > 0) {
          var maxValue = quantityInputMax.attr('max');
          if (maxValue && maxValue !== '' && maxValue !== 'null' && maxValue !== 'undefined') {
            maxQuantity = parseInt(maxValue);
          }
        }
      }
      
      // Method 4: Try to get from cart quantity input
      if (!maxQuantity) {
        var cartQuantityInput = $('.cart__qty-input[max]');
        if (cartQuantityInput.length > 0) {
          var maxValue = cartQuantityInput.attr('max');
          if (maxValue && maxValue !== '' && maxValue !== 'null' && maxValue !== 'undefined') {
            maxQuantity = parseInt(maxValue);
          }
        }
      }
      
      // Method 5: Default maximum for retail products (fallback)
      if (!maxQuantity) {
        // Set a reasonable default maximum for retail products if no rule is found
        maxQuantity = 1; // Most retail products should be limited to 1 per customer
      }
      
      console.log("Maximum quantity rule:", maxQuantity);
      
      // Check if we can add more to cart
      if (maxQuantity && currentQuantityInCart >= maxQuantity) {
        // Maximum quantity reached - show Shopify-style error instead of adding to cart
        console.log("Maximum quantity already in cart, showing error message");
        showRetailQuantityError(maxQuantity);
        return;
      }
      
      // If we get here, we can add to cart - proceed with normal flow
      console.log("Adding item to cart - current quantity:", currentQuantityInCart, "max:", maxQuantity);
      $('body').addClass("js-drawer-open-right");
      
      // Build data object for AJAX
      var data = {
        id: var_id,
        quantity: qty,
        properties: {}
      };
      
      // Add product ID to properties if available
      if (product_id) {
        data.properties["ID"] = product_id;
      }
      
      // Mark retail products in properties for cart display logic
      data.properties["_is_retail"] = "true";

      $.ajax({
        url: "/cart/add.js",
        type: "POST",
        data: data,
        dataType: "json",
        success: function(result) {
          // Hide any error message since item was successfully added

          hideRetailQuantityError();
          updateCart();
          // Force immediate price update after adding retail item
          updateCartPrice();
          // Update retail status for checkout button logic
          updateCartRetailStatus();
          // STEP 2: After adding retail product, clear any non-retail products
          clearNonRetailProductsFromCart();
        },
        error: function(xhr, status, error) {
          console.error("Error adding to cart:", error, xhr.responseText);
        }
      });
    },
    error: function() {
      console.log('Error checking cart for maximum quantity validation');
      // If we can't check cart, proceed with normal flow as fallback
      $('body').addClass("js-drawer-open-right");
      
      // Build data object for AJAX
      var data = {
        id: var_id,
        quantity: qty,
        properties: {}
      };
      
      // Add product ID to properties if available
      if (product_id) {
        data.properties["ID"] = product_id;
      }
      
      // Mark retail products in properties for cart display logic
      data.properties["_is_retail"] = "true";

      $.ajax({
        url: "/cart/add.js",
        type: "POST",
        data: data,
        dataType: "json",
        success: function(result) {
          // Hide any error message since item was successfully added
          hideRetailQuantityError();
          updateCart();
          // Force immediate price update after adding retail item
          updateCartPrice();
          // Update retail status for checkout button logic
          updateCartRetailStatus();
          // STEP 2: After adding retail product, clear any non-retail products
          clearNonRetailProductsFromCart();
        },
        error: function(xhr, status, error) {
          console.error("Error adding to cart:", error, xhr.responseText);
        }
      });
    }
  });
});
