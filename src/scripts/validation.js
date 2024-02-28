//validation.js
//когда условие в операторе if истина

//validation.js

function isNameValid(name) {
  return /[A-Za-zА-Яа-яЁё\s-]*$/.test(name);
}

function isDescriptionValid(description) {
  return /[A-Za-zА-Яа-яЁё\s-]*$/.test(description);
}

function setCustomValidity(onInput) {
  if (onInput.validity.valueMissing) { //проверяем, имеет ли элемент управления required
    onInput.setCustomValidity("Вы пропустили это поле.");
  } else if (
    (onInput.name === "name" || onInput.name === "place-name") &&
    !isNameValid(onInput.value)
  ) {
    onInput.setCustomValidity(
      "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы."
    );
  } else if (
    (onInput.name === "description" ||
    onInput.name === "place-name") &&
    !isDescriptionValid(onInput.value)
  ) {
    onInput.setCustomValidity(
      "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы."
    );
  } else if (
    onInput.name === "place-name" &&
    onInput.validity.tooShort //проверяем длину значения, которую ввел пользователь, если она меньше минимально допустимого значения, 
    //заданного в атрибуте minlength
  ) {
    onInput.setCustomValidity("Минимальная длина - 2 символа.");
  } else if (
    onInput.name === "link" &&
    onInput.validity.patternMismatch // проверяем соответствует ли значение правилу, которое указано в pattern
  ) {
    onInput.setCustomValidity("Введите адрес сайта.");
  } else {
    onInput.setCustomValidity("");
  }
}

function checkInputValidity(onInput, settings) {
  setCustomValidity(onInput);
  if (!onInput.validity.valid) {
    checkError(onInput, onInput.validationMessage, settings);
  } else {
    hideInputError(onInput, settings);
  }
}

function checkError(onInput, errorMessage, settings) {
  const errorElement = onInput.nextElementSibling;
  onInput.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
}

function hideInputError(onInput, settings) {
  const errorElement = onInput.nextElementSibling;
  onInput.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = "";
}

function toggleButtonState(inputs, buttonElement, settings) {
  const isFormValid = inputs.every((input) => input.validity.valid);
  buttonElement.disabled = !isFormValid;
  buttonElement.classList.toggle(settings.inactiveButtonClass, !isFormValid);
}

export function clearValidation(formElement, settings) {
  const inputs = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  inputs.forEach((onInput) => {
    hideInputError(onInput, settings);
  });

  const submitButton = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputs, submitButton, settings);
}

export function enableValidation(settings) {
  const forms = document.querySelectorAll(settings.formSelector);
  forms.forEach((form) => {
  const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
    inputs.forEach((onInput) => {
      onInput.addEventListener("input", () => {
        checkInputValidity(onInput, settings);
        toggleButtonState(
          inputs,
          form.querySelector(settings.submitButtonSelector),
          settings
        );
      });

      onInput.addEventListener("focus", () => {
        hideInputError(onInput, settings);
      });

      onInput.addEventListener("blur", () => {
        checkInputValidity(onInput, settings);
      });
    });

    toggleButtonState(
      inputs,
      form.querySelector(settings.submitButtonSelector),
      settings
      );
    }); 
  } 
  
   