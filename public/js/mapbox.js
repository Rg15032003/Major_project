mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: "map", 
  style: "mapbox://styles/mapbox/streets-v12",
  center: coordinates, 
  zoom: 9,
});

const el = document.createElement("div");
el.className = "custom-marker";

const popup = new mapboxgl.Popup({ offset: 25 })
  .setHTML(`
    <div style="text-align:center;">
      <h5 style="margin:0;color:#333;">📍 ${listingTitle}</h5>
      <p style="margin:0;">Welcome to Wanderlust</p>
    </div>
  `);

new mapboxgl.Marker(el)
  .setLngLat(coordinates)
  .setPopup(popup)
  .addTo(map);
