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
    this.resultShow = this.resultShow.bind(this);
    this.startOver = this.startOver.bind(this);
    this.continueCur = this.continueCur.bind(this);
    this.backToMenu = this.backToMenu.bind(this);

    document.addEventListener('menu-click', this.menuClicked);
    document.addEventListener('card-result', this.resultShow);
    document.addEventListener('start-over', this.startOver);
    document.addEventListener('continue', this.continueCur);
    document.addEventListener('back-menu', this.backToMenu);
    

    // Uncomment this pair of lines to see the "flashcard" screen:
    //this.menu.hide();
    //this.flashcards.show();

    // Uncomment this pair of lines to see the "results" screen:
    //this.menu.hide();
    //this.results.show();
  }

  menuClicked(event) {
    //console.log(event.detail.id);
    this.menu.hide();
    this.flashcards.show(event.detail.id, event.detail.key, event.detail.val);
  }
  resultShow(event) {
    //this.menu.hide();
    this.flashcards.hide();
    this.results.show(event.detail.correct, event.detail.incorrect, event.detail.id, event.detail.wKey, event.detail.wVal);
  }

  startOver(event) {
    //console.log(event.detail.id);
    console.log('start-over')
    this.results.hide();
    this.flashcards.show(event.detail.id, event.detail.key, event.detail.val);
  }

  continueCur(event) {
    console.log('continue');
    this.results.hide();
    this.flashcards.show(event.detail.id, event.detail.wKey, event.detail.wVal);

  }

  backToMenu(event) {
    this.results.hide();
    this.menu.show();
  }
}
