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

  show(numberCorrect, numberWrong, wrongTable, id) {
    this.containerElement.classList.remove('inactive');
    this.percent = (numberCorrect*100) / (numberCorrect +numberWrong);
    this.wTab = wrongTable;
    this.id = id;
    document.querySelector('.percent').textContent = this.percent.toFixed();
    document.querySelectorAll('.correct')[1].textContent = numberCorrect;
    document.querySelectorAll('.incorrect')[1].textContent = numberWrong;

    const btn1 = document.querySelector('.continue');
    const btn2 = document.querySelector('.to-menu');
    if(this.percent === 100) {
      console.log(this.id);
      document.querySelector('.continue').textContent = 'Star over?';
      btn1.addEventListener('click', this._startOver);
    }
    else {
      document.querySelector('.continue').textContent = 'Continue';
      btn1.addEventListener('click', this._continue);
    }
    btn2.addEventListener('click',this._backToMain);
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  _backToMain(event) {
    window.location.reload();
  }

  _startOver(event) {
    console.log(this.id);
    const eventInfo = {
      id: this.id
    };
    document.dispatchEvent(new CustomEvent('start-over', { detail: eventInfo}));
  }
  _continue(event) {

  }
}
