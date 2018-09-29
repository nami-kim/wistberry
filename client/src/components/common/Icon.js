import React from 'react';
import { iconPaths } from './constants.js';

function getPath(iconName) {
  const icon = iconPaths.icons.find(icon => icon.properties.name === iconName);

  if (icon) {
    return icon.icon.paths.join(' ');
  } else {
    console.warn(`icon ${iconName} does not exist.`);
    return '';
  }
}

const Icon = props => (
  <svg
    style={props.style}
    width={props.width}
    height={props.height}
    viewBox="0 0 1024 1024"
  >
    <path d={getPath(props.icon)} />
  </svg>
);

export default Icon;
