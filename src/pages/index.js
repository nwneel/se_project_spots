import "./index.css";

import {
  enableValidation,
  settings,
  resetValidation,
} from "../scripts/validation.js";
import { setButtonText } from "../utils/helpers.js";

import Api from "../utils/Api.js";

const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "e2ecda29-0c34-4591-9c14-4974f13b0755",
    "Content-Type": "application/json",
  },
});

//Profile elements
const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const avatarImage = document.querySelector(".profile__avatar");
const avatarModalBtn = document.querySelector(".profile__avatar-btn");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input",
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input",
);
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");
//New post elements
const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostImageInput = newPostModal.querySelector("#card-image-input");
const newPostCaptionInput = newPostModal.querySelector(
  "#profile-caption-input",
);
const newPostSubmitBtn = document.querySelector("#new-post-submit");
//
const newPostImageEl = document.querySelector("#card-image-input");
const newPostCaptionEl = document.querySelector("#profile-caption-input");

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");
const previewImageEl = previewModal.querySelector(".modal__image");
const previewModalCaptionInput = previewModal.querySelector(".modal__caption");

//Avatar form elements
const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarSubmitBtn = avatarModal.querySelector(".modal__submit-btn");
const avatarModalCloseBtn = avatarModal.querySelector(
  ".modal__edit_avatar_close_button",
);
const avatarInput = avatarModal.querySelector("#profile-avatar-input");

//Delete form elements
const deleteModal = document.querySelector("#delete-modal");
const deleteFormCloseBtn = deleteModal.querySelector(
  ".modal__avatar_close_button",
);
const deleteForm = deleteModal.querySelector(".modal__form");
const deleteFormCancelBtn = deleteModal.querySelector(
  ".modal__button_type_cancel",
);

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

let selectedCard, selectedCardId;

function getCardElement(data) {
  //This creates a copy of the card template (which was defined on line 66-68). clone node(true)  makes a "deep clone" - meaning it copies the element AND all its children
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  //This finds the title element inside the cloned card.
  const cardTitleEl = cardElement.querySelector(".card__title");
  //This finds the image element inside the cloned card
  const cardImageEL = cardElement.querySelector(".card__image");

  //Set the active class on the card
  cardImageEL.src = data.link;
  cardImageEL.alt = data.name;
  cardTitleEl.textContent = data.name;

  const cardLikeBtnEL = cardElement.querySelector(".card__like-btn");
  //Keeps the like button red when you click on it after refreshing the page
  if (data.isLiked) {
    cardLikeBtnEL.classList.add("card__like-btn_active");
  }

  cardLikeBtnEL.addEventListener("click", (evt) => {
    const isLiked = evt.target.classList.contains("card__like-btn_active");

    api
      .changeLikeStatus(data._id, isLiked)
      .then(() => {
        cardLikeBtnEL.classList.toggle("card__like-btn_active");
      })
      .catch(console.error);
  });

  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-btn");
  cardDeleteBtnEl.addEventListener("click", () => {
    handleDeleteCard(cardElement, data._id);
  });
  //Lines 90-96, you have an event listener on each card image that opens the preview modal
  cardImageEL.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    //*Used to make image appear with caption below
    previewModalCaptionInput.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

function handleOverlayClick(evt) {
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscapeKey);
  modal.addEventListener("mousedown", handleOverlayClick);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscapeKey);
  modal.removeEventListener("mousedown", handleOverlayClick);
}

const postImageEl = document.querySelector(".card__image");
const postCaptionEl = document.querySelector(".modal__input");

//adds event listener to make sure a modal opens and closes. To open up an image by clicking it only use a close modal
//resetValidation helps error message appear when there is an error
newPostBtn.addEventListener("click", function () {
  newPostImageInput.value = newPostImageEl.textContent;
  newPostCaptionInput.value = newPostCaptionEl.textContent;
  resetValidation(newPostForm, [newPostImageInput, newPostCaptionInput]);
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

avatarModalBtn.addEventListener("click", function () {
  openModal(avatarModal);
});

//Cancel button for delete modal
deleteFormCancelBtn.addEventListener("click", function () {
  closeModal(deleteModal);
});

//Opens Avatar form
avatarForm.addEventListener("submit", handleAvatarSubmit);

editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  resetValidation(editProfileForm, [
    editProfileNameInput,
    editProfileDescriptionInput,
  ]);
  openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

previewModalCloseBtn.addEventListener("click", function () {
  closeModal(previewModal);
});

avatarModalCloseBtn.addEventListener("click", function () {
  closeModal(avatarModal);
});
//exits delete form when clicking on exit
deleteFormCloseBtn.addEventListener("click", function () {
  closeModal(deleteModal);
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  //Changes text content to "Saving..."
  const submitBtn = evt.submitter;
  // submitBtn.textContent = "Saving...";
  setButtonText(submitBtn, true, "Save", "Saving...");

  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then((data) => {
      //Uses data argument instead of the input values
      profileNameEl.textContent = data.name;
      profileDescriptionEl.textContent = data.about;
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      //Changes text content back to "save"
      setButtonText(submitBtn, false);
    });
}

//Avatar submission handler
function handleAvatarSubmit(evt) {
  //Prevents behavior
  evt.preventDefault();
  const submitBtn = evt.submitter;

  setButtonText(submitBtn, true, "Save", "Saving...");
  api
    .editAvatarInfo({ avatar: avatarInput.value })
    .then((data) => {
      //passes alt and src to avatar image
      avatarImage.src = data.avatar;
      avatarImage.alt = data.name;
      //close modal, reset form
      closeModal(avatarModal);
      avatarForm.reset();
    })
    .catch(console.error)
    .finally(() => {
      //Changes text content back to "save"
      setButtonText(submitBtn, false);
    });
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  api
    .deleteCard(selectedCardId)
    .then(() => {
      //Removes the card from the DOM
      selectedCard.remove();
      //Closes the modal
      closeModal(deleteModal);
    })
    .catch(console.error);
}

function handleDeleteCard(cardElement, data) {
  selectedCard = cardElement;
  selectedCardId = data;
  openModal(deleteModal);
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

avatarSubmitBtn.addEventListener("submit", handleAvatarSubmit);
//Allow deleting to show up when you click delete
//This what adds the functionality to delete the card
deleteForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const deleteBtn = evt.submitter;

  setButtonText(deleteBtn, true, "Delete", "Deleting...");
  api
    .deleteCard(selectedCardId)
    .then((data) => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      //Changes text content back to delete
      setButtonText(deleteBtn, false, "Delete", "Deleting...");
    });
});
//Allows saving to show up when you click save
newPostForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;

  setButtonText(submitBtn, true, "Save", "Saving...");
  api
    .addCardInfo({
      name: newPostCaptionInput.value,
      link: newPostImageInput.value,
    })
    .then((data) => {
      //Uses data argument instead of the input values
      const cardElement = getCardElement(data);
      cardsList.prepend(cardElement);
      newPostForm.reset();
      closeModal(newPostModal);
    })
    .catch(console.error)
    .finally(() => {
      //Changes text content back to "save"
      setButtonText(submitBtn, false);
    });
});

// Destructures the second item in the callback of the .then()
api
  .getAppInfo()
  .then(([cards, userData]) => {
    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });
    console.log(cards, userData);
    // - set the src of the avatar image
    avatarImage.src = userData.avatar;
    avatarImage.alt = userData.name;
    // - set the textContent of both the text elements
    profileNameEl.textContent = userData.name;
    profileDescriptionEl.textContent = userData.about;
  })
  .catch(console.error);
