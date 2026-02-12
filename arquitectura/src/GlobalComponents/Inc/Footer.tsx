import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Stack, TextField } from '@mui/material';
import { Facebook, Twitter, Instagram, Pinterest, Send } from '@mui/icons-material';
import Button from '../ui/Button';

const Footer = () => {
    return (
        <Box sx={{ bgcolor: 'grey.900', color: 'white', pt: 10, pb: 4 }}>
            <Container maxWidth="lg">
                <Grid container spacing={5}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h5" fontWeight="900" gutterBottom>
                            <Box component="span" sx={{ color: '#13ec13' }}>Stitch</Box>Arch.
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'grey.400', mb: 3, lineHeight: 1.8 }}>
                            Developing modern architectures for digital garden experiences.
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            {[Facebook, Twitter, Instagram, Pinterest].map((Icon, i) => (
                                <IconButton key={i} size="small" sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: '#13ec13' } }}>
                                    <Icon fontSize="small" />
                                </IconButton>
                            ))}
                        </Stack>
                    </Grid>

                    <Grid item xs={6} md={2}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>Resources</Typography>
                        <Stack spacing={1}>
                            {['Documentation', 'Components', 'Themes'].map((item) => (
                                <Link key={item} href="#" underline="none" sx={{ color: 'grey.400', '&:hover': { color: '#13ec13' }, fontSize: '0.9rem' }}>
                                    {item}
                                </Link>
                            ))}
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>Stay Updated</Typography>
                        <Stack direction="row" spacing={1}>
                            <TextField
                                variant="outlined"
                                placeholder="Email"
                                size="small"
                                fullWidth
                                sx={{
                                    bgcolor: 'rgba(255,255,255,0.05)',
                                    borderRadius: 1,
                                    input: { color: 'white' },
                                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.1)' }
                                }}
                            />
                            <Button variant="contained" color="primary" sx={{ minWidth: 'auto', px: 3 }}>
                                <Send fontSize="small" />
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>

                <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', mt: 8, pt: 4, textAlign: 'center' }}>
                    <Typography variant="caption" sx={{ color: 'grey.600' }}>
                        © {new Date().getFullYear()} Stitch Architecture.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
