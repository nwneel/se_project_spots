const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostImageInput = newPostModal.querySelector("#card-image-input");
const newPostCaptionInput = newPostModal.querySelector(
  "#profile-caption-input"
);
const newPostSubmitBtn = document.querySelector("#new-post-submit");

// newPostSubmitBtn.addEventListener("click", function () {
//   console.log(newPostImageInput.value);
//   console.log(newPostCaptionInput.value);
// });

// instead of setting up a click event listener on the submit button, it's
//better practice to set up a submit event listener on the form (that contains that submit button)
function handleNewPostSubmit(evt) {
  evt.preventDefault();
  console.log(newPostImageInput.value);
  console.log(newPostCaptionInput.value);
  closeModal(newPostModal);
}

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  editProfileModal.classList.add("modal_is-opened");
});

editProfileCloseBtn.addEventListener("click", function () {
  openModal(editProfileModal);
});

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

const postImageEl = document.querySelector(".card__image");
const postCaptionEl = document.querySelector(".modal__input");

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;
  newPostModal.classList.remove("modal_is-opened");
}

function handleNewPostSubmit(evt) {
  evt.preventDefault();
  console.log(newPostImageInput.value);
  console.log(newPostCaptionInput.value);
  closeModal(newPostModal);
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);
newPostForm.addEventListener("submit", handleNewPostSubmit);
