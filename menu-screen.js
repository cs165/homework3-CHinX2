// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class MenuScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
  }

  show() {
    this.containerElement.classList.remove('inactive');

    // add button
    this._gotoMain = this._gotoMain.bind(this);
    for (let i = 0; i < FLASHCARD_DECKS.length; i++)
    {
      var btn = document.createElement('div');
      btn.textContent =  FLASHCARD_DECKS[i].title;
      btn.id = i;
      btn.addEventListener('click', this._gotoMain);
      document.querySelector('#choices').appendChild(btn);
    }
  }

  hide() {
    // remove button
    var list = document.querySelector('#choices');
    while(list.hasChildNodes()) {
      list.removeChild(list.firstChild);
    }
    this.containerElement.classList.add('inactive');
  }

  _gotoMain(event) {
    console.log(event.currentTarget.textContent);
    const eventInfo = {
      id: event.currentTarget.id,
      name: event.currentTarget.textContent,
      key: Object.keys(FLASHCARD_DECKS[event.currentTarget.id]['words']),
      val: FLASHCARD_DECKS[event.currentTarget.id]['words']
    };
    event.currentTarget.style.display = 'none';
    document.dispatchEvent(new CustomEvent('menu-click', { detail: eventInfo}));
  }
}
