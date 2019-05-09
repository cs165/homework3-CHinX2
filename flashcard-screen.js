// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Rewriting some of the existing methods, such as changing code in `show()`
// - Adding methods
// - Adding additional fields

class FlashcardScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
  }

  show(id, keylist, vallist) {
    this.containerElement.classList.remove('inactive');
    this.flashcardContainer = document.querySelector('#flashcard-container');

    while(this.flashcardContainer.hasChildNodes()) {
      this.flashcardContainer.removeChild(this.flashcardContainer.firstChild);
    }
    
    this._ansSelect = this._ansSelect.bind(this);
    this.nextCard = this.nextCard.bind(this);
    
    this.selected = 0;
    this.right = 0;
    this.wrong = 0;
    this.last = null;
    this.last_val = 0;
    this.incorrectTab = [];
    this.id = id;
    document.querySelector('.correct').textContent = this.right;
    document.querySelector('.incorrect').textContent = this.wrong;

    //this.nkey = Object.keys(FLASHCARD_DECKS[i]['words']);
    //this.nval = FLASHCARD_DECKS[i]['words'];
    this.nkey = keylist;
    this.nval = vallist;
    this.cnt = this.nkey.length;
    
    const card = new Flashcard(this.flashcardContainer, this.nkey[0], this.nval[this.nkey[0]], this.nextCard);
    document.addEventListener('card-ans', this._ansSelect);
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  nextCard() {
    //console.log('now:'+this.selected+' '+this.right+' '+this.wrong);
    if(this.selected < (this.right + this.wrong) && (this.selected+1) !== this.cnt) { 
      this.selected = this.right + this.wrong;
      const card = new Flashcard(this.flashcardContainer, this.nkey[this.selected], this.nval[this.nkey[this.selected]], this.nextCard );
    }
  }

  _ansSelect(event) {
    if(event.detail.correct>0 && this.last !== event.detail.key) {
      this.right = this.right + 1;
      this.last = event.detail.key;
      this.last_val = 1;
      document.body.style.backgroundColor = '#97b7b7';
    }
    else if(event.detail.correct<0  && this.last !== event.detail.key) {
      this.wrong = this.wrong + 1;
      this.last = event.detail.key;
      this.last_val = 0;
      document.body.style.backgroundColor = '#97b7b7';
    }
    else if(event.detail.correct === 0 && this.last === event.detail.key) {
      if(this.last_val) this.right = this.right - 1;
      else this.wrong = this.wrong - 1;
      this.last = null;
      document.body.style.backgroundColor = '#d0e6df';
    }
    
    document.querySelector('.correct').textContent = this.right;
    document.querySelector('.incorrect').textContent = this.wrong;
    
    if(event.detail.decide) {
      console.log(this.last+' '+this.right+' '+this.wrong+' '+this.selected);
      document.body.style.backgroundColor = '#d0e6df';
      if(event.detail.correct<0) this.incorrectTab[event.detail.key] = event.detail.val;
      if((this.right + this.wrong) === this.cnt) {
        const eventInfo = {
          correct: this.right,
          incorrect: this.wrong,
          wKey: Object.keys(this.incorrectTab),
          wVal: this.incorrectTab,
          id: this.id,
          key: this.nkey,
          val: this.nval
        };
        document.dispatchEvent(new CustomEvent('card-result', { detail: eventInfo}));
        return;
      }
    }
  }
}
