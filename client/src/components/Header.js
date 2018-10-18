import React from 'react';
import HeaderMobile from './HeaderMobile';
import HeaderNonMobile from './HeaderNonMobile';

const Header = ({ defaultHeader, productHeader, checkoutHeader }) => {
  return (
    <div>
      <HeaderMobile
        defaultHeader={defaultHeader}
        productHeader={productHeader}
        checkoutHeader={checkoutHeader}
      />
      <HeaderNonMobile
        defaultHeader={defaultHeader}
        productHeader={productHeader}
        checkoutHeader={checkoutHeader}
      />
    </div>
  );
};
export default Header;
