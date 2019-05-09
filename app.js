// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Changing the code in the constructor
// - Adding methods
// - Adding additional fields

class App {
  constructor() {
    const menuElement = document.querySelector('#menu');
    this.menu = new MenuScreen(menuElement);
    
    const mainElement = document.querySelector('#main');
    this.flashcards = new FlashcardScreen(mainElement);

    const resultElement = document.querySelector('#results');
    this.results = new ResultsScreen(resultElement);

    this.menu.show();
    this.menuClicked = this.menuClicked.bind(this);
    document.addEventListener('menu-click', this.menuClicked);
    this.resultShow = this.resultShow.bind(this);
    document.addEventListener('card-result', this.resultShow);
    this.startOver = this.startOver.bind(this);
    document.addEventListener('start-over', this.startOver);
    

    // Uncomment this pair of lines to see the "flashcard" screen:
    //this.menu.hide();
    //this.flashcards.show();

    // Uncomment this pair of lines to see the "results" screen:
    //this.menu.hide();
    //this.results.show();
  }

  menuClicked(event) {
    console.log(event.detail.id);
    this.menu.hide();
    this.flashcards.show(event.detail.id);
  }
  resultShow(event) {
    //this.menu.hide();
    this.flashcards.hide();
    this.results.show(event.detail.correct, event.detail.incorrect, event.detail.wTable, event.detail.id);
  }

  startOver(event) {
    console.log(event.detail.id);
    console.log('start-over')
    this.results.hide();
    this.flashcards.show(event.detail.id);
  }
}
