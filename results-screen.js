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
  }

  show(numberCorrect, numberWrong) {
    this.containerElement.classList.remove('inactive');
    this.percent = (numberCorrect*100) / (numberCorrect +numberWrong);
    document.querySelector('.percent').textContent = this.percent;
    document.querySelectorAll('.correct')[1].textContent = numberCorrect;
    document.querySelectorAll('.incorrect')[1].textContent = numberWrong;
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
}
