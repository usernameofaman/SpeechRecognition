import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

export default function MenuListComposition({ userData, viewLoginModal, setViewLoginModal }) {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);



    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <Stack direction="row" spacing={2}>
            {userData.name ?
                <div style={{width:"100%", display:"flex", flexDirection:"column"}}>
                    <Button
                        ref={anchorRef}
                        sx={{ padding: 0 }}
                        id="composition-button"
                        aria-controls={open ? 'composition-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                    >
                        <form className="userprofile ms-0">
                            <div className="dropdown">
                                <button style={{ width: "100%", height: "40px" }} className="btn btn-warning dropdown-toggle d-flex align-items-center" type="button"
                                    id="userprofilemenu" data-bs-toggle="dropdown" aria-expanded="true">
                                    <AccountCircleRoundedIcon sx={{ mr: 1 }} />
                                    <span className="d-none d-md-flex" style={{ width: "95px" }}>{userData.name}</span>
                                </button>
                            </div>
                        </form>
                    </Button>
                    <div>{userData?.remainingSession >= 0 ? <span style={{ fontSize: '14px', paddingLeft: "10px" }} className="additional-text">Remaining Sessions : {userData?.remainingSession > 99 ? "99+" : userData?.remainingSession }</span> : ""}</div>
                    <Popper
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        placement="bottom-start"
                        transition
                        disablePortal
                        sx={{ zIndex: 1 }}
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin:
                                        placement === 'bottom-start' ? 'left top' : 'left bottom',
                                    marginLeft: "8px"
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList
                                            autoFocusItem={open}
                                            sx={{ width: "180px" }}
                                            id="composition-menu"
                                            aria-labelledby="composition-button"
                                            onKeyDown={handleListKeyDown}
                                        >
                                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                                            <MenuItem onClick={handleClose}>My account</MenuItem>
                                            <MenuItem onClick={() => {
                                                localStorage.clear();
                                                window.location.reload()
                                                handleClose()
                                            }}>Logout</MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </div> :
                <Button onClick={() => setViewLoginModal(true)}>
                    Login
                </Button>}
        </Stack>
    );
}