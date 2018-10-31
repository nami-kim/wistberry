import React from 'react';

export const Modal = ({ children, ...rest }) => (
  <div className="modal-outer">
    <div className="modal-inner" {...rest}>
    {children}
    </div>
  </div>
  
);

export default Modal;
