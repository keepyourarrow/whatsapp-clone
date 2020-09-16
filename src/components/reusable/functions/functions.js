import moment from "moment";

export function checkRemainingSpace(fieldType, text) {
  if (fieldType === "input") {
    return 25 - text.length;
  } else {
    return 120 - text.length;
  }
}
export function checkPastedText(fieldType, e) {
  let existingText = e.target.value;
  let pastedText = e.clipboardData.getData("text");
  let selectedText = window.getSelection().toString();
  if (fieldType === "input") {
    if (
      selectedText.length > 0 &&
      selectedText.length - pastedText.length <= 25
    ) {
      return false;
    }
    console.log(selectedText.length - pastedText.length <= 25);
    return existingText.length + pastedText.length >= 25 ? true : false;
  } else {
    if (
      selectedText.length > 0 &&
      selectedText.length - pastedText.length <= 120
    ) {
      return false;
    }

    return existingText.length + pastedText.length >= 120 ? true : false;
  }
}

/*
      The point of this function is to remove overflow-hidden so we tooltip can overflow from its container.
      In general we need overflow for FRAME MOTION ANIMATION
      */
export function handleOverflowFromSidebarContainer(type) {
  let sidebarContainer = document.querySelector("#sidebar-container");
  // switch (type) {
  //   case "removeOverflow":
  //     sidebarContainer.style.overflow = "visible";
  //     break;
  //   case "addOverflow":
  //     sidebarContainer.style.overflow = "hidden";
  //     break;
  //   default:
  //     return;
  // }
}
/*
    The point of this function is to cancel out annoying FRAME MOTION transform effect
    for the emotes to take up the needed space instead of being partly hidden
    */
export function handleMotionViewTransformStyle(type) {
  let motionView = document.querySelector("#motion-view");
  let roomInfoMotionView = document.querySelector("#room-info-motion-view");

  switch (type) {
    case "removeTransform":
      motionView.style.cssText = "transform: none;";
      break;
    case "removeRoomInfoTransform":
      if (roomInfoMotionView) {
        roomInfoMotionView.style.cssText = "transform: none;";
      }
      break;
    case "addTransform":
      motionView.style.cssText = "transform: translateX(0%) translateZ(0px);";
      break;
    default:
      return;
  }
}

export function dateToFromNowDaily(myDate) {
  // get from-now for this date
  var fromNow = moment(myDate).fromNow();

  // ensure the date is displayed with today and yesterday
  return moment(myDate).calendar(null, {
    // when the date is closer, specify custom values
    lastWeek: "DD/MM/YYYY",
    lastDay: "[Yesterday]",
    sameDay: "[Today]",
    nextDay: "[Tomorrow]",
    nextWeek: "dddd",
    // when the date is further away, use from-now functionality
    sameElse: function () {
      return "[" + fromNow + "]";
    },
  });
}
