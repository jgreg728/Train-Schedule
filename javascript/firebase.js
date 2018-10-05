// Initialize Firebase
var config = {
  apiKey: "AIzaSyByvJf61tW4GynE-AZ_eC1hyDUDuOI2XB4",
  authDomain: "train-timetable-96e0e.firebaseapp.com",
  databaseURL: "https://train-timetable-96e0e.firebaseio.com",
  projectId: "train-timetable-96e0e",
  storageBucket: "train-timetable-96e0e.appspot.com",
  messagingSenderId: "271809304705"
};
firebase.initializeApp(config);
console.log(firebase);

var database = firebase.database(config);
var ref = database.ref

// Trying to remove "development build" error....
import firebase from 'firebase/app';
import 'firebase/database'; // If using Firebase database
import 'firebase/storage';  // If using Firebase storage

// Create Button to add train info
$("#submitBtn").on("click", function() {
  var train = $("#trainAdd").val().trim();
  var destination = $("#destinationAdd").val().trim();
  var firstTrainTime = moment($("#timeAdd").val().trim(), "HH:mm").format("HH:mm");
  var frequency = $("#frequencyAdd").val().trim();

  // save train data in object after its submitted
  var trainSubmitted = {
    nameEntry: train,
    destinationEntry: destination,
    timeEntry: firstTrainTime,
    frequencyEntry: frequency,
  }

  // push data to firebase
  database.ref().push(trainSubmitted);
  console.log(trainSubmitted.nameEntry)
  $("#trainAdd").val("").trim();
  $("#destinationAdd").val("").trim();
  $("#timeAdd").val("").trim();
  $("#frequencyAdd").val("");

  return false;
})

// HAVE SNAPSHOTS OF SUBMITTED DATA BE PUSHED TO FIREBASE VIA THIS FUNCTION
database.ref().on("data_added", function (dataSnapshot){
  var train = dataSnapshot.val().nameEntry;
  var destination = dataSnapshot.val().destinationEntry;
  var firstTrainTime = dataSnapshot.val().timeEntry;
  var frequency = dataSnapshot.val().frequencyEntry;

  // var to always set first train time before current time
  var beforeCurrentTime = moment(firstTrainTime, 'HH:mm');
  console.log(beforeCurrentTime);
  var currentTime = moment().format("HH:mm");
  console.log("CURRENT TIME" + currentTime)

  // CALCULATE TIME UNTIL NEXT TRAIN

  // get difference between currentTime and firstTrainData
  var timeDifference = moment().diff(moment(beforeCurrentTime), "minutes");
  console.log(firstTrainTime);
  console.log("Difference = " + timeDifference);

  // remainder 
  var remainder = timeDifference % frequencyData;
  console.log(remainder);

  // mins until next train
  var nextTrainTime = frequencyData - remainder
  var nextTrain = moment().add(nextTrainTime, "minutes").format("HH:mm");
  $("#timetable>tbody").append("<tr><td>" + train + "<tr><td>" + destination + "<tr><td>" + nextTrain + "<tr><td>" + frequency + "<tr><td>" + nextTrainTime + "<tr><td>");
})