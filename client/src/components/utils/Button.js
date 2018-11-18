import React from 'react';

export const Button = ({ children, ...rest }) => (
  <button className="black-lg-btn" {...rest}>
    {children}
  </button>
);

export const SmallButton = ({ children, show = true, ...rest }) => (
  <button className={`black-sm-btn ${show ? '': 'no-display'}`} {...rest}>
    {children}
  </button>
);

export const OrangeButton = ({ children, show = true, ...rest }) => (
  <button className={`orangeyellow-lg-btn ${show ? '': 'no-display'}`} {...rest}>
    {children}
  </button>
);

export const EditButton = ({ children, show = true, ...rest }) => (
  <button className={`edit-btn ${show ? '' : 'no-display'}`} {...rest}>
    {children}
  </button>
);

export default Button;
