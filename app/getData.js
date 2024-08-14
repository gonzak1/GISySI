

// Carga de Mapa
let mymap;
// Esperar a que el DOM esté listo
document.addEventListener("DOMContentLoaded", function() {
  // Asignar el contenedor 'map' y establecer las coordenadas y el nivel de zoom
  mymap = L.map('map').setView([-32.5, -68], 8);
  // Añadir una capa de mapa base utilizando la API de OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(mymap);
});


// Consulta de datos
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var datos = JSON.parse(this.responseText);
    createMarkers(datos);
  }
};
xhttp.open("GET", "./data/Records_GS.json", true);
xhttp.send();


// Dibujar datos
function createMarkers(datos){
  datos.locations.forEach(function(dato) {
    let latitud = dato.latitudeE7.toString(); // Convertir el número a una cadena
    latitud = parseFloat(latitud.slice(0, 3) + "." + latitud.slice(3)); // Agregar el punto
    let longitud = dato.longitudeE7.toString(); // Convertir el número a una cadena
    longitud = parseFloat(longitud.slice(0, 3) + "." + longitud.slice(3)); // Agregar el punto
    // Añadir un marcador en una ubicación específica
    var marker = L.marker([latitud, longitud]).addTo(mymap);
    // Añadir un mensaje emergente al marcador
    //marker.bindPopup("<b>Hello world!</b><br>This is a Leaflet map.").openPopup();
  });
}