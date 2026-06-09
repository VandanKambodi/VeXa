import { Search } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.card || theme.bgLighter};
  border-right: 1px solid ${({ theme }) => theme.soft};
`

const TopBar = styled.div`
  height: 76px;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  display: flex;
  align-items: center;
  padding: 0 24px;
  background-color: transparent;
  
  @media (max-width: 800px) {
    height: 64px;
    padding: 0 16px;
  }
`

const Contacts = styled.div`
  flex: 1;
  overflow-y: auto;
  background-color: transparent;
  padding-bottom: 12px;

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

  @media (max-width: 800px) {
    padding: 10px 0;
  }
`

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  gap: 4px;
  flex: 1;
  min-width: 0; /* Important for text truncation inside flex */
`

const Name = styled.span`
  font-weight: 600;
  font-size: 15px;
  color: ${({ theme }) => theme.text};
  letter-spacing: -0.2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const SearchBarWrapper = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  
  @media (max-width: 800px) {
    padding: 12px 16px;
  }
`

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 44px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.bgDark || theme.soft + "33"};
  color: ${({ theme }) => theme.textSoft};
  border: 1.5px solid transparent;
  transition: all 0.2s ease;

  /* Focus state glow */
  &:focus-within {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary + "20"};
    background-color: transparent;
  }
`

const SearchInput = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
  margin-left: 12px;
  flex: 1;
  width: 100%;
  
  &::placeholder {
    color: ${({ theme }) => theme.textSoft};
    font-weight: 400;
  }
`

const ContactCard = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 24px;
  cursor: pointer;
  border-left: 3px solid transparent;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.soft + "40"};
    border-left: 3px solid ${({ theme }) => theme.primary};
  }

  @media (max-width: 800px) {
    padding: 14px 16px;
  }
`

const MessageContent = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.textSoft};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Time = styled.span`   
  font-size: 11px;
  font-weight: 500;
  color: ${({ theme }) => theme.textSoft};
  margin-left: auto;
  white-space: nowrap;
  padding-left: 12px;
`

const ChatContact = ({ showChat, setShowChat }) => {
  return (
    <Container>
      <TopBar>
        <Avatar sx={{ width: "42px", height: '42px', fontSize: "16px", fontWeight: "600" }} />
        <Profile>
          <Name>Messages</Name>
        </Profile>
      </TopBar>
      <SearchBarWrapper>
        <SearchBar>
          <Search sx={{ fontSize: "20px" }} />
          <SearchInput placeholder="Search messages..." />
        </SearchBar>
      </SearchBarWrapper>
      <Contacts>
        {/* I mapped a quick array just to clean up the repetitive code, logic remains exactly the same */}
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
          <ContactCard key={index} onClick={() => setShowChat(true)}>
            <Avatar sx={{ width: "46px", height: '46px' }} />
            <Profile>
              <Name>John Doe</Name>
              <MessageContent>Test message this is a very long message to show truncation</MessageContent>
            </Profile>
            <Time>12:21 PM</Time>
          </ContactCard>
        ))}
      </Contacts>
    </Container>
  )
}

export default ChatContact