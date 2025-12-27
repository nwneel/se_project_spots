const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__close-btn",
  errorClass: "modal__error",
};

const showInputError = (formEl, inputEl, errorMsg) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = errorMsg;
  inputEl.classList.add("modal__error");
};

const hideInputError = (formEl, inputEl) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = "";
  inputEl.classList.remove("modal__error");
};

const checkInputValidity = (formEl, inputEl, settings) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, settings);
  } else {
    hideInputError(formEl, inputEl, settings);
  }
};
//Helps make sure error message appears when error happens. Make sure in const hasInvalidInput that there is a value within the parentheses
const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonEl, settings) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonEl, settings);
  } else {
    buttonEl.disabled = false;
    //Removes the disabled class
    buttonEl.classList.remove(".modal__close-btn");
  }
};

const disableButton = (buttonEl, config) => {
  buttonEl.disabled = true;
  //To do: Add a modifier class to the buttonEl to make it grey
  //Don't forget the CSS
};

//TODO - Use the setting objects in all functions instead of hard coded strings

//
const resetValidation = (formEl, inputList, settings) => {
  console.log("resetting validation");
  inputList.forEach((input) => {
    hideInputError(formEl, input);
  });
};

const setEventListenters = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector)); //
  const buttonElement = formEl.querySelector(config.submitButtonSelector); //

  toggleButtonState(inputList, buttonElement); //

  inputList.forEach((inputElement) => {
    //
    inputElement.addEventListener("input", () => {
      checkInputValidity(formEl, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings); //
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formEl) => {
    setEventListenters(formEl, config);
  });
};

enableValidation(settings);
