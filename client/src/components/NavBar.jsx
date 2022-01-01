import {Drawer, List, Divider, ListItem, ListItemIcon, Box, AppBar, Toolbar, IconButton, Typography, InputBase, Badge, MenuItem, Menu, ListItemText, Avatar } from '@mui/material';
import { styled, alpha, ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react';
import {context} from '../context/Provider'

//Icons
import {AccountCircle, Mail, Notifications, MoreVert, Home, Dashboard, Message, Logout, Info, Settings, Login, AssignmentInd} from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search'
//import logo from '../assets/logo.svg';


//configuración de estilos
const newTheme = createTheme({
    palette:{
        mode: 'light',
        primary:{
            main: '#fff'
        }
    }
})

const Search = styled('div')(({ theme }) => ({ position: 'relative', borderRadius: theme.shape.borderRadius, backgroundColor: alpha(theme.palette.common.white, 0.15), '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25),}, marginRight: theme.spacing(2), marginLeft: 0, width: '100%', [theme.breakpoints.up('sm')]: { marginLeft: theme.spacing(3), width: 'auto',},}));
const SearchIconWrapper = styled('div')(({ theme }) => ({ padding: theme.spacing(0, 2), height: '100%', position: 'absolute', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', }));
const StyledInputBase = styled(InputBase)(({ theme }) => ({color: 'inherit','& .MuiInputBase-input': {padding: theme.spacing(1, 1, 1, 0),paddingLeft: `calc(1em + ${theme.spacing(4)})`,transition: theme.transitions.create('width'),width: '100%',[theme.breakpoints.up('md')]: {width: '20ch',},},}));

export default function NavBar() {
    let navigate = useNavigate()
    //State
    const [state, setState] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const {user, setUser, publications, setRenderData} = useContext(context)
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = (ruta) => {
        setAnchorEl(null);
        handleMobileMenuClose();
        navigate(ruta);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleLogout = ()=>{
        localStorage.setItem('auth', false);
        setUser(false);
        handleMenuClose('/');
    }

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={()=> setState(false)}
            onKeyDown={()=> setState(false)}
        >
            {user ? (
            <>
                <List>
                    <ListItem button onClick={()=> navigate('/')}>
                        <ListItemIcon>
                            <Home />
                        </ListItemIcon>
                        <ListItemText primary="Inicio" />
                    </ListItem>
                    <ListItem button onClick={()=> navigate('/myprofile')}>
                        <ListItemIcon>
                            <Dashboard/>
                        </ListItemIcon>
                        <ListItemText primary="Mi perfil" />
                    </ListItem>
                    <ListItem button onClick={()=> navigate('/messages')}>
                        <ListItemIcon>
                            <Message />
                        </ListItemIcon>
                        <ListItemText primary="Mensages" />
                    </ListItem>
                    <ListItem button onClick={()=> navigate('/settings')}>
                        <ListItemIcon>
                            <Settings />
                        </ListItemIcon>
                        <ListItemText primary="Configuración" />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button onClick={handleLogout}>
                        <ListItemIcon>
                            <Logout />
                        </ListItemIcon>
                        <ListItemText primary="Cerrar Sesión" />
                    </ListItem>
                    <ListItem button onClick={()=> navigate('/about')}>
                        <ListItemIcon>
                            <Info />
                        </ListItemIcon>
                        <ListItemText primary="Acerca de" />
                    </ListItem>
                </List>
            </>):(
                <>
                <List>
                    <ListItem button onClick={()=> navigate('/')}>
                        <ListItemIcon>
                            <Home />
                        </ListItemIcon>
                        <ListItemText primary="Inicio" />
                    </ListItem>

                    <ListItem button onClick={()=> navigate('/login')}>
                        <ListItemIcon>
                            <Login />
                        </ListItemIcon>
                        <ListItemText primary="Iniciar Sesión" />
                    </ListItem>
                    <ListItem button onClick={()=> navigate('/sign-up')}>
                        <ListItemIcon>
                            <AssignmentInd />
                        </ListItemIcon>
                        <ListItemText primary="Registrarse" />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button onClick={()=> navigate('/about')}>
                        <ListItemIcon>
                            <Info />
                        </ListItemIcon>
                        <ListItemText primary="Acerca de" />
                    </ListItem>
                </List>
                </>
            )}
        </Box>
    );

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu anchorEl={anchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right',}} id={menuId} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right',}} open={isMenuOpen} onClose={handleMenuClose}>
            { user ? <MenuItem onClick={() => handleMenuClose('/myprofile')}>Mi perfil</MenuItem>:<MenuItem onClick={() => handleMenuClose('/login')}>Iniciar Sesión</MenuItem>}
            { user ? <MenuItem onClick={() => handleMenuClose('/settings')}>Configuración</MenuItem>:<MenuItem onClick={() => handleMenuClose('/sign-up')}>Registrarse</MenuItem>}
            { user ? <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>: null}
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu anchorEl={mobileMoreAnchorEl} anchorOrigin={{vertical: 'top',horizontal: 'right',}} id={mobileMenuId} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right',}} open={isMobileMenuOpen} onClose={handleMobileMenuClose}>
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <Mail/>
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                    <Badge badgeContent={17} color="error">
                    <Notifications/>
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton size="large" aria-label="account of current user" aria-controls="primary-search-account-menu" aria-haspopup="true" color="inherit">
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    const filter = (category)=>{
        const filterPublications = publications.filter(item => item.name.includes(category));
        setRenderData(filterPublications);
    }

    return (
    <ThemeProvider theme={newTheme} >
        <Box sx={{ flexGrow: 1, mb:10 }}>
            <AppBar sx={{ boxShadow:0 }}>
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" onClick={()=> setState(true)} sx={{ mr: 2 }} >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}> CreatiBook </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} onChange={(e)=> filter(e.target.value)}/>
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    {
                        user ? (
                            <>
                            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={()=> navigate('/messages')}>
                                    <Badge badgeContent={4} color="error">
                                        <Mail />
                                    </Badge>
                                </IconButton>
                                <IconButton size="large" aria-label="show 17 new notifications" color="inherit" onClick={()=> navigate('/notifications')}>
                                    <Badge badgeContent={17} color="error">
                                    <Notifications />
                                    </Badge>
                                </IconButton>
                                <IconButton size="large" edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true" onClick={handleProfileMenuOpen} color="inherit">
                                    <Avatar alt={user.name} src={user.avatar} sx={{width: 30, height: 30}} />
                                </IconButton>
                            </Box>
                            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                                <IconButton size="large" aria-label="show more" aria-controls={mobileMenuId} aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit">
                                    <MoreVert/>
                                </IconButton>
                            </Box>
                            </>
                        ):(
                            <IconButton size="large" edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true" onClick={handleProfileMenuOpen} color="inherit">
                                <AccountCircle />
                            </IconButton>
                        )
                    }
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}

            <Drawer
                anchor="left"
                open={state}
                onClose={()=>setState(false)}
            >
                {list()}
            </Drawer>
        </Box>
    </ThemeProvider>
    );
}
