export default class Section {
    constructor( {renderer}, container) {
      this._renderer = renderer;
      this._container = container;
    }
  
    addItem(element) {
      this._container.append(element);
    }

    prependItem(element) {
      this._container.prepend(element);
    }

    renderItems(items) {
      items.forEach((item) => {
          this._renderer(item)
    });
    }
  }