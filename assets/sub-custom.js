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
   $(".account_pp .custom-model-main").addClass('model-open');
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
       
 var cartnote = $(".cart_note").val();
  var data = {
        note:cartnote
};  
  
  $.ajax({
    url:'/cart/update.js',
     type:"POST",
     dataType: 'JSON',
     data:data,
    success:function(res){
    window.location.href="/checkout"; 
}
   });
  
  
        
       
 
     
});
  
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
     $(".subtotal-sec .total-price").remove();
      
      
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
   var isRetail = items[i]['properties'] && items[i]['properties']['is_retail'] === 'true';
   
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
    var qty = parseInt($(".cart__qty-input[data-id='"+data_id+"']").val()) + 1;
    var key = [];
    
    $('.content-block .part[prop="' + prop + '"]').each(function() {
      var key1 = $(this).attr('key');      
      key.push(key1); 
    });
    
    // OPTIMISTIC UI UPDATE: Update quantity display immediately
    console.log('Increasing quantity to', qty, 'immediately...');
    $(".cart__qty-input[data-id='"+data_id+"']").val(qty);
    
    // Update cart count immediately (optimistic)
    var currentCount = parseInt($(".cart-count-bubble span[aria-hidden='true']").text()) || 0;
    var newCount = currentCount + 1;
    $(".cart-count-bubble span[aria-hidden='true']").text(newCount);
    $(".cart-count-bubble span.visually-hidden").text("Cart (" + newCount + " items)");
    $(".cart-count-bubble").show();
    
    // Build updates object for server sync
    let updates = key.reduce((acc, id) => {
      acc[id] = qty; 
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
      console.log('Server confirmed quantity increase');
      // Update cart to get accurate totals
      updateCart(); 
    })
    .catch((error) => {
      console.error('Failed to update quantity on server:', error);
      // Revert optimistic update on error
      $(".cart__qty-input[data-id='"+data_id+"']").val(qty - 1);
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
    var qty = Math.max(0, currentQty - 1);
    var key = [];
    
    $('.content-block .part[prop="' + prop + '"]').each(function() {
      var key1 = $(this).attr('key');      
      key.push(key1); 
    });
    
    // OPTIMISTIC UI UPDATE: Update quantity display immediately
    console.log('Decreasing quantity to', qty, 'immediately...');
    $(".cart__qty-input[data-id='"+data_id+"']").val(qty);
    
    // Update cart count immediately (optimistic)
    var currentCount = parseInt($(".cart-count-bubble span[aria-hidden='true']").text()) || 0;
    var newCount = Math.max(0, currentCount - 1);
    $(".cart-count-bubble span[aria-hidden='true']").text(newCount);
    $(".cart-count-bubble span.visually-hidden").text("Cart (" + newCount + " items)");
    
    // Always show cart count, even when 0
    $(".cart-count-bubble").show();
    
    // If quantity becomes 0, remove the item from display
    if (qty === 0) {
      console.log('Quantity reached 0, removing item from display...');
      $part.fadeOut(200, function() {
        $(this).remove();
      });
    }
    
    // Build updates object for server sync
    let updates = key.reduce((acc, id) => {
      acc[id] = qty; 
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
      console.log('Server confirmed quantity decrease');
      // Update cart to get accurate totals
      updateCart(); 
    })
    .catch((error) => {
      console.error('Failed to update quantity on server:', error);
      // Revert optimistic update on error
      $(".cart__qty-input[data-id='"+data_id+"']").val(currentQty);
      if (qty === 0) {
        // If we removed the item but server failed, we should restore it
        updateCart();
      }
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
       $('body').addClass("js-drawer-open-right");
   // var qty = $('.quantity input.quantity__input').val();
   var qty = 1;
        var var_id = $('.subscription.cms_box .sell_div span').attr('var_id');
        var sell_id = $('.subscription.cms_box .sell_div span').attr('sell_id');
         var product_id = $('.subscription.cms_box .sell_div').attr('product_id');
   var product_tax = $('.subscription.cms_box .sell_div').attr('meta_tax');
        // Ensure `sell_plan` is defined
        var sell_plan = $('.subscription.cms_box .sell_div span').attr('sell_plan');
       console.log(sell_plan);
         var cus_var_id = $('.sub_custom_widget .one_time').attr('custom_id');
   var add_product_tax = $('.sub_custom_widget .one_time').attr('meta_tax');
        
                 
        $("body").append(
            "<form class='cart-add' name='cart-add' method='post' action='/cart/add'>" +
                "<input type='hidden' name='items[0][id]' value='" + var_id + "'/>" +
                "<input type='hidden' class='items_" + var_id + "' name='items[0][quantity]' value='" + qty + "'/>" +
                "<input type='hidden' name='items[0][selling_plan]' value='" + sell_id + "'>" + 
                "<input type='hidden' class='items_" + var_id + "' name='items[0][properties][ID]' value='" + product_id + "'/>" +
                  "<input type='hidden' class='items_" + var_id + "' name='items[0][properties][Tax]' value='" + product_tax + "'/>" +
                "<input type='hidden' name='items[1][id]' value='" + cus_var_id + "'/>" +
                "<input type='hidden' class='items_" + var_id + "' name='items[1][quantity]' value='" + qty + "'/>" +
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
                updateCart(); 
                $("body form.cart-add").remove();
                // STEP 2: After adding non-retail product, clear any retail products
                clearRetailProductsFromCart();
            } 
        });
    } else {  
 
// alert('please check box select');
   $('.text_select_box').show();
     setTimeout(function() {
     $('.text_select_box').hide();   
     }, 2500);
    }
       
        
    } else {
  var qty = 1;
       var var_id = $('.main_sub_pr').attr('custom_id');
      var new_tax = $('.main_sub_pr').attr('meta_tax'); 
       var new_id = $('.main_sub_pr').attr('new_id'); 
   var formel=  "<form class='cart-add' name='cart-add' method='post' action='/cart/add'>" +
                "<input type='hidden' name='items[0][id]' value='" + var_id + "'/>" +
                "<input type='hidden' class='items_" + var_id + "' name='items[0][quantity]' value='" + qty + "'/>" +
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
                updateCart();
                // STEP 2: After adding non-retail product, clear any retail products
                clearRetailProductsFromCart();
            }
        });
    }
});


