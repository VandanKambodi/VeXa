import { Avatar, Popover } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";

const Wrapper = styled.div`
  width: 100%;
  min-width: 320px;
  max-width: 400px;
  max-height: 480px; /* Changed from fixed height to max-height */
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: ${({ theme }) => theme.bgLighter || theme.card};
  overflow-y: auto;

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

const Heading = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  padding: 16px 20px;
  margin: 0;
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter || theme.card};
  z-index: 10;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
`;

const Item = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px 20px 0px 20px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.itemHover || theme.soft + "33"};
  }
`;

const Details = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-bottom: 16px; /* Moved padding here to wrap the Hr properly */
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  text-transform: capitalize;
`;

const Desc = styled.div`
  font-size: 13px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  line-height: 1.4;
`;

const Hr = styled.hr`
  background-color: ${({ theme }) => theme.soft};
  border: none;
  width: 100%;
  height: 1px;
  margin: 12px 0px 0px 0px;
  opacity: 0.6;
`;

const NotificationDialog = ({
  open,
  id,
  anchorEl,
  handleClose,
  currentUser,
  notification,
}) => {
  return (
    <Popover
      anchorReference="anchorPosition"
      open={open}
      onClose={handleClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      anchorPosition={{ top: 60, left: 1800 }}
      // Injecting modern UI curves and shadows directly into the Popover Paper
      PaperProps={{
        sx: {
          borderRadius: "12px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
          backgroundImage: "none",
        }
      }}
    >
      <Wrapper>
        <Heading>Notifications</Heading>

        {notification.map((item, index) => (
          <Item key={index}> {/* Added key to prevent React console warnings */}
            <Avatar
              sx={{ 
                width: "36px", 
                height: "36px", 
                fontSize: "14px", 
                fontWeight: "600" 
              }}
              src={currentUser.img}
            >
              {currentUser.name.charAt(0)}
            </Avatar>
            <Details>
              <Title>{item.type} invitation</Title>
              <Desc>{item.message}</Desc>
              <Hr />
            </Details>
          </Item>
        ))}
      </Wrapper>
    </Popover>
  );
};

export default NotificationDialog;