// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class Flashcard {
  constructor(containerElement, frontText, backText, nextCard) {
    this.containerElement = containerElement;
    this.nextCard = nextCard;
    //if(frontText === undefined || frontText === null)return;

    this._flipCard = this._flipCard.bind(this);
    this._dragMove = this._dragMove.bind(this);
    this._dragStart = this._dragStart.bind(this);

    this.flashcardElement = this._createFlashcardDOM(frontText, backText);
    this.containerElement.append(this.flashcardElement);

    this.originX = null;
    this.originY = null;
    this.offsetX = 0;
    this.offsetY = 0;
    this.dragStarted = false;
    this.key = frontText;
    this.val = backText;


    this.flashcardElement.addEventListener('pointerup', this._flipCard);
    this.flashcardElement.addEventListener('pointerdown', this._dragStart);
    this.flashcardElement.addEventListener('pointermove', this._dragMove);
  }

  // Creates the DOM object representing a flashcard with the given
  // |frontText| and |backText| strings to display on the front and
  // back of the card. Returns a reference to root of this DOM
  // snippet. Does not attach this to the page.
  //
  // More specifically, this creates the following HTML snippet in JS
  // as a DOM object:
  // <div class="flashcard-box show-word">
  //   <div class="flashcard word">frontText</div>
  //   <div class="flashcard definition">backText</div>
  // </div>
  // and returns a reference to the root of that snippet, i.e. the
  // <div class="flashcard-box">
  _createFlashcardDOM(frontText, backText) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('flashcard-box');
    cardContainer.classList.add('show-word');

    const wordSide = document.createElement('div');
    wordSide.classList.add('flashcard');
    wordSide.classList.add('word'); 
    wordSide.textContent = frontText;

    const definitionSide = document.createElement('div');
    definitionSide.classList.add('flashcard');
    definitionSide.classList.add('definition');
    definitionSide.textContent= backText;

    cardContainer.appendChild(wordSide);
    cardContainer.appendChild(definitionSide);
    return cardContainer;
  }

  _flipCard(event) {
    if(event.clientX === this.originX && event.clientY === this.originY)
      this.flashcardElement.classList.toggle('show-word');
    
    this.dragStarted = false;
    this.offsetX = event.clientX - this.originX;
    this.offsetY = event.clientY - this.originY;

    if(this.offsetX >= 150 || this.offsetX <= -150)
    {
      const eventInfo = {
        correct: (this.offsetX < 0) ? -1 : 1,
        key: this.key,
        val: this.val,
        decide: 1
      };
      document.dispatchEvent(new CustomEvent('card-ans', { detail: eventInfo}));
      this.containerElement.removeChild(this.containerElement.firstChild);
      this.nextCard();
      return;
    }
    event.currentTarget.style.transform = 'translate( 0px, 0px)';
    event.currentTarget.style.transitionDuration = '0.6s';
  }

  _dragMove(event) {
    if(!this.dragStarted) {
      return;
    }
    event.preventDefault();
    const deltaX = event.clientX - this.originX;
    const deltaY = event.clientY - this.originY;
    const translateX = this.offsetX + deltaX;
    const translateY = this.offsetY + deltaY;
    const rotation = 0.2 * translateX; 
    event.currentTarget.style.transform = 'translate(' + 
    translateX + 'px, ' + translateY + 'px)' + 'rotate('
    + rotation + 'deg)' ;
    event.currentTarget.style.transitionDuration = '0s';

    if(translateX >= 150 || translateX <= -150)
    {
      const eventInfo = {
        correct: (translateX < 0) ? -1 : 1,
        key: this.key,
        val: this.val,
        decide: 0
      };
      document.dispatchEvent(new CustomEvent('card-ans', { detail: eventInfo}));
    }
    else {
      const eventInfo = {
        correct: 0,
        key: this.key,
        val: this.val,
        decide: 0
      };
      document.dispatchEvent(new CustomEvent('card-ans', { detail: eventInfo}));
    }
  }

  _dragStart(event) {
    this.originX = event.clientX;
    this.originY = event.clientY;
    this.dragStarted = true;
    event.currentTarget.setPointerCapture(event.pointerId);
  }
}
