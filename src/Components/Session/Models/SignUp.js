import React from 'react'
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
    Button,
    TextField,
    Typography,
    IconButton,
    Box,
} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';


export default function SignUp({
    password,
    setPassword,
    InputAdornment,
    setName,
    onClose,
    email,
    showPin,
    setEmail,
    handleToggleVisibility,
    signUp,
    loginState,
    setMobile,
    mobile,
    name
}) {
    return (
        <div
            style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "8px",
                maxWidth: "400px",
                width: "100%",
            }}
        >
            <Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex", justifyContent: "space-between" }}>
                <h3
                    style={{
                        color: "#1877f2",
                        textAlign: "center",
                        fontWeight: "500",
                        fontSize: "24px",
                    }}
                >
                    Sign Up
                </h3>
                <ClearIcon color="primary"
                    onClick={onClose} />
            </Box>
            {/* <CustomTabPanel value={value} index={0}> */}
            <Typography variant="h5" gutterBottom>
                <IconButton
                    style={{ position: "absolute", top: "10px", right: "10px" }}
                    onClick={onClose}
                ></IconButton>
            </Typography>

            <TextField
                label="Name"
                type="name"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <TextField sx={{ "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": { display: "none", }, "& input[type=number]": { MozAppearance: "textfield", }, }}
                label="Mobile"
                type="number"
                fullWidth
                margin="normal"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.toLowerCase())}
            />
            <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
            />
            <TextField
                sx={{ mb: 3 }}
                label="Password"
                type={showPin ? 'text' : 'password'}
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleToggleVisibility} edge="end">
                                {showPin ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="contained" color="primary" onClick={signUp} style={{ width: "100%", height: "50px", fontSize: "15px" }}>
                    Sign Up
                </Button>
            </div>

            <div style={{ color: "#1877f2", fontSize: "18px", fontWeight: "500", cursor: "pointer", textDecoration: "none", textAlign: "right" }} >
                <hr></hr>
                <div style={{ textAlign: "center" }} onClick={loginState}>
                    Sign In
                </div>
            </div>

        </div>
    )
}
