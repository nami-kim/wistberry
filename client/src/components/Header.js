import React from 'react'
import HeaderMobile from './HeaderMobile'
import HeaderNonMobile from './HeaderNonMobile'

const Header = ({defaultHeader, productHeader}) => {
  return (
    <div>
      <HeaderMobile defaultHeader={defaultHeader} productHeader={productHeader}/>
      <HeaderNonMobile defaultHeader={defaultHeader} productHeader={productHeader}/>
    </div>
  )
}
export default Header
