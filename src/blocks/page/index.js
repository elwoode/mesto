import './index.css';
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import { initialCards } from "../utils/InitialCards.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  editButton,
  profileForm,
  postCreationForm,
  nameInput,
  jobInput,
  addButton,
  cardsContainer,
  profileSelectors,
  validationConfig
} from "../utils/constants.js";
// Валидация форм
const formValidProfile = new FormValidator(validationConfig, profileForm)
const formValidCard = new FormValidator(validationConfig, postCreationForm)
// Запуск валидации для каждой из форм
formValidProfile.enableValidation();
formValidCard.enableValidation();

//Попап профиль
const userInfo = new UserInfo(profileSelectors);
editButton.addEventListener("click", function () {
  profilePopup.open();
  const userDescription = userInfo.getUserInfo();
  nameInput.value = userDescription.name;
  jobInput.value = userDescription.job;
  formValidProfile.resetValidation()
});

const profilePopup = new PopupWithForm('.popup_profile', {
  submitHandler: (data) => {
    userInfo.setUserInfo(data);
    profilePopup.close();
  }
})

// Картинка-попап

const picturePopup = new PopupWithImage(".popup_photo");

// Добавление поста

addButton.addEventListener("click", () => {
  addPopup.open();
  formValidCard.resetValidation()
});

const addPopup = new PopupWithForm(".popup_card", {
  submitHandler: (data) => {
    const newData = {
      place: data.namecard,
      link: data.link,
    }

    const newCard = createCard(newData, '.elem-template');
    defaultCardsList.prependItem(newCard);

    addPopup.close();
  }
});

function createCard(data, cardSelector) {
  const card = new Card(data, cardSelector, {
    handleCardClick: (place, link) => {
      picturePopup.open(place, link)
    }
  })
  return card.generateCard();
};

// Разметка начальных карточек

const defaultCardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const newCard = createCard(item, '.elem-template');
    defaultCardsList.addItem(newCard);
  }
},
  cardsContainer
);

defaultCardsList.renderItems();