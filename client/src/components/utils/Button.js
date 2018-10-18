import React from 'react';

export const Button = ({ children, ...rest }) => (
  <button className="black-lg-btn" {...rest}>
    {children}
  </button>
);

export const SmallButton = ({ children, ...rest }) => (
  <button className="black-sm-btn" {...rest}>
    {children}
  </button>
);

export const OrangeButton = ({ children, ...rest }) => (
  <button className="orangeyellow-lg-btn" {...rest}>
    {children}
  </button>
);

export default Button;
