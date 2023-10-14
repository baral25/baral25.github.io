document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM content loaded");
    const map = L.map("map").setView([-32.00526471718889, 115.89188523743833], 15);

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
    const markers = {
        "row1": L.marker([-32.00366103481073, 115.89282585477542],{icon:goldIcon}),
        "row2": L.marker([-32.00959407967216, 115.89185757204376],{icon:redIcon}),
        "row3": L.marker([-32.00979407967216, 115.89385757204376],{icon:blueIcon})
    };

    const markerGroup = L.layerGroup(Object.values(markers)).addTo(map);

    // Function to handle row click and navigate to a new page
    function handleRowClick(rowKey) {
        navigateToPage(rowKey);

        // Remove the 'highlight' class from all table rows
        const tableRows = document.querySelectorAll('tbody tr');
        tableRows.forEach(row => {
            row.classList.remove('table-success');
        });

        // Find the corresponding table row by matching the marker key
        const tableRow = document.querySelector(`tbody tr[data-key="${rowKey}"]`);

        // Add the 'highlight' class to the corresponding table row
        if (tableRow) {
            tableRow.classList.add('table-success');
            // Scroll to the highlighted table row
            tableRow.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Add a click event listener to each marker
    Object.keys(markers).forEach(key => {
        const marker = markers[key];
        marker.on('click', function () {
            handleRowClick(key);
        });
    });

    // Add click event listeners to table rows
    const tableRows = document.querySelectorAll('tbody tr');

    tableRows.forEach(row => {
        row.addEventListener('click', function () {
            const rowKey = row.getAttribute('data-key');
            handleRowClick(rowKey);
        });
    });

    // Function to handle row click and navigate to a new page
    function navigateToPage(rowKey) {
        // Define the mapping of row keys to page URLs
        const pageURLs = {
            row1: 'page1.html',
            row2: 'page2.html',
            row3: 'page3.html'
        };

        // Get the URL associated with the clicked row
        const targetURL = pageURLs[rowKey];

        if (targetURL) {
            window.location.href = targetURL; // Navigate to the URL
        }
    }

    // Check the current time and change text color accordingly
    function checkOpenStatus() {
        const currentTime = new Date();
        const hours = currentTime.getHours();

        // Loop through the table rows and update text color based on open/closed status
        const tableRows = document.querySelectorAll('tbody tr');
        tableRows.forEach(row => {
            if (hours >= 9 && hours <= 17) {
                row.classList.remove('closed'); // Remove 'closed' class
            } else {
                row.classList.add('closed'); // Add 'closed' class
            }
        });
    }

    // Call the checkOpenStatus function initially and every minute
    checkOpenStatus();
    setInterval(checkOpenStatus, 60000); // Update every minute
});