// Helper function to clear retail products from cart (optimistic + server sync)
function clearRetailProductsFromCart() {
  console.log('Clearing retail products from cart...');
  
  // Get all current cart items displayed
  var $retailItems = [];
  $('.content-block .part').each(function() {
    var $part = $(this);
    var key = $part.attr('key');
    
    // Check if this item is retail
    // Retail items will NOT have "Ex. VAT" in their price text
    var $priceDiv = $part.find('.price');
    var priceText = $priceDiv.text();
    
    // Retail items will NOT have "Ex. VAT" in their price text
    if (priceText && !priceText.includes('Ex. VAT')) {
      $retailItems.push({
        element: $part,
        key: key
      });
    }
  });
  
  if ($retailItems.length > 0) {
    console.log('Found', $retailItems.length, 'retail items to remove');
    
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
    $retailItems.forEach(function(item) {
      if (item.key) {
        updates[item.key] = 0;
      }
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
    })
    .catch((error) => {
      console.error('Failed to remove retail products from server:', error);
    });
  } else {
    console.log('No retail products found in cart');
  }
}

// Helper function to clear non-retail products from cart (optimistic + server sync)
function clearNonRetailProductsFromCart() {
  console.log('Clearing non-retail products from cart...');
  
  // Get all current cart items displayed
  var $nonRetailItems = [];
  $('.content-block .part').each(function() {
    var $part = $(this);
    var key = $part.attr('key');
    
    // Check if this item has the retail property
    // Since we're adding a retail item, any existing item without is_retail=true should be removed
    // We'll identify non-retail items as those without the retail marker in their display
    var $priceDiv = $part.find('.price');
    var priceText = $priceDiv.text();
    
    // Non-retail items will have "Ex. VAT" in their price text
    if (priceText && priceText.includes('Ex. VAT')) {
      $nonRetailItems.push({
        element: $part,
        key: key
      });
    }
  });
  
  if ($nonRetailItems.length > 0) {
    console.log('Found', $nonRetailItems.length, 'non-retail items to remove');
    
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
    $nonRetailItems.forEach(function(item) {
      if (item.key) {
        updates[item.key] = 0;
      }
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
    })
    .catch((error) => {
      console.error('Failed to remove non-retail products from server:', error);
    });
  } else {
    console.log('No non-retail products found in cart');
  }
}

$(document).on("click", "button.add_cartretail", function() {
  // For retail products, get variant ID directly from button data attributes
  console.log("Adding retail product to cart...");
  $('body').addClass("js-drawer-open-right");
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
  data.properties["is_retail"] = "true";

  

  $.ajax({
    url: "/cart/add.js",
    type: "POST",
    data: data,
    dataType: "json",
    success: function(result) {
      updateCart();
      // STEP 2: After adding retail product, clear any non-retail products
      clearNonRetailProductsFromCart();
    },
    error: function(xhr, status, error) {
      console.error("Error adding to cart:", error, xhr.responseText);
    }
  });
});
