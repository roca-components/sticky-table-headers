/* eslint-env browser */

let StickyHeadersElement = Object.create(HTMLDivElement.prototype);

StickyHeadersElement.attachedCallback = function() {
  this._x = 0;
  this._y = 0;

  this._oldX = 0;
  this._oldY = 0;

  this.addEventListener("scroll", (event) => this.handleScroll(event));
};

StickyHeadersElement.handleScroll = function(event) {
  this._x = this.scrollLeft;
  this._y = this.scrollTop;

  this.updateInlineStyles();
};

StickyHeadersElement.updateInlineStyles = function() {
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

StickyHeadersElement.setTranslate = function(selector, x, y, z) {
  let elements = this.querySelectorAll(selector);
  let transl = "translate3d(" + x + "px, " + y + "px, " + z + "px)";
  let index = 0;
  for (index = 0; index < elements.length; index++) {
    elements[index].style.transform = transl;
    elements[index].style.webkitTransform = transl;
  }
};

export default StickyHeadersElement;
