import React from 'react'
import Image from 'next/image'
import hamburgerIcon from '../assets/icon-menu.svg'
import logoImage from '../assets/logo.svg'
function MobileHeader({onClick}) {
  return (
    <div className='p-4 flex items-center justify-between'>
        <Image className='cursor-pointer' src={logoImage} alt='logo' />
        <button onClick={onClick}>
          <Image src={hamburgerIcon} alt='menu-icon' />
        </button>
    </div>
  )
}

export default MobileHeader
