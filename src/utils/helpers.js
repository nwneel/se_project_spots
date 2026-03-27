export function setButtonText(
  button,
  isLoading,
  defaultText = "Save",
  loadingText = "Saving...",
) {
  if (isLoading) {
    // Sets the loading text
    button.textContent = loadingText;
    button.disabled = true;
  } else {
    // Sets the not loading text
    button.textContent = defaultText;
    button.disabled = false;
  }
}
