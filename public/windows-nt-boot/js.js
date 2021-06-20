let RUN_CLOCK = true;
let TIME = 30;

function bootOS() {
  function clearScreen() {
    function bootScreen() {
      function bootMsg() {
        $("body").append(
          "<p>Facebook (R) Instagram OS (TM) Version 3.11 (Build 8431 Service Pack 9).</p><p>1 System Processor [128 MB Memory]</p>"
        );
      }
      $("body, html").css("background-color", "#0100A9");
      $("body").css("color", "#AAA");
      setTimeout(bootMsg, 3000);
    }
    $("body").html("");
    setTimeout(bootScreen, 3000);
  }
  setTimeout(clearScreen, 3000);
}

function setClock() {
  if (TIME == 0) {
    selectBoot();
    return;
  }
  TIME--;
  $("#clock").html(TIME);
}

function navigateBoot(direction) {
  curr = $("li.active");
  if (direction == "up") {
    if (curr.is(":first-child")) {
      return;
    }
    curr.prev().addClass("active");
    curr.removeClass("active");
  }
  if (direction == "down") {
    if (curr.is(":last-child")) {
      return;
    }
    curr.next().addClass("active");
    curr.removeClass("active");
  }
}

function selectBoot() {
  clearInterval(clock);
  $("#hardwareCheckMsg").show();
  setTimeout(bootOS, 3000);
}

let clock = setInterval(setClock, 1000);
document.onkeydown = function (e) {
  switch (e.which) {
    case 38: // up
      navigateBoot("up");
      break;
    case 40: // down
      navigateBoot("down");
      break;
    case 13:
      selectBoot();
    default:
      return;
  }
  e.preventDefault();
};
