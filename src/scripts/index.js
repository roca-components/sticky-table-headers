/* eslint-env browser */

import StickyHeadersElement from "./element";

export default document.registerElement("sticky-headers", {
  prototype: StickyHeadersElement,
  extends: "div"
});
