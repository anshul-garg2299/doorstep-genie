// Your web app's Firebase configuration
var firebaseConfig = {
    authDomain: "test-form-c309b.firebaseapp.com",
    databaseURL: "https://test-form-c309b.firebaseio.com",
    projectId: "test-form-c309b",
    storageBucket: "test-form-c309b.appspot.com",
    messagingSenderId: "1029511224865",
    appId: "1:1029511224865:web:66669d730933395db98d60"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Reference Employee collection
let employeeInfo = firebase.database().ref("employees/available");


//Listen for submit
document.getElementById("newProfessionalForm").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

    let id = document.getElementById("customerID").value;
    let name = document.getElementById("name").value;
    let contact = document.getElementById("contact").value;
    let service = document.getElementById("service").value.toLowerCase();
    let latitude = document.getElementById("lat").value;
    let longitude = document.getElementById("lng").value;

    addEmployee(name, contact, service, latitude, longitude,id);

    document.getElementById("newProfessionalForm").reset();

}

// Save infos to Firebase
function addEmployee(name, contact, service, latitude, longitude,id) {
    let newEmployeeInfo = employeeInfo.push();

    newEmployeeInfo.set({
        employeeID: id,
        name: name,
        contact: contact,
        service: service,
        latitude: latitude,
        longitude: longitude,
        completedOrders: 0,
        totalScore: 0
        
    });

//    retriveInfos();
}

// Retreive info
//function retriveInfos() {
//    let ref = firebase.database().ref("employees");
//    ref.on("value", gotData);
//}
//
//function gotData(data) {
//    let info = data.val();
//    let keys = Object.keys(info);
//
//    for (let i = 0; i < keys.length; i++) {
//        let key = keys[i];
//        let name = info[key].name;
//        let contact = info[key].contact;
//        let service = info[key].service;
//        let latitude = info[key].latitude;
//        let longitude = info[key].longitude;
//        console.log(name, contact, service, latitude, longitude);
//    }
    //            let key = keys[keys.length-1];
    //            let name = info[key].name;
    //            let contact = info[key].contact;
    //            let service = info[key].service;
    //            let latitude = info[key].latitude;
    //            let longitude = info[key].longitude;
    //            console.log(name, contact, service, latitude, longitude);
