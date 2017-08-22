/**
 * Evaluate the function with props or return style if an object
 * @param {*} styles Component styles
 * @param {*} props Component props
 */
function evaluateGlamorStyles(styles, props, theme) {
  return styles.map((style) => {
    if (typeof style === 'function') {
      return style(props, theme);
    }
    return style;
  });
}

/**
 * Get the styles and assign them to the 'style' prop of the component
 * @param {*} styles Component styles
 * @param {*} props Component props
 */
function getStyles(styles, props, theme) {
  const glamorStyles = evaluateGlamorStyles(styles, props, theme);
  const outputStyles = glamorStyles;

  if (props.style) {
    outputStyles.push(props.style);
  }

  return outputStyles;
}

export default getStyles;
