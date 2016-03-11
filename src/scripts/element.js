/* eslint-env browser */

import stickyHeaders from "./sticky-headers";

export default class StickyHeadersElement extends HTMLDivElement {
  createdCallback() {
  }

  attachedCallback() {
    stickyHeaders(this);
  }
}
