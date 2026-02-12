import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Container, Drawer, List, ListItem, ListItemButton, ListItemText, Stack, Badge } from '@mui/material';
import { Menu as MenuIcon, ShoppingBag, Person, Search, Close } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../ui/Button';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isHome = location.pathname === '/';
    const headerBg = isHome && !isScrolled ? 'transparent' : 'rgba(255, 255, 255, 0.9)';
    const headerColor = isHome && !isScrolled ? 'white' : 'text.primary';

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '#' },
        { name: 'About', path: '#' },
    ];

    return (
        <>
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    bgcolor: headerBg, color: headerColor,
                    backdropFilter: isHome && !isScrolled ? 'none' : 'blur(10px)',
                    transition: 'all 0.3s ease-in-out',
                    boxShadow: isHome && !isScrolled ? 'none' : 2,
                    zIndex: 1200
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar disableGutters sx={{ height: 80 }}>
                        <IconButton
                            edge="start" color="inherit"
                            sx={{ mr: 2, display: { md: 'none' } }}
                            onClick={() => setMobileOpen(true)}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Typography
                            variant="h5" fontWeight="900" sx={{ flexGrow: { xs: 1, md: 0 }, cursor: 'pointer' }}
                            onClick={() => navigate('/')}
                        >
                            <Box component="span" sx={{ color: '#13ec13' }}>Stitch</Box>Arch.
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: 4 }}>
                            {navLinks.map((link) => (
                                <Typography
                                    key={link.name}
                                    variant="body1"
                                    sx={{ fontWeight: 600, cursor: 'pointer', '&:hover': { color: '#13ec13' } }}
                                    onClick={() => navigate(link.path)}
                                >
                                    {link.name}
                                </Typography>
                            ))}
                        </Box>

                        <Stack direction="row" spacing={1} alignItems="center">
                            <IconButton color="inherit"><Search /></IconButton>
                            <IconButton color="inherit" onClick={() => navigate('/auth')}><Person /></IconButton>
                            <IconButton color="inherit"><Badge badgeContent={0} color="primary"><ShoppingBag /></Badge></IconButton>
                        </Stack>
                    </Toolbar>
                </Container>
            </AppBar>

            <Drawer anchor="left" open={mobileOpen} onClose={() => setMobileOpen(false)}>
                <Box sx={{ width: 250, p: 3 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
                        <Typography variant="h6" fontWeight="bold">Menu</Typography>
                        <IconButton onClick={() => setMobileOpen(false)}><Close /></IconButton>
                    </Stack>
                    <List>
                        {navLinks.map((link) => (
                            <ListItem key={link.name} disablePadding>
                                <ListItemButton onClick={() => { navigate(link.path); setMobileOpen(false); }}>
                                    <ListItemText primary={link.name} primaryTypographyProps={{ fontWeight: 'bold' }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default Header;
