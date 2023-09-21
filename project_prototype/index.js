document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM content loaded");
    const map = L.map("map").setView([-32.00526471718889, 115.89188523743833], 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    const markers = {
        "row1": L.marker([-32.00366103481073, 115.89282585477542]),
        "row2": L.marker([-32.00959407967216, 115.89185757204376]),
        "row3": L.marker([-32.00979407967216, 115.89385757204376])
    };

    const markerGroup = L.layerGroup(Object.values(markers)).addTo(map);

    // Add a click event listener to each marker
    Object.keys(markers).forEach(key => {
        const marker = markers[key];
        marker.on('click', function () {
            // Remove the 'highlight' class from all table rows
            const tableRows = document.querySelectorAll('tbody tr');
            tableRows.forEach(row => {
                row.classList.remove('table-success');
            });

            // Find the corresponding table row by matching the marker key
            const tableRow = document.querySelector(`tbody tr[data-key="${key}"]`);

            // Add the 'highlight' class to the corresponding table row
            if (tableRow) {
                tableRow.classList.add('table-success');
                // Scroll to the highlighted table row
                tableRow.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

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
