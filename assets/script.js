// Using moment.js to display the current date at top
$("#currentDay").text(moment().format("dddd, MMMM Do YYYY"));

// Array of hourly timeslots
const $dailyHours = [
  "9 am",
  "10 am",
  "11 am",
  "12 pm",
  "1 pm",
  "2 pm",
  "3 pm",
  "4 pm",
  "5 pm",
];

$.each($dailyHours, function (index, hour) {
// Buiding planner elements using Bootstrap grid
  let $hourlyRow = $("<div>").addClass("row");
  let $timeColumn = $("<div>").addClass("col-1 timeColumn");
  let $eventColumn = $("<div>").addClass("col-9 eventColumn");
  let $saveColumn = $("<div>").addClass("col-2 saveColumn");
  $(".container").append($hourlyRow);
  $timeColumn.text(hour);
  $hourlyRow.append($timeColumn);
  $eventColumn.text('This is an event');
  $hourlyRow.append($eventColumn)
  $saveColumn.text('saveIcon');
  $hourlyRow.append($saveColumn)
});
