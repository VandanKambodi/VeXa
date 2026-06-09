import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import { Forum, NotificationsRounded } from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import { useDispatch } from "react-redux";
import Avatar from "@mui/material/Avatar";
import AccountDialog from "./AccountDialog";
import NotificationDialog from "./NotificationDialog";
import { getUsers, notifications } from "../api/index";
import { openSnackbar } from "../redux/snackbarSlice";
import { logout } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  position: sticky;
  top: 0;
  height: 64px;
  margin: 8px 16px 0px 16px;
  border-radius: 12px;
  z-index: 99;
  box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.04);
  background-color: ${({ theme }) => theme.bgLighter};
  transition: all 0.3s ease;

  /* Glassmorphism Effect */
  @supports (backdrop-filter: blur(10px)) {
    background-color: ${({ theme }) => theme.bgLighter + "E6"}; /* 90% opacity */
    backdrop-filter: blur(10px);
  }

  @media screen and (max-width: 480px) {
    margin: 0px;
    border-radius: 0px;
    height: 60px;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between; /* Improved from flex-end to handle left/right spacing naturally */
  padding: 0px 24px;
  position: relative;

  @media screen and (max-width: 480px) {
    padding: 0px 12px;
  }
`;

const IcoButton = styled(IconButton)`
  color: ${({ theme }) => theme.textSoft} !important;
  transition: all 0.2s ease !important;
  
  &:hover {
    color: ${({ theme }) => theme.text} !important;
    background-color: ${({ theme }) => theme.bgDark} !important;
  }
`;

const Search = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 40%;
  max-width: 450px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 100px;
  color: ${({ theme }) => theme.textSoft};
  background-color: ${({ theme }) => theme.bgDark};
  border: 1px solid transparent;
  transition: all 0.2s ease-in-out;

  /* Highlights the entire search container when input is focused */
  &:focus-within {
    border: 1px solid ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary + "26"};
    background-color: transparent;
  }

  @media screen and (max-width: 768px) {
    width: 45%;
    position: relative;
    left: 0;
    transform: none;
    margin: 0 16px;
  }
  @media screen and (max-width: 480px) {
    width: 55%;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  font-size: 15px;
  padding: 0px 24px;
  border-radius: 100px;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
  
  &::placeholder {
    color: ${({ theme }) => theme.textSoft};
    font-weight: 400;
  }
`;

const Button = styled.button`
  padding: 8px 20px;
  background-color: transparent;
  border: 1.5px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  border-radius: 100px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.bg}; /* Ensure text pops against primary color */
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.primary + "40"};
  }

  &:active {
    transform: translateY(0);
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-weight: 500;
  font-size: 18px;
  color: ${({ theme }) => theme.text};

  @media (max-width: 800px) {
    gap: 8px;
  }
`;

const Navbar = ({ menuOpen, setMenuOpen }) => {
  const [SignUpOpen, setSignUpOpen] = useState(false);
  const [SignInOpen, setSignInOpen] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [notification, setNotification] = useState([]);

  useEffect(() => {
    getUsers(token).then((res) => {
      setUsers(res.data);
    }).catch((err) => {
      if (err.response.status === 401) {
        dispatch(logout())
      }
    });
  }, [dispatch]);

  const getNotifications = async () => {
    try {
      notifications(token).then((res) => {
        setNotification(res.data);
        console.log(notification);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  useEffect(() => {
    if (!currentUser && !SignUpOpen) {
      setSignInOpen(true);
      setSignUpOpen(false);
    } else if (!currentUser && SignUpOpen) {
      setSignInOpen(false);
      setSignUpOpen(true);
    }
    console.log(currentUser);
    if (currentUser && !currentUser.verified) {
      setVerifyEmail(true);
    } else {
      setVerifyEmail(false);
    }
  }, [currentUser, SignInOpen, SignUpOpen, setVerifyEmail, users]);

  //Open the account dialog
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //Open the notification dialog
  const [anchorEl2, setAnchorEl2] = useState(null);
  const open2 = Boolean(anchorEl2);
  const id2 = open2 ? "simple-popover" : undefined;
  const notificationClick = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const notificationClose = () => {
    setAnchorEl2(null);
  };

  return (
    <>
      <Container>
        <Wrapper>
          <IcoButton onClick={() => setMenuOpen(!menuOpen)}>
            <MenuIcon />
          </IcoButton>
          
          <Search>
            <Input placeholder="Search" />
            <SearchIcon style={{ marginRight: "16px", color: "inherit" }} />
          </Search>
          
          <User>
            {currentUser ? (
              <>
                <IcoButton aria-describedby={id} onClick={() => navigate('/chats')}>
                  <Badge color="primary">
                    <Forum />
                  </Badge>
                </IcoButton>
                <IcoButton aria-describedby={id} onClick={notificationClick}>
                  <Badge badgeContent={notification.length} color="primary">
                    <NotificationsRounded />
                  </Badge>
                </IcoButton>
                <IcoButton aria-describedby={id} onClick={handleClick}>
                  <Badge
                    badgeContent="    "
                    color="success"
                    variant="dot"
                    overlap="circular"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                  >
                    <Avatar
                      src={currentUser.img}
                      alt={currentUser.name}
                      sx={{ width: 36, height: 36, fontSize: "16px", fontWeight: "600" }}
                    >
                      {currentUser.name.charAt(0)}
                    </Avatar>
                  </Badge>
                </IcoButton>
              </>
            ) : (
              <Button onClick={() => setSignInOpen(true)}>
                <AccountCircleOutlinedIcon /> Sign In
              </Button>
            )}
          </User>
        </Wrapper>
      </Container>
      
      {currentUser && (
        <AccountDialog
          open={open}
          anchorEl={anchorEl}
          id={id}
          handleClose={handleClose}
          currentUser={currentUser}
        />
      )}
      
      {currentUser && (
        <NotificationDialog
          open={open2}
          anchorEl={anchorEl2}
          id={id2}
          handleClose={notificationClose}
          currentUser={currentUser}
          notification={notification}
        />
      )}
    </>
  );
};

export default Navbar;