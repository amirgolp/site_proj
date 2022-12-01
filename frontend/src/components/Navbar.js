import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

import SearchIcon from '@mui/icons-material/Search'
import HomeIcon from '@mui/icons-material/Home'
import NotificationsIcon from '@mui/icons-material/Notifications'
import LogoutIcon from '@mui/icons-material/Logout'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

import DocLogo from '../images/logo1.svg'
import { HeaderOption } from './HeaderOption'
import { useCallback } from 'react'
import { IconButton, Button, Paper, Stack } from '@mui/material'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleLogout = useCallback(() => {
    logout()
  }, [logout])

  const handleNotification = useCallback(() => {}, [])

  const handleHome = useCallback(() => {}, [])

  return (
    <div className='header' style={{ justifyContent: 'space-between'}}>

      <div className='header__left'>
        <Stack direction="row" alignItems="center" p={1} sx={{ position:  "sticky", top: 0, justifyContent: "space-between", display: 'flex' }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", marginRight: '5px' }}>
            <img src={DocLogo} alt="logo" height={60} />
          </Link>
          {user && <Paper
            component='form'
            onSubmit={(e) => {e.preventDefault()}}
            sx={{
              borderRadius: 20,
              border: '1px solid #e3e3e3',
              pl: 2,
              boxShadow: 'none',
              mr: { sm: 5 }, width: '400px'
            }}
          >
            <input
              style={{ border: 'None', outline: 'none', width: '350px' }}
              placeholder='Search...'
              value={null}
              onChange={() => {}}
            />
            <IconButton type='submit' sx={{ p: '10px' }} aria-label='search'>
              <SearchIcon />
            </IconButton>
          </Paper>}
        </Stack>
      </div>

      <div className='header__right'>
        {user && <HeaderOption Icon={HomeIcon} title='Home' handleClick={handleHome}/>}
        {user && <HeaderOption Icon={NotificationsIcon} title='Notifications' handleClick={handleNotification}/>}
        {user && <HeaderOption Icon={LogoutIcon} title={`Welcome ${user.email}`}  handleClick={handleLogout}/>}
        {!user && (
          <div>
            <Button startIcon={<AccountCircleIcon/>}>
              <Link to="/login">Login / Register</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar