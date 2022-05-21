import './index.css';
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import { initialCards } from "../utils/InitialCards.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithDelete from '../components/PopupWithDelete.js';
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  editButton,
  profileForm,
  postCreationForm,
  avatarForm,
  nameInput,
  jobInput,
  avatarEditButton,
  addButton,
  cardsContainer,
  profileSelectors,
  validationConfig
} from "../utils/constants.js";

/// Валидация форм
const formValidProfile = new FormValidator(validationConfig, profileForm)
const formValidCard = new FormValidator(validationConfig, postCreationForm)
const formValidAvatar = new FormValidator(validationConfig, avatarForm)
// Запуск валидации для каждой из форм
formValidProfile.enableValidation();
formValidCard.enableValidation();
formValidAvatar.enableValidation();

// Подключаем API

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-37',
  headers: {
    'content-type': 'application/json',
    'authorization': '2e5af95a-25b4-4742-9ead-1326c8073602'
  }
})

// Данные с сервера

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then((res) => {
    userInfo.setUserInfo(res[0]);
    cards.renderItems(res[1]);
  })
  .catch((err) => console.log(err));

// Получаем данные пользователя с сервера

const userInfo = new UserInfo(profileSelectors);

// Разметка начальных карточек

const cards = new Section({
  renderer: (item) => {
    const newCard = createCard(item);
    cards.addItem(newCard);
  }
},
  cardsContainer
);

//Попап профиль

const profilePopup = new PopupWithForm('.popup_profile', {
  submitHandler: (values) => {
    profilePopup.toggleButtonText("Coxpaнение...");
    api.editProfile(values.name, values.about)
      .then((data) => {
        userInfo.setUserInfo(data);
        profilePopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        profilePopup.toggleButtonText("Сохранить")
      })
  }
});

editButton.addEventListener("click", function () {
  profilePopup.open();

  const userDescription = userInfo.getUserInfo();

  nameInput.value = userDescription.name;
  jobInput.value = userDescription.about;

  formValidProfile.resetValidation();

});

// Редактирование аватара

const avatarPopup = new PopupWithForm(".popup_avatar", {
  submitHandler: (values) => {
    avatarPopup.toggleButtonText("Сохранение...");
    api.editAvatar(values.avatar)
      .then((data) => {
        userInfo.setUserInfo(data);
        avatarPopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        avatarPopup.toggleButtonText("Сохранить");
      })
  }
});

avatarEditButton.addEventListener('click', () => {
  avatarPopup.open();

  formValidAvatar.resetValidation();
});


// Картинка-попап

const picturePopup = new PopupWithImage(".popup_photo");

// Добавление поста

const addPopup = new PopupWithForm(".popup_card", {
  submitHandler: (values) => {
    addPopup.toggleButtonText('Создание...');
    api.postNewCard(values.name, values.link)
      .then((data) => {
        const newCard = createCard(data);
        cards.prependItem(newCard);
        addPopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        addPopup.toggleButtonText('Создать');
      })
  }
});

addButton.addEventListener("click", () => {
  addPopup.open();
  formValidCard.resetValidation();
});

// Попап подтверждения удаления

const deletePopup = new PopupWithDelete('.popup_delete_card', {
  handleSubmit: deleteCardHandler
});

const deleteCardHandler = () => {
  console.log('deleteCardHandler');
}

// Генерация карточек

function createCard(values) {
  const card = new Card({
    data: values,
    handleCardClick: (name, link) => {
      picturePopup.open(name, link)
    },
    handleCardDelete: (cardId, card) => {
      deletePopup.open();
      deletePopup.setSubmitAction(() => {
        deletePopup.toggleButtonText('Удаление...');
        api.deleteCard(cardId)
          .then(() => {
            card.remove();
            deletePopup.close();
          })
          .catch((err) => console.log(err))
          .finally(() => {
            deletePopup.toggleButtonText('Да');
          })
      })
    },
    handleLike: (cardId) => {
      if (card.checkIfLiked()) {
        api.removeLike(cardId)
          .then(card.updateLikes)
          .catch((err) => console.log(err))
      }
      else {
        api.likeCard(cardId)
          .then(card.updateLikes)
          .catch((err) => console.log(err))
      }
    },
    userId: userInfo.getUserId()
  },
    '.elem-template')
  return card.generateCard();
};

