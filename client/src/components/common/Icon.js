import React from 'react';

export const Icon = ({
  width = 24,
  height = 24,
  paths = [],
  className = '',
  pathClassName = '',
  style = {},
  pathStyle = {}
}) => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox={`-4 -4 ${28} ${28}`}
    style={style}
    className={className}
  >
    {paths.map((path, i) => (
      <path key={i} className={pathClassName} style={pathStyle} d={path} />
    ))}
  </svg>
);

export default Icon;
