// Stores text values of each hour to be used when creating the divs on the schedule
var hours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"]
// Stores id of div which will contain the schedule
var schedule = $('#schedulediv')


// Creates an array that will contain the id's of the dynamically created text areas and save buttons
function makeSchedule() {
  var saveBtnIds = [];
  var hourTextIds = [];

  for (var i = 0; i < hours.length; i++) {
    //Dynamically creates the HTML elements that make up the schedule and adds CSS classes and ids
    var scheduleDiv = $('<div>').addClass('row time-block');
    var hourDiv = $('<div>').addClass('col-2 col-md-1 hour text-center py-3').text(hours[i]);
    var hourText = $('<textarea>').attr({ id: 'hourText' + (i + 9), rows: 3 }).addClass('col-8 col-md-10 description');
    var saveBtn = $('<button>').attr({ id: 'saveBtn' + (i + 9), 'aria-label': 'save' }).addClass('btn saveBtn col-2 col-md-1')
    var saveIcon = $('<i>').attr('aria-hidden', 'true').addClass('fas fa-save')
    console.log(saveBtn);

    //Fills the previous created arrays with strings which display the id for each text area and save button
    var saveBtnId = '#' + 'saveBtn' + (i + 9);
    saveBtnIds.push(saveBtnId);
    var hourTextId = '#' + 'hourText' + (i + 9);
    hourTextIds.push(hourTextId);

    //Links to dayjs and displays date in the header.
    var today = dayjs();
    var todayHour = today.hour();
    console.log(today);
    console.log(todayHour);
    $('#currentDay').text(today.format('dddd, MMM D, YYYY'));

    //Changes class of each hour div based on time of day
    if ((i + 9) === todayHour) {
      console.log("It's the present")
      $(hourText).addClass('present')
    }
    else if ((i + 9) < todayHour) {
      console.log("It's the past")
      $(hourText).addClass('past')
    }
    else {
      console.log("It's the future")
      $(hourText).addClass('future')
    }
    console.log(hourText)

    // Appends all the elements to the HTML
    scheduleDiv.append(hourDiv, hourText, saveBtn);
    saveBtn.append(saveIcon)
    schedule.append(scheduleDiv);
  }

  console.log(saveBtnIds);
  console.log(hourTextIds);

  // Saves text to local storage from each hour when corresponding save button is clicked.
  for (var i = 0; i < saveBtnIds.length; i++) {
    (function (saveText) {
      $(saveBtnIds[saveText]).on('click', function () {
        var textEntry = $(hourTextIds[saveText]).val();
        console.log('click');
        localStorage.setItem(hourTextIds[saveText], textEntry);
        console.log(localStorage);
      });
    })(i);
  }

  // Displays text that was saved in local storage when page is refreshed.
  $(document).ready(function () {
    for (var i = 0; i < hourTextIds.length; i++) {
      console.log("ready!");
      var refreshText = localStorage.getItem(hourTextIds[i]);
      $(hourTextIds[i]).val(refreshText);
    }
  });
}

makeSchedule();