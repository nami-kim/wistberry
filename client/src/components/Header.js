import React from 'react'
import HeaderMobile from './HeaderMobile'
import HeaderNonMobile from './HeaderNonMobile'

const Header = ({defaultHeader}) => {
  return (
    <div>
      <HeaderMobile defaultHeader={defaultHeader} />
      <HeaderNonMobile defaultHeader={defaultHeader} />
    </div>
  )
}
export default Header
