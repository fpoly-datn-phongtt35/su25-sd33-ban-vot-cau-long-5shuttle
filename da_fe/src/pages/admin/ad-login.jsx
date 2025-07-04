import {
    Box,
    Paper,
    TextField,
    InputAdornment,
    IconButton,
    Button
} from "@mui/material";
import React from "react";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LockOutlineIcon from '@mui/icons-material/LockOutlined';
import shuttlecockImg from '../../components/Assets/closeup-shuttlecock.jpg';

function AdLogin() {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => event.preventDefault();

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <Paper elevation={6} sx={{ width: 500, p: 5, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                    <img
                        src={shuttlecockImg}
                        alt="Logo đăng nhập"
                        style={{ height: 80 }}
                    />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 3 }}>
                    <AccountCircleOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField
                        fullWidth
                        label="Email"
                        variant="standard"
                    />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 4 }}>
                    <LockOutlineIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField
                        fullWidth
                        label="Mật khẩu"
                        variant="standard"
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </Box>

                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        borderRadius: 2,
                        py: 1,
                        backgroundColor: '#212121',
                        '&:hover': {
                            backgroundColor: '#212121',
                        },
                        '&:focus': { outline: 'none', boxShadow: 'none' },
                        '&:focus-visible': { outline: 'none', boxShadow: 'none' },

                    }}
                >
                    Đăng nhập
                </Button>
            </Paper>
        </Box>
    );
}

export default AdLogin;