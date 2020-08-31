var firebaseConfig = {
    apiKey: "AIzaSyAs_FOtNgIKf9JKSumA3wiCx3YgXYGym4o",
    authDomain: "test-form-c309b.firebaseapp.com",
    databaseURL: "https://test-form-c309b.firebaseio.com",
    projectId: "test-form-c309b",
    storageBucket: "test-form-c309b.appspot.com",
    messagingSenderId: "1029511224865",
    appId: "1:1029511224865:web:66669d730933395db98d60"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


//Reference Request Collection
let completed = firebase.database().ref("requests/completed");
let req = firebase.database().ref("requests/req");
let all = firebase.database().ref("requests");

all.once("value").then(function (snapshot) {
    let r = snapshot.child("req").val();
    console.log(Object.keys(r));

    let c = snapshot.child("completed").val();
    console.log(Object.keys(c));

    let totalOrders = Object.keys(r).length + Object.keys(c).length;
    console.log(totalOrders);
    document.getElementById("totalOrders").innerHTML = `${totalOrders}`;

});

completed.ref.once('value', gotData);
req.ref.once('value', addTBP);

function addTBP(data) {
    let info = data.val();
    let keys = Object.keys(info);
    document.getElementById("tbP").innerHTML = `${keys.length}`;

}


function gotData(data) {
    let info = data.val();
    let keys = Object.keys(info);
    let dogWalkerCount = 0;
    let electricianCount = 0;
    let plumbingCount = 0;
    let carpenterCount = 0;
    let totalScore = 0;
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let service = info[key].service;
        if (service === "electrician") {
            electricianCount++;
        } else if (service === "dog walker") {
            dogWalkerCount++;
        } else if (service === "carpenter") {
            carpenterCount++;
        } else if (service === "plumbing") {
            plumbingCount++;
        }
        totalScore += parseFloat(info[key].rating);
    }
    google.charts.load("current", {
        packages: ["corechart"]
    });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable([
                ['Task', 'Orders'],
                ['Dog Walker', dogWalkerCount],
                ['Electrcian', electricianCount],
                ['Carpenter', carpenterCount],
                ['Plumbing', plumbingCount]
            ]);

        var options = {
            title: 'Service Distribution',
            pieHole: 0.5,
        };

        var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
        chart.draw(data, options);



    }
    document.getElementById("completedOrders").innerHTML = `${keys.length}`
    let rating = totalScore / keys.length;
    document.getElementById("rating").innerHTML = `${rating}/5`;

}
