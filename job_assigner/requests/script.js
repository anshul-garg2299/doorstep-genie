// Your web app's Firebase configuration
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

let requests = firebase.database().ref("requests/req");
let employees = firebase.database().ref("employees/available");
let db = firebase.database().ref();

db.ref.once("value").then(function (snapshot) {
    let req = snapshot.child("requests").child("req").val();
    //    console.log(Object.keys(req));

    let available = snapshot.child("employees").child("available").val();
    //    console.log(Object.keys("available"));

    let keysE = Object.keys(available);
    let keysR = Object.keys(req);
    let Plumbers = [];
    let Carpenters = [];
    let DogWalkers = [];
    let Electricians = [];

    for (let i = 0; i < keysE.length; i++) {
        let key = keysE[i];
        if (available[key].service === "electrician") {
            Electricians.push(available[key]);
        }
        if (available[key].service === "dog walker") {
            DogWalkers.push(available[key]);
        }
        if (available[key].service === "carpenter") {
            Carpenters.push(available[key]);
        }
        if (available[key].service === "plumbing") {
            Plumbers.push(available[key]);
        }
    }

    for (let i = 0; i < keysR.length; i++) {
        let key = keysR[i];
        let lat = req[key].latitude;
        let lng = req[key].longitude;
        let customerID = req[key].customerID;
        let contact = req[key].contact;
        let service = req[key].service;
        let rating = req[key].rating;

        let mk = L.marker([lat, lng]);
        mk.addTo(map);

        let popup = `<div class="popup">
    <h2>Customer ID: ${customerID}</h4>
    <h3>Service Requested: ${service}</h5>
    <h4>Contact Number: ${contact} </h5
    </div>
<div class="dropdown">
    <button type="button" class="btn btn-default dropdown-toggle" style="background-color:azure" data-toggle="dropdown">
        <h3>Assign Employee</h3> <span class="caret"></span>
    </button>
    <ul class="dropdown-menu">`;
        if (service === "electrician") {
            for (let i = 0; i < Electricians.length; i++) {
                let employeeID = Electricians[i].employeeID;
                let name = Electricians[i].name;
                let rating = (Electricians[i].totalScore / Electricians[i].completedOrders).toFixed(1);
                let string = `<li>${employeeID} ${name} ${rating}</li>`;
                popup += string;

            }
        }
        if (service === "dog walker") {
            for (let i = 0; i < DogWalkers.length; i++) {
                let employeeID = DogWalkers[i].employeeID;
                let name = DogWalkers[i].name;
                let rating = (DogWalkers[i].totalScore / DogWalkers[i].completedOrders).toFixed(1);
                let string = `<li>${employeeID} ${name} ${rating}</li>`;
                popup += string;
            }
        }
        if (service === "carpenter") {
            for (let i = 0; i < Carpenters.length; i++) {
                let employeeID = Carpenters[i].employeeID;
                let name = Carpenters[i].name;
                let rating = (Carpenters[i].totalScore / Carpenters[i].completedOrders).toFixed(1);
                let string = `<li>${employeeID} ${name} ${rating}</li>`;
                popup += string;
            }

        }
        if (service === "plumbing") {
            for (let i = 0; i < Plumbers.length; i++) {
                let employeeID = Plumbers[i].employeeID;
                let name = Plumbers[i].name;
                let rating = (Plumbers[i].totalScore / Plumbers[i].completedOrders).toFixed(1);
                let string = `<li>${employeeID} ${name} ${rating}</li>`;
                popup += string;
            }

        }
        popup+=`</ul></div`;

        mk.bindPopup(popup);
        
        //TO-DO bind functionality to dropdown list items to assign request to employee
        //TO-DO style dropdown menu properly
    }







});

var map = new MapmyIndia.Map("map", {
    center: [28.61, 77.23],
    zoomControl: true,
    hybrid: false
});

//requests.ref.once('value', gotData);

//function gotData(data) {
//    let info = data.val();
//    let keys = Object.keys(info);
//
//    for (let i = 0; i < keys.length; i++) {
//        let key = keys[i];
//        let lat = info[key].latitude;
//        let lng = info[key].longitude;
//        let customerID = info[key].customerID;
//        let contact = info[key].contact;
//        let service = info[key].service;
//        let rating = info[key].rating;
//        //Add Marker
//        let mk = L.marker([lat, lng]);
//        mk.addTo(map);
//        let popup = `<div class="popup">
//    <h2>Customer ID: ${customerID}</h4>
//    <h3>Service Requested: ${service}</h5>
//    <h4>Contact Number: ${contact} </h5
//    </div>
//<div class="dropdown">
//    <button type="button" class="btn btn-default dropdown-toggle" style="background-color:azure" data-toggle="dropdown">
//        Assign Employee <span class="caret"></span>
//    </button>
//    <ul class="dropdown-menu">
//    </ul>
//</div>`;
//
//
//
//
//        mk.bindPopup(popup);
//
//    }
//}
