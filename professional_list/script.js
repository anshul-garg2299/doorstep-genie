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
let available = firebase.database().ref("employees/available");

//Listen for Submit
//document.getElementById("newRequestForm").addEventListener("submit", submitForm);

//function submitForm(e) {
//    e.preventDefault();
//
//    let customerID = document.getElementById("customerID").value;
//    let contact = document.getElementById("contact").value;
//    let service = document.getElementById("service").value.toLowerCase();
//    let latitude = document.getElementById("lat").value;
//    let longitude = document.getElementById("lng").value;
//
//    addRequest(customerID, contact, service, latitude, longitude);
//
//    document.getElementById("newRequestForm").reset();
//
//}

//Save info to Firebase
//function addRequest(customerID, contact, service, latitude, longitude) {
//    let newRequests = requests.push();
//
//    newRequests.set({
//        customerID: customerID,
//        contact: contact,
//        service: service,
//        latitude: latitude,
//        longitude: longitude
//    });
//}

available.ref.once('value',gotData);

function gotData(data){
    let info = data.val();
    let keys = Object.keys(info);
    
    for(let i = 0; i < keys.length; i++){
        let key = keys[i];
        let number = i + 1;
        let contact = info[key].contact;
        let EmployeeID = info[key].employeeID;
        let totalScore = info[key].totalScore;
        let service = info[key].service.toUpperCase();
        let completedOrders = info[key].completedOrders;
        let rating; 
        if(completedOrders===0){
            rating = "-";
        }
        else{
            rating = totalScore/completedOrders;
            rating = Number((rating).toFixed(2));
        }
        
        document.getElementById("tbody").innerHTML+=`<tr>
                                <th>${number}</th>
                                <td>${EmployeeID}</td>
                                <td>${service}</td>
                                <td>${contact}</td>
                                <td>${rating}</td>
                                <td>AVAILABLE</td>
                            </tr>`;
    }
}
