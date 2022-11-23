export const checkRemainingSpace = (fieldType, text) => {
  if (fieldType === "input") {
    return 25 - text.length;
  } else {
    return 120 - text.length;
  }
}

export const checkPastedText = (fieldType, e) => {
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