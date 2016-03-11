/* eslint-env browser */

export default function stickyHeaders(tableWrapperElement) {
  let x = 0;
  let y = 0;

  let oldX = 0;
  let oldY = 0;

  tableWrapperElement.addEventListener("scroll", function(event) {
    let left = tableWrapperElement.scrollLeft;
    let top = tableWrapperElement.scrollTop;

    // Horizontal scroll
    if (x !== left) {
      x = left;
    }

    // Vertical scroll
    if (y !== top) {
      y = top;
    }

    updateInlineStyles(x, y);
  });

  function updateInlineStyles(x, y) {
    if (oldX !== x) {
      setTranslate(".sticky-col-header", x, 0, 0);
    }
    if (oldY !== y) {
      setTranslate(".sticky-row-header", 0, y, 2);
    }
    setTranslate(".sticky-col-header.sticky-row-header", x, y, 4);
    oldX = x;
    oldY = y;
  }

  function setTranslate(selector, x, y, z) {
    let elements = tableWrapperElement.querySelectorAll(selector);
    let transl = "translate3d(" + x + "px, " + y + "px, " + z + "px)";
    let index = 0;
    for (index = 0; index < elements.length; index++) {
      elements[index].style.transform = transl;
      elements[index].style.webkitTransform = transl;
    }
  }
};
