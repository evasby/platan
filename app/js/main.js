$(document).ready(function(){
  $(".slider_list").lightSlider({
    item: 1,
    controls: false,
    mode: 'fade'
  });
  var partners = $(".partners_list").lightSlider({
    item: 6,
    pager: false,
    controls: false,
    loop: true,
    slideMargin: 18
  });
  $(".partners_left").click(function(){
    partners.goToPrevSlide()
  });
  $(".partners_right").click(function(){
    partners.goToNextSlide()
  });
  $(".entry_link").colorbox({inline:true, href:"#form-entire", opacity: 0.8, top: "20%"});
  $(".basket-table_photo").colorbox({className: 'ctable', transition: 'none'});
  $(".basket_link").click(function(){
    $(".basket-popup").show();
  });
  $(document).mouseup(function (e) {
    var container = $(".basket-popup");
    if (container.has(e.target).length === 0){
        container.hide();
    }
  });
  /***********************************/
  if($("#yamap").length>0) {
    ymaps.ready(init);
  }
  var myMap;
  function init(){     
    myMap = new ymaps.Map("yamap", {
        center: [59.90648525806242,30.372057499999976],
        zoom: 15
    });
    myPlacemark = new ymaps.Placemark([59.90648525806242,30.372057499999976], {   
      },{
        iconLayout: 'default#image',
        iconImageHref: '../images/yamap-marker.png',
        iconImageSize: [59, 62],
        iconImageOffset: [-26, -62]
    });

    myMap.geoObjects.add(myPlacemark);
  }
  /***********************************/
});