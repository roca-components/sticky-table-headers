/* eslint-env browser */

export default class StickyHeadersElement extends HTMLElement {
  connectedCallback() {
    this._x = 0;
    this._y = 0;

    this._oldX = 0;
    this._oldY = 0;

    this.addEventListener("scroll", (event) => this.handleScroll(event));
  };

  handleScroll(event) {
    const left = this.scrollLeft;
    const top = this.scrollTop;

    // Horizontal scroll
    if (this._x !== left) {
      this._x = left;
    }

    // Vertical scroll
    if (this._y !== top) {
      this._y = top;
    }

    this.updateInlineStyles();
  };

  updateInlineStyles() {
    if (this._oldX !== this._x) {
      this.setTranslate(".sticky-col-header", this._x, 0, 0);
    }
    if (this._oldY !== this._y) {
      this.setTranslate(".sticky-row-header", 0, this._y, 2);
    }
    this.setTranslate(".sticky-col-header.sticky-row-header", this._x, this._y, 4);
    this._oldX = this._x;
    this._oldY = this._y;
  };

  setTranslate(selector, x, y, z) {
    const elements = this.querySelectorAll(selector);
    const transl = "translate3d(" + x + "px, " + y + "px, " + z + "px)";
    for (let index = 0; index < elements.length; index++) {
      elements[index].style.transform = transl;
      elements[index].style.webkitTransform = transl;
    }
  };

  register(tagName = "sticky-headers", options = {}) {
    if (customElements && customElements.define) {
      customElements.define(tagName, StickyHeadersElement, options);
    } else {
      console.log("Could not register StickyHeadersElement as '<" + tagName + ">'");
    }
  };
};
