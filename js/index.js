

function initMap() {
    var Vancouver = {
        lat: 49.2827, 
        lng: -123.1207
    };
    map = new google.maps.Map(document.getElementById('map'), {
        center: Vancouver,
        zoom: 11,
        styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
        ],
        mapTypeId: 'roadmap',
    });
    infoWindow = new google.maps.InfoWindow();
    displayPlaces();displayPlaces()
}

function displayPlaces(){
    var placesHtml ='';
    var count = 1;
    // var NewConfirmed = data['Global']['NewConfirmed'];
    // var TotalConfirmed = data['Global']['TotalConfirmed'];
    // var NewDeaths = data['Global']['NewDeaths'];
    // var TotalDeaths = data['Global']['TotalDeaths'];
    // var NewRecovered = data['Global']['NewRecovered'];
    // var TotalRecovered = data['Global']['TotalRecovered'];
    var da = data["Global"];
    // for(var i = 0 ; i <=5; i++){
    Object.keys(da).forEach((key,index) => {    
        placesHtml += `
                <div class="store-container">
                <div class="store-info-container">
                    <div class="store-address">
                        <span>${key}</span>
                    </div>
                    <div class = "store-phone-number">
                         ${da[key]}
                </div>
                </div>
                <div class="store-number-container">
                    <i class="fas fa-chevron-circle-right" style="font-size: 20px;"></i>
                </div>
                </div>
            `
            document.querySelector('.stores-list').innerHTML = placesHtml;
    })
}

function showMarkers(){
      for(var [index, store] of data["Countires"].entries()){
          var Country = data["Countires"][index]["Country"];
          var CountryCode = data["Countires"][index]["CountryCode"];
          //var openStatusText = store["openStatusText"]
          var TotalConfirmed = data["Countires"][index]["TotalConfirmed"];
          createMarker(Country, CountryCode, TotalConfirmed, index+1);
      }
  }
  function createMarker(Country, CountryCode, TotalConfirmed, index){
    var html = `
          <div class="store-info-window">
              <div class="store-info-name">
                  ${Country}
              </div>
              <div class="store-info-city">
                  ${CountryCode}
              </div>
              <div class="store-info-phone">
                  <div class="circle">
                      <i class="fas fa-phone-alt"></i>
                  </div>
                    ${TotalConfirmed}
              </div>
          </div>
      `;
      var cityCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map,
        center: citymap[city].center,
        radius: Math.sqrt(citymap[city].population) * 100
      });
      google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
      });
      markers.push(marker);
  }
  