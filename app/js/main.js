$(document).ready(function(){
  /***********************************/
  /***********************************/
  if($("#map").length>0) {
    var map;
    var myLatlng = new google.maps.LatLng(53.8749103, 27.6714312);
    var myCenter = new google.maps.LatLng(53.8749103, 27.6714312);
    function initialize() {
      /*var styles = [
        {
          stylers: [
            { hue: "#cccccc" },
            { saturation: -120 }
          ]
        },{
          featureType: "road",
          elementType: "geometry",
          stylers: [
            { lightness: 100 },
            { visibility: "simplified" }
          ]
        },{
          featureType: "road",
          elementType: "labels",
          stylers: [
            { visibility: "off" }
          ]
        }
      ];*/
      /*var styledMap = new google.maps.StyledMapType(styles,
      {name: "Styled Map"});*/
      var mapOptions = {
        zoom: 17,
        center: myCenter
        /*mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        }*/
      };
      map = new google.maps.Map(document.getElementById('map'),
          mapOptions);
      var marker = new google.maps.Marker({
          position: myLatlng,
          title:"Webformat"
          //icon: '../images/footer-marker.png'
      });
      marker.setMap(map);
      var contentString = '<section class="location"><h1>ООО “КАМФРИ”</h1><p>+375 (29) <b>574 93 20</b>; +375 (29) <b>574 93 20</b></p><p>г. Минск, ул. Байкальская, 58/1</p></section>';
      var infowindow = new google.maps.InfoWindow({
          content: contentString
      });
      infowindow.open(map,marker);
      map.mapTypes.set('map_style', styledMap);
      map.setMapTypeId('map_style');
    }
    google.maps.event.addDomListener(window, 'load', initialize);
    /************************************************************************/
  }
});