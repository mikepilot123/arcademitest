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
     
      setTimeout(function(){
       $(".site-header__cart-count span").text(itemcount);
         $(".site-header__cart-count").removeClass("hide");
      },1000);
      
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
   // Check if product has retail tag by extracting handle from URL
   const productHandle = items[i]['url'].replace('/products/', '').split('?')[0];
   fetch('/products/' + productHandle + '.js')
     .then(response => response.json())
     .then(productData => {
       const isRetail = productData.tags && productData.tags.includes('retail');
       const vatText = isRetail ? '' : ' Ex. VAT';
       $(".cart-drawer-sec .bottom .content-block .loop-"+i+" .content .quantitybox").append("<div data-price='"+price+"' class='price'>"+curr+price+ vatText+"</div>");
     })
     .catch(() => {
       // Fallback: assume non-retail if fetch fails
       $(".cart-drawer-sec .bottom .content-block .loop-"+i+" .content .quantitybox").append("<div data-price='"+price+"' class='price'>"+curr+price+ " Ex. VAT</div>");
     });

       
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
   let updates = key.reduce((acc, id) => {
  acc[id] = qty; 
  return acc;
}, {}); 
  fetch(window.Shopify.routes.root + 'cart/update.js', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ updates })
})
.then(response => {
 updateCart(); 
})
.catch((error) => {
  
});
  
     
});







   
/* Cart drawer minus quantity */
$(document).on("click","button.minus_quantity",function(){
event.preventDefault(); 
    var data_id = $(this).attr('data-id');
    var $button = $(this);
     var $part = $button.closest('.part');
     var prop = $part.attr('prop'); 
   var qty = parseInt($(".cart__qty-input[data-id='"+data_id+"']").val()) - 1;
    var key = [];
   $('.content-block .part[prop="' + prop + '"]').each(function() {
      var key1 = $(this).attr('key');      
         key.push(key1); 

    });
   let updates = key.reduce((acc, id) => {
  acc[id] = qty; 
  return acc;
}, {}); 
  fetch(window.Shopify.routes.root + 'cart/update.js', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ updates })
})
.then(response => {
 updateCart(); 
})
.catch((error) => {
  
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
   // var var_id = [];
    $('.content-block .part[prop="' + prop + '"]').each(function() {
      var key1 = $(this).attr('key');      
         key.push(key1); 

    });
    let updates = key.reduce((acc, id) => {
  acc[id] = 0; 
  return acc;
}, {});  
 
 fetch(window.Shopify.routes.root + 'cart/update.js', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ updates })
})
.then(response => {
updateCart(); 
})
.catch((error) => {
  
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
            }
        });
    }
});

