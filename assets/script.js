// checking localStorage for events and adding them to timeSlots
$(document).ready(function() {
  if(localStorage.getItem("events") !== null) {
    dailyEventsArr = JSON.parse(localStorage.getItem("events"));
    dailyEventsArr.forEach(function(event) {
      $("#" + event.id).html(event.event) 
    })
  }
})

// using Moment.js to display the current date at top
$("#currentDay").text(moment().format("dddd, MMMM Do YYYY"));

// generates array of timeSlots between a set start & end time
const $startTime = moment().utc().set({ hour: 9, minute: 00 });
const $endTime = moment().utc().set({ hour: 17, minute: 00 });
const $timeSlots = [];

// while loop to generate timeSlots between 9am-5pm
while ($startTime <= $endTime) {
  $timeSlots.push(new moment($startTime));
  $startTime.add(1, "hour");
}

// grabs the current time, used to compare against timestamps in timeSlots array
const $currentHour = moment();

// loops through timeSlots array and creates required elements for each
$.each($timeSlots, function(index, hour) {
  // creating planner elements using Bootstrap grid
  const $hourlyRow = $("<div>").addClass("row");
  const $timeColumn = $("<div>").addClass("col-1 timeColumn");
  const $eventInput = $("<textarea>")
    .attr("type", "text")
    .addClass("col-9 eventColumn eventInput textarea")
    .attr("id", "hour" + hour.hour());
  const $saveBtn = $("<div>").addClass("col-1 saveBtn");
  const $saveIcon = $("<i>").addClass("far fa-save saveIcon");

  // comparing current time against calendar and adjusting timeSlot colors accordingly
  if($currentHour.hour() > hour.hour()) {
    $eventInput.addClass("past");
    $saveBtn.addClass("past")
    // $eventInput.prop("disabled", true)
  }

  if($currentHour.hour() === hour.hour()) {
    $eventInput.addClass("present");
  }

  if($currentHour.hour() < hour.hour()) {
    $eventInput.addClass("future");
  }

  // adding planner elements to container
  $(".container").append($hourlyRow);
  $timeColumn.text(hour.format("h A"));
  $hourlyRow.append($timeColumn);
  $hourlyRow.append($eventInput);
  $hourlyRow.append($saveBtn);
  $saveBtn.append($saveIcon);
});

// event listener for saveBtn to add input to localStorage
$(".saveBtn").click(function() {
  let dailyEventsArr = JSON.parse(localStorage.getItem("events")) || [];
  dailyEventsArr.push({
    event: $(this).prev().val(),
    id: $(this).prev().attr('id'),
  });
  localStorage.setItem("events", JSON.stringify(dailyEventsArr))
});
