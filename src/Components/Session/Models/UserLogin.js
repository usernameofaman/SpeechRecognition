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


export default function UserLogin({
    setPassword,
    InputAdornment,
    changeState,
    registerUser,
    onClose,
    email,
    signIn,
    showPin,
    password,
    setEmail,
    handleToggleVisibility
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
                    Sign In
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
            <div style={{ textAlign: "center" }}>
                <Button variant="contained" color="primary" onClick={signIn} style={{ width: "100%", height: "50px", fontSize: "15px" }}>
                    Sign In
                </Button>
            </div>

            <div style={{ color: "#1877f2", fontSize: "18px", fontWeight: "500", cursor: "pointer", textDecoration: "none", textAlign: "right" }} >
                <div onClick={changeState} style={{ marginTop: "20px", textAlign: "center" }}>
                    Login as Corporate Admin/Employee
                </div>
                <hr></hr>

                <div style={{ textAlign: "center" }} onClick={registerUser}>
                    Register
                </div>
            </div>
        </div>
    )
}
