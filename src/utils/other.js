export const handleMotionViewTransformStyle = (type) => {
  let motionView = document.querySelector("#motion-view");
  let roomInfoMotionView = document.querySelector("#room-info-motion-view");

  switch (type) {
    case "removeTransform":
      if (motionView) {
        motionView.style.cssText = "transform: none;";
      }
      break;
    case "removeRoomInfoTransform":
      if (roomInfoMotionView) {
        roomInfoMotionView.style.cssText = "transform: none;";
      }
      break;
    case "addTransform":
      if (motionView) {
        motionView.style.cssText = "transform: translateX(0%) translateZ(0px);";
      }
      break;
    default:
      return;
  }
}

export const focusElement = (element) => {
  setTimeout(() => {
    element.focus();
  }, 0)
}