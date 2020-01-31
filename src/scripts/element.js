/* eslint-env browser */

import parseLengthExpression from "./length_values";

export default class StickyHeadersElement extends HTMLElement {
  connectedCallback() {
    this._x = 0;
    this._y = 0;

    this.addEventListener("scroll", (event) => this.handleScroll(event));
    if (window.ResizeObserver) {
      this.resizeObserver = new ResizeObserver(() => this.handleResize());
      this.resizeObserver.observe(this);
    } else {
      window.addEventListener("resize", () => this.handleResize());
    }

    this.attributeChangedCallback();
  };

  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  attributeChangedCallback() {
    this.minContainerWith = parseLengthExpression(this.getAttribute("min-container-width"));
    this.minScreenWith = parseLengthExpression(this.getAttribute("min-screen-width"));

    this.lastColumnFixationActive = this.columnFixationActive();
    this.handleScroll();
  }

  static get observedAttributes() {
    return ["min-container-width", "min-screen-width"];
  }

  handleScroll() {
    this._x = this.scrollLeft;
    this._y = this.scrollTop;
    const elements = this.querySelectorAll(".sticky-col-header, .sticky-row-header");
    for (let index = 0; index < elements.length; index++) {
      const el = elements[index];
      const classes = el.classList;
      let x = 0;
      let y = 0;
      let z = 0;
      if (this.lastColumnFixationActive && classes.contains("sticky-col-header")) {
        x = this._x;
        z++;
      };
      if (classes.contains("sticky-row-header")) {
        y = this._y;
        z++;
      }
      const transl = "translate3d(" + x + "px, " + y + "px, " + z + "px)";
      el.style.transform = transl;
      el.style.webkitTransform = transl;
    }
  };

  handleResize() {
    const columnFixationActive = this.columnFixationActive();
    const changed = (columnFixationActive !== this.lastColumnFixationActive);
    this.lastColumnFixationActive = columnFixationActive;
    if (changed) {
      this.handleScroll();
    }
  }

  columnFixationActive() {
    if (this.minContainerWith && this.clientWidth < this.minContainerWith) {
      return false;
    } else if (this.minScreenWith && ((window.innerWidth > 0) ? window.innerWidth : screen.width) < this.minScreenWith) {
      return false;
    } else {
      return true;
    }
  };

  register(tagName = "sticky-headers", options = {}) {
    if (window.customElements && window.customElements.define) {
      window.customElements.define(tagName, StickyHeadersElement, options);
    } else {
      console.log("Could not register StickyHeadersElement as '<" + tagName + ">'");
    }
  };
};
