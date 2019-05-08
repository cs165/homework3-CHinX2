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

  show(i) {
    this.containerElement.classList.remove('inactive');
    const flashcardContainer = document.querySelector('#flashcard-container');
    
    this._ansSelect = this._ansSelect.bind(this);
    
    this.selected = 0;
    this.right = 0;
    this.wrong = 0;
    this.last = null;
    this.last_val = 0;
    this.incorrectTab = [];
    for (let nkey in FLASHCARD_DECKS[i]['words'])
    {
      //console.log(nkey);
      const card = new Flashcard(flashcardContainer, nkey, FLASHCARD_DECKS[i]['words'][nkey]);
    }
    document.addEventListener('card-ans', this._ansSelect);
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  _ansSelect(event) {
    //console.log(this.right+' '+this.wrong);
    if(event.detail.val>0 && this.last !== event.detail.word) {
      this.right = this.right + 1;
      this.last = event.detail.word;
      this.last_val = 1;
    }
    else if(event.detail.val<0  && this.last !== event.detail.word) {
      this.wrong = this.wrong + 1;
      this.last = event.detail.word;
      this.last_val = 0;
    }
    else if(event.detail.val === 0 && this.last === event.detail.word) {
      if(this.last_val) this.right = this.right - 1;
      else this.wrong = this.wrong - 1;
      this.last = null;
    }
    console.log(this.last+' '+this.right+' '+this.wrong+' '+this.selected);
    document.querySelector('.correct').textContent = this.right;
    document.querySelector('.incorrect').textContent = this.wrong;
    
    if(event.detail.decide) {
      this.selected = this.selected + 1;
      if(event.detail.val<0) incorrectTab.push(event.detail.word);
      if(this.selected === 5) {
        const eventInfo = {
          correct: this.right,
          incorrect: this.wrong,
          wTable: this.incorrectTab
        };
        document.dispatchEvent(new CustomEvent('card-result', { detail: eventInfo}));
        return;
      }
    }
  }
}
