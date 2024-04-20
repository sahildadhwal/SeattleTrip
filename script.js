$(function() {

    var sheetID = "1YkXKzXRi43BzVadPG_MCQL1_owskinVAnQoCzChiG_g";
    var apiKey = "AIzaSyAqFZKpmX0B9pqZytwBD-v7ItAPDKcrpiQ";
    var sheetURL = "https://sheets.googleapis.com/v4/spreadsheets/" + sheetID + "/values/A4:L100?key=" + apiKey;
    
    
    // Retrieve data from Google Sheets
    function getData() {
        $.getJSON(sheetURL, function(data) {
            var table = $("#event-list");
            table.empty();
            var rows = data.values;

            // Sort rows by the "When" column
            rows.sort(function(a, b) {
                var daysOfWeek = ["Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
                return daysOfWeek.indexOf(a[0]) - daysOfWeek.indexOf(b[0]);
            });

            for (var i = 0; i < rows.length; i++) {
                var when = rows[i][0];
                var event = rows[i][1];
                var lengthOfTime = rows[i][2];
                var attendees = rows[i].slice(3);

                // Create array to hold attendees
                var attendeeNames = ["Noel", "Megan", "Hope", "Saliou", "Jesse", "Sahil", "Justin", "Ruth", "Jake"];

                // Create rows for each event
                var rowHTML = "<tr><td>" + when + "</td><td>" + event + "</td><td>" + lengthOfTime + "</td>";

                for (var j = 0; j < attendeeNames.length; j++) {
                    var isGoing = attendees[j] === "TRUE" ? "✅" : "❌";
                    rowHTML += "<td>" + isGoing + "</td>";
                }

                rowHTML += "</tr>";
                table.append(rowHTML);
            }
        });
    }

    // getData();

        // Initialize the countdown timer
        var tripDate = new Date("May 17, 2024").getTime();
        var countdownElem = $("#countdown");
    
        var countdownInterval = setInterval(function() {
            getData();
            var now = new Date().getTime();
            var distance = tripDate - now;
            if (distance < 0) {
                clearInterval(countdownInterval);
                countdownElem.text("Seattle Trip has arrived!");
                return;
            }
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
            var countdownText = days + "d " + hours + "h " + minutes + "m " + seconds + "s";
            countdownElem.text(countdownText);
        }, 1000);


        // Display today's date and the number of days until graduation
    var today = new Date();
    var daysUntilTrip = Math.floor((tripDate - today) / (1000 * 60 * 60 * 24));
    var dateElem = $("#date");
    dateElem.text("Today is " + today.toDateString() + ", " + daysUntilTrip + " days until Friday, May 17 2024.");


});
