// Makes sure the code doesn't run until after the whole webpage is loaded
$(document).ready(function () {
  // Interval set to 1 second
  setInterval(clockTick, 1000)
  $(".saveBtn").on("click", function() {
    // Retrieves the value from a sibling element with the class .description
    var value = $(this).siblings(".description").val();
    // Retrieves the id attribute of the parent element.
    var time = $(this).parent().attr("id");
    // Stores these values in localStorage, using the id as the key and the retrieved value as the data.
    localStorage.setItem(time, value);
    // Shows an alert 
    $(".alert").addClass("show");

    setTimeout(function () {

      $(".alert").removeClass("show");

    }, 5000)
  })

  setInterval(hourChecker, 10000)
  // updates UI elements based on the time of day
  function hourChecker() {

    var currentHour = dayjs().format("HH");
  
    $(".time-block").each(function () {
      var blockHour = $(this).attr("id").split("-")[1];
      if (currentHour > blockHour) {
        $(this).addClass("past");
        $(this).removeClass("present")
        $(this).removeClass("future")
      } else if (currentHour == blockHour) {
        $(this).addClass("present");
        $(this).removeClass("future");
        $(this).removeClass("past");
      } else {
        $(this).addClass("future");
        $(this).removeClass("past");
        $(this).removeClass("present");
      }
    })
  }

  $(".time-block").each(function () {
    $(this).children(".description").val(localStorage.getItem($(this).attr("id")))
  })
  
  hourChecker();


dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

function clockTick() {
  $("#currentDay").text(dayjs().tz("America/New_York").format("dddd, MMMM D YYYY, h:mm A"));
}


});
