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
    console.log("AA");
    this.containerElement.classList.remove('inactive');
    this.flashcardContainer = document.querySelector('#flashcard-container');
    
    this._ansSelect = this._ansSelect.bind(this);
    this.nextCard = this.nextCard.bind(this);
    
    this.selected = 0;
    this.right = 0;
    this.wrong = 0;
    this.last = null;
    this.last_val = 0;
    this.incorrectTab = [];
    this.id = i;
    document.querySelector('.correct').textContent = this.right;
    document.querySelector('.incorrect').textContent = this.wrong;

    this.nkey = Object.keys(FLASHCARD_DECKS[i]['words']);
    this.nval = FLASHCARD_DECKS[i]['words'];
    this.cnt = this.nkey.length;
    console.log(this.cnt + this.nkey + this.nval);
    //console.log(nkey);
    // for(tmp in )
    
    const card = new Flashcard(this.flashcardContainer, this.nkey[0], this.nval[this.nkey[0]], this.nextCard);
    document.addEventListener('card-ans', this._ansSelect);
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  nextCard() {
    console.log('now:'+this.selected);
    if(this.selected < (this.right + this.wrong)) { 
      this.selected = this.right + this.wrong;
      const card = new Flashcard(this.flashcardContainer, this.nkey[this.selected], this.nval[this.nkey[this.selected]], this.nextCard );
    }
  }

  _ansSelect(event) {
    //console.log(this.right+' '+this.wrong);
    if(event.detail.val>0 && this.last !== event.detail.word) {
      this.right = this.right + 1;
      this.last = event.detail.word;
      this.last_val = 1;
      document.body.style.backgroundColor = '#97b7b7';
    }
    else if(event.detail.val<0  && this.last !== event.detail.word) {
      this.wrong = this.wrong + 1;
      this.last = event.detail.word;
      this.last_val = 0;
      document.body.style.backgroundColor = '#97b7b7';
    }
    else if(event.detail.val === 0 && this.last === event.detail.word) {
      if(this.last_val) this.right = this.right - 1;
      else this.wrong = this.wrong - 1;
      this.last = null;
      document.body.style.backgroundColor = '#d0e6df';
    }
    console.log(this.last+' '+this.right+' '+this.wrong+' '+this.selected);
    document.querySelector('.correct').textContent = this.right;
    document.querySelector('.incorrect').textContent = this.wrong;
    
    if(event.detail.decide) {
      //this.selected = this.selected + 1;
      document.body.style.backgroundColor = '#d0e6df';
      if(event.detail.val<0) this.incorrectTab.push(event.detail.word);
      if((this.right + this.wrong) === this.cnt) {
        const eventInfo = {
          correct: this.right,
          incorrect: this.wrong,
          wTable: this.incorrectTab,
          id: this.id
        };
        document.dispatchEvent(new CustomEvent('card-result', { detail: eventInfo}));
        return;
      }
    }
  }
}
