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

//Reference Request Collection
let requests = firebase.database().ref("requests/req");

//Listen for Submit
document.getElementById("newRequestForm").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

    let customerID = document.getElementById("customerID").value;
    let contact = document.getElementById("contact").value;
    let service = document.getElementById("service").value.toLowerCase();
    let latitude = document.getElementById("lat").value;
    let longitude = document.getElementById("lng").value;
   

    addRequest(customerID, contact, service, latitude, longitude,rating);

    document.getElementById("newRequestForm").reset();

}

//Save info to Firebase
function addRequest(customerID, contact, service, latitude, longitude,rating) {
    let newRequests = requests.push();

    newRequests.set({
        customerID: customerID,
        contact: contact,
        service: service,
        latitude: latitude,
        longitude: longitude,
        rating: 0
    });
}
