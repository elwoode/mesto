export default class Card {
  constructor({ data, handleCardClick, handleLike, handleCardDelete, userId }, cardSelector) {
    this._link = data.link;
    this._place = data.name;
    this._likes = data.likes;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLike = handleLike;
    this._handleCardDelete = handleCardDelete;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elem')
      .cloneNode(true);

    return cardElement;
  }

  //Генерация карточки



  // Отдельные функции

  checkIfLiked() {
    if (this._likeButton.classList.contains('elem__like-button_active'))
      return true
    else
      return false
  }

  updateLikes(card) {
    this._likeCounter.textContent = card.likes.length;
    this.toggleLikeButton();
  }

  toggleLikeButton() {
    this._likeButton.classList.toggle('elem__like-button_active');
  }

  _checkLikesNumber() {
    this._likeCounter.textContent = this._likes.length;
  }

  checkIfLikedByUser() {
    return this._likes.some(like => {
      return like._id === this._userId;
    });
  }

  _showLikes() {
    if (this.checkIfLikedByUser(this._userId)) {
      this._likeButton.classList.add('elem__like-button_active');
    } else {
      this._likeButton.classList.remove('elem__like-button_active');
    }
  }

  // Вешаем ивенты

  _setEventListeners() {

    this.updateLikes = this.updateLikes.bind(this);
    this._likeButton.addEventListener('click', () => {
      this._handleLike(this._cardId)
    });

    if (this._ownerId !== this._userId) {
      this._deleteButton.remove();
    } else {
      this._deleteButton.addEventListener('click', () => {
        this._handleCardDelete(this._cardId, this._element);
      })
    };

    this._elementPicture.addEventListener("click", () => {
      this._handleCardClick(this._place, this._link);
    })
  };
  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.elem__like-button');
    this._elementPicture = this._element.querySelector('.elem__image');
    this._deleteButton = this._element.querySelector('.elem__del-button');

    this._likeCounter = this._element.querySelector(".elem__like-counter");
    this._checkLikesNumber();
    this._showLikes();

    this._element.querySelector('.elem__text').textContent = this._place;
    this._elementPicture.src = this._link;
    this._elementPicture.alt = this._place;

    this._setEventListeners();

    return this._element;
  }
}
