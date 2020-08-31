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

let requests = firebase.database().ref("requests/completed");

var map=new MapmyIndia.Map("map",{ center:[28.61, 77.23],zoomControl: true,hybrid:false });

requests.ref.once('value',gotData);

function gotData(data){
    let info = data.val();
    let keys = Object.keys(info);
    
    for(let i = 0; i < keys.length;i++){
        let key = keys[i];
        let lat = info[key].latitude;
        let lng = info[key].longitude;
        let customerID = info[key].customerID;
        let contact = info[key].contact;
        let service = info[key].service;
        let rating = info[key].rating;
        //Add Marker
        let mk = L.marker([lat,lng]);
        mk.addTo( map);
        mk.bindPopup(`<div class="popup">
    <h2>Customer ID: ${customerID}</h4>
    <h3>Service Requested: ${service}</h5>
    <h3> Rating: ${rating}</h4>
    <h4>Contact Number: ${contact} </h5
    
</div>`)
        
    }    
}