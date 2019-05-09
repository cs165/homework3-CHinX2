// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class ResultsScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this._backToMain = this._backToMain.bind(this);
    this._continue = this._continue.bind(this);
    this._startOver = this._startOver.bind(this);
  }

  show(numberCorrect, numberWrong, id, wKey, wVal) {
    this.containerElement.classList.remove('inactive');
    this.percent = (numberCorrect*100) / (numberCorrect +numberWrong);
    this.key = Object.keys(FLASHCARD_DECKS[id]['words']);
    this.val = FLASHCARD_DECKS[id]['words'];
    this.id = id;
    this.wKey = wKey;
    this.wVal = wVal;

    document.querySelector('.percent').textContent = this.percent.toFixed();
    document.querySelectorAll('.correct')[1].textContent = numberCorrect;
    document.querySelectorAll('.incorrect')[1].textContent = numberWrong;

    this.btn1 = document.querySelector('.continue');
    this.btn2 = document.querySelector('.to-menu');
    if(this.percent === 100) {
      //console.log(this.id);
      document.querySelector('.continue').textContent = 'Start over?';
      this.btn1.addEventListener('click', this._startOver);
    }
    else {
      document.querySelector('.continue').textContent = 'Continue';
      this.btn1.addEventListener('click', this._continue);
    }
    this.btn2.addEventListener('click',this._backToMain);
  }

  hide() {
    if(this.percent === 100) this.btn1.removeEventListener('click', this._startOver);
    else this.btn1.removeEventListener('click', this._continue);
    this.containerElement.classList.add('inactive');
  }

  _backToMain(event) {
    document.dispatchEvent(new CustomEvent('back-menu'));
  }

  _startOver(event) {
    //console.log(this.id);
    const eventInfo = {
      id: this.id,
      key: this.key,
      val: this.val
    };
    document.dispatchEvent(new CustomEvent('start-over', { detail: eventInfo}));
  }

  _continue(event) {
    console.log('wrong: '+this.wKey);
    const eventInfo = {
      id: this.id,
      wKey: this.wKey,
      wVal: this.wVal
    };
    document.dispatchEvent(new CustomEvent('continue', { detail: eventInfo}));
  }
}
