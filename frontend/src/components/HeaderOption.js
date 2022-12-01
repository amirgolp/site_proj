import React from 'react'
import './Navbar.css'
import IconButton from '@mui/material/IconButton'

export const HeaderOption = ({Icon, title, handleClick}) => {
  return (
    <div className='headerOption'>
      {Icon && <IconButton onClick={handleClick}>
          <Icon className='headerOption__icon' />
      </IconButton>
      }
      <h3 className='headerOption__title'>
        {title}
      </h3>
    </div>
  )
}
