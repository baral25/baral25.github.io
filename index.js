
// Create a map when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    const map = L.map("map").setView([-32.00526471718889, 115.89188523743833], 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);
    var marker1 = L.marker([-32.00366103481073, 115.89282585477542]).addTo(map);
    marker1.bindPopup("Location - 1");
    var marker2 = L.marker([-32.00959407967216, 115.89185757204376]).addTo(map);
    marker2.bindPopup("Lcoation - 2 ");
    var marker3 = L.marker([-32.00943516383286, 115.91572105614082]).addTo(map);
    marker3.bindPopup("Location - 3 .");
    L.marker([51.5, -0.09]).addTo(map);
});


