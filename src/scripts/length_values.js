let base;

// Parses CSS length value expressions like '20px' or '1.2rem'
// and returns a float representing a pixel value
export const parseLengthExpression = (value) => {
  let match;
  if (!value || value.match(/^\s*$/)) {
    return undefined;
  } else if ((match = /^([0-9]+)(px)?$/.exec(value))) {
    return parseInt(match[1]);
  } else if ((match = /^([0-9]*\.?[0-9]+)(rem)$/.exec(value))) {
    return remToPx(parseFloat(match[1]));
  } else {
    console.log("StickyHeadersElement: not parse expression '" + value + "'. Only 'px' and 'rem' are supported yet.");
    return undefined;
  }
};
export default parseLengthExpression;

export const remToPx = (rem) => {
  if (!base) {
    base = calculateBase() || 15;
  }
  return Math.round(rem * base);
};

const calculateBase = () => {
  const el = document.createElement("span");
  el.style.fontSize = "1rem";
  const style = window.getComputedStyle(el);
  return style && style.fontSize;
};
