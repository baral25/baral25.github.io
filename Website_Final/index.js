document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM content loaded");
    const map = L.map("map").setView([-32.00526471718889, 115.89188523743833], 12.7);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    var goldIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    var redIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    var blueIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    const popupContent = {
        "row1": "Vinnies",
        "row2": "Food Bank",
        "row3": "Lifestream",
        "row4": "Curtin Food Pantry",
        "row5": "SouthCare",
        "row6": "Riverview Comminity Serv",
        "row7": "Heaven Center"
    };

    const markers = {
        "row1": L.marker([-32.063027486015, 115.91067963462633], { icon: goldIcon }).bindPopup(popupContent.row1, { autoClose: false, closeOnClick: false }),
        "row2": L.marker([-31.95433753671477, 115.98505380653512], { icon: goldIcon }).bindPopup(popupContent.row2, { autoClose: false, closeOnClick: false }),
        "row3": L.marker([-32.00085183135982, 115.87407619951131], { icon: goldIcon }).bindPopup(popupContent.row3, { autoClose: false, closeOnClick: false }),
        "row4": L.marker([-32.00521365115725, 115.89360300774914], { icon: redIcon }).bindPopup(popupContent.row4, { autoClose: false, closeOnClick: false }),
        "row5": L.marker([-32.011335805308704, 115.86931602952703], { icon: blueIcon }).bindPopup(popupContent.row5, { autoClose: false, closeOnClick: false }),
        "row6": L.marker([-31.966461295632133, 115.89314358280663], { icon: blueIcon }).bindPopup(popupContent.row6, { autoClose: false, closeOnClick: false }),
        "row7": L.marker([-31.986115347364077, 115.90368751933244], { icon: blueIcon }).bindPopup(popupContent.row7, { autoClose: false, closeOnClick: false })
    };

    // Add markers to the map
    Object.keys(markers).forEach(key => {
        markers[key].addTo(map);
    });

    // Function to handle row click and navigate to a new page
    function handleRowClick(rowKey) {
        navigateToPage(rowKey);
    }

    // Add a click event listener to each marker
    Object.keys(markers).forEach(key => {
        const marker = markers[key];
        marker.on('click', function () {
            handleRowClick(key);
        });
    });

    // Open popups for all markers
    Object.keys(markers).forEach(key => {
        markers[key].openPopup();
    });

    function navigateToPage(rowKey) {
        const pageURLs = {
            "row1": 'page1.html',
            "row2": 'page2.html',
            "row3": 'page3.html',
            "row4": 'page4.html'
        };

        const targetURL = pageURLs[rowKey];

        if (targetURL) {
            window.location.href = targetURL;
        }
    }
});
