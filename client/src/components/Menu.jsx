import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import { Link } from "react-router-dom";
import {
  Add,
  Dashboard,
  CloseRounded,
  Groups2Rounded,
  HubRounded,
  Logout,
  StreamRounded,
  WorkspacesRounded,
  Public,
  AccountTreeRounded,
  DashboardRounded,
  AddTaskRounded,
} from "@mui/icons-material";
import { tagColors } from "../data/data";
import LogoIcon from "../Images/Logo.svg";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { openSnackbar } from "../redux/snackbarSlice";
import axios from "axios";
import { useSelector } from "react-redux";
import { getUsers, notifications } from "../api/index";
import { useNavigate } from 'react-router-dom';
import { Avatar, CircularProgress } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

const Container = styled.div`
  flex: 1.3;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 100vh;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: sticky;
  top: 0;
  box-shadow: 4px 0 24px 0 rgba(0, 0, 0, 0.05);
  transition: 0.3s ease-in-out;
  
  @media (max-width: 1100px) {
    position: fixed;
    z-index: 100;
    width: 100%;
    max-width: 260px;
    left: ${({ setMenuOpen }) => (setMenuOpen ? "0" : "-100%")};
    transition: 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
`;

const ContainerWrapper = styled.div`
  height: calc(100% - 80px); /* Adjusting for the header space */
  overflow-y: auto;
  margin-top: 0px;
  padding-bottom: 20px;

  /* Custom Sleek Scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.soft};
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => theme.textSoft};
  }
`;

const Space = styled.div`
  height: 50px;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 28px;
`;

const Logo = styled.div`
  color: ${({ theme }) => theme.primary || theme.text};
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  font-size: 24px;
  letter-spacing: -0.5px;
`;

const Close = styled.div`
  display: none;
  cursor: pointer;
  color: ${({ theme }) => theme.textSoft};
  transition: color 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.text};
  }

  @media (max-width: 1100px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Item = styled.div`
  display: flex;
  color: ${({ theme }) => theme.itemText};
  align-items: center;
  gap: 16px;
  cursor: pointer;
  padding: 10px 16px;
  margin: 4px 16px;
  border-radius: 10px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.itemHover};
    color: ${({ theme }) => theme.text};
    transform: translateX(4px); /* Subtle slide effect on hover */
  }

  /* Target Material Icons inside Item */
  svg {
    font-size: 22px;
    color: ${({ theme }) => theme.textSoft};
    transition: color 0.2s ease;
  }

  &:hover svg {
    color: ${({ theme }) => theme.primary || theme.text};
  }
`;

const Hr = styled.hr`
  margin: 16px 24px;
  border: 0.5px solid ${({ theme }) => theme.soft};
  opacity: 0.6;
`;

const Title = styled.h2`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: ${({ theme }) => theme.textSoft};
  margin-bottom: 8px;
  margin-top: 16px;
  padding: 0px 28px;
  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    font-size: 16px;
  }
`;

const TeamIcon = styled(WorkspacesRounded)`
  color: ${({ tagColor }) => tagColor};
  font-size: 20px !important;
`;

const Menu = ({ darkMode, setDarkMode, setMenuOpen, setNewTeam }) => {
  const [teamsLoading, setTeamsLoading] = useState(true);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    dispatch(logout());
    navigate(`/`);
  };

  const [team, setTeams] = useState([]);
  const { currentUser } = useSelector(state => state.user);

  const getteams = async () => {
    setTeamsLoading(true);
    await getUsers(token)
      .then((res) => {
        setTeams(res.data.teams);
        setTeamsLoading(false);
      })
      .catch((err) => {
        dispatch(openSnackbar({ message: err.message, type: "error" }));
        if (err.response.status === 401 || err.response.status === 402) logoutUser();
      });
  };

  useEffect(() => {
    getteams();
  }, [currentUser]);

  return (
    <Container setMenuOpen={setMenuOpen}>
      <Flex>
        <Link to="/" style={{ textDecoration: "none", color: "inherit", alignItems: 'center', display: 'flex' }}>
          <Logo>
            <img src={LogoIcon} alt="Vexa Logo" width={24} height={24} />
            VEXA
          </Logo>
        </Link>
        <Close>
          <CloseRounded onClick={() => setMenuOpen(false)} />
        </Close>
      </Flex>
      <ContainerWrapper>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <DashboardRounded />
            Dashboard
          </Item>
        </Link>
        <Link
          to="projects"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <AccountTreeRounded />
            Projects
          </Item>
        </Link>
        <Link
          to="works"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <AddTaskRounded />
            Your Works
          </Item>
        </Link>
        <Link
          to="community"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <Public />
            Community
          </Item>
        </Link>
        
        <Hr />
        
        <Title>
          <Groups2Rounded /> Teams
        </Title>
        
        {teamsLoading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '24px 0px' }}>
            <CircularProgress size='28px' thickness={4} sx={{ color: 'text.secondary' }} />
          </div>
        ) : (
          <>
            {team.map((team, i) => (
              <Link
                key={team._id} /* Added key for React map best practices */
                to={`/teams/${team._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Item>
                  {team.img !== "" ?
                    <Avatar sx={{ width: "26px", height: "26px", fontSize: "12px", fontWeight: "bold" }} src={team.img}>
                      {team.name[0]}
                    </Avatar> :
                    <TeamIcon tagColor={tagColors[i]} />
                  }
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {team.name}
                  </span>
                </Item>
              </Link>
            ))}
          </>
        )}
        <Item onClick={() => setNewTeam(true)}>
          <Add />
          New Team
        </Item>
        
        <Hr />
        
        <Item onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          {darkMode ? "Light" : "Dark"} Mode
        </Item>
        <Item onClick={() => logoutUser()}>
          <Logout />
          Logout
        </Item>
        <Space />
      </ContainerWrapper>
    </Container>
  );
};

export default Menu;