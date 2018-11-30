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

var database = firebase.database();
var ref = database.ref



// Create Button to add train info
$("#submitBtn").on("click", function(e) {
  e.preventDefault();
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
  $("#trainAdd").val("");
  $("#destinationAdd").val("");
  $("#timeAdd").val("");
  $("#frequencyAdd").val("");

  return false;
})

// HAVE SNAPSHOTS OF SUBMITTED DATA BE PUSHED TO FIREBASE 
database.ref().on("child_added", function (dataSnapshot){
  var train = dataSnapshot.val().nameEntry;
  var destination = dataSnapshot.val().destinationEntry;
  var firstTrainTime = dataSnapshot.val().timeEntry;
  var frequencyData = dataSnapshot.val().frequencyEntry;

  var tFrequency = frequencyData;
    // Time is 3:30 AM
    var firstTime = firstTrainTime;
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);
    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm")
  $("#timetable>tbody").append("<tr><td>" + train + "</td><td>" + destination + "</td><td>" + tFrequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td><tr>");
})