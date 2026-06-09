import { ArrowBack, AttachFile, DoneAll, Send, Telegram } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card || theme.bgLighter};
  position: relative;
`

const TopBar = styled.div`
  height: 76px;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  display: flex;
  align-items: center;
  padding: 0px 24px;
  background-color: transparent;
  z-index: 10;
  
  @media (max-width: 800px) {
    height: 64px;
    padding: 0px 16px 0px 8px;
  }
`

const Chat = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  background-color: ${({ theme }) => theme.chat_background || theme.bg};
  display: flex;
  flex-direction: column;

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
    padding: 16px 12px;
    padding-bottom: 90px; /* Space for fixed bottom bar */
  }
`

/* Modern Bubbles - Removed the pseudo-element tails for a sleek rounded look */
const RecievedMessage = styled.p`
  margin: 8px 0 0 0;
  padding: 12px 18px;
  background-color: ${({ theme }) => theme.recieve_message || theme.soft + "40"};
  border-radius: 18px 18px 18px 4px; /* Asymmetrical modern chat bubble */
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  line-height: 1.5;
  max-width: 70%;
  width: fit-content;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  align-self: flex-start;
`

const SentMessage = styled.p`
  margin: 8px 0 0 0;
  padding: 12px 18px;
  background-color: ${({ theme }) => theme.send_message || theme.primary};
  border-radius: 18px 18px 4px 18px; /* Asymmetrical modern chat bubble */
  color: ${({ theme }) => theme.send_message_text_color || "#ffffff"};
  font-size: 14px;
  line-height: 1.5;
  max-width: 70%;
  width: fit-content;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  align-self: flex-end;
`

const Time = styled.span`
  font-size: 11px;
  font-weight: 500;
  padding: 6px 4px 16px 4px;
  color: ${({ theme }) => theme.textSoft};
  display: flex;
  align-items: center;
  gap: 6px;
  align-self: flex-end;

  ${({ message }) => message === 'recieved' && `
    align-self: flex-start;
  `}
`

const SendMessage = styled.div`
  min-height: 80px;
  border-top: 1px solid ${({ theme }) => theme.soft};
  display: flex;
  align-items: center;
  padding: 0 24px;
  gap: 12px;
  background-color: ${({ theme }) => theme.card || theme.bgLighter};
  
  @media (max-width: 800px) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    padding: 10px 12px;
    min-height: 64px;
  }
`

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  gap: 2px;
`

const Name = styled.span`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.text};
`

const Status = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #10B981; /* Premium Green for online status */
  display: flex;
  align-items: center;
  gap: 4px;

  /* Little dot indicator */
  &:before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    background-color: #10B981;
    border-radius: 50%;
  }
`

const MessageBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: ${({ theme }) => theme.bgDark || theme.bg};
  border-radius: 100px; /* Pill Shape */
  padding: 8px 8px 8px 20px;
  border: 1.5px solid transparent;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary + "20"};
  }
`

const MessageInput = styled.input`
  border: none;
  flex: 1;
  height: 36px;
  width: 100%;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  font-size: 15px;
  
  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.textSoft};
  }
`

const SendButton = styled(IconButton)`
  background-color: ${({ theme }) => theme.primary} !important;
  color: #ffffff !important;
  width: 40px;
  height: 40px;
  transition: all 0.2s ease !important;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px ${({ theme }) => theme.primary + "50"};
  }
`

const ChatContainer = ({ showChat, setShowChat }) => {
  //get the window size and hide the chat container for mobile and dislay it for desktop
  const [width, setWidth] = React.useState(window.innerWidth)
  const breakpoint = 768

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleWindowResize)
    return () => window.removeEventListener("resize", handleWindowResize)
  }, [])

  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(scrollToBottom);

  return (
    <Container>
      <TopBar>
        {width < breakpoint &&
          <IconButton style={{ color: 'inherit', marginRight: '4px' }} onClick={() => setShowChat(false)}>
            <ArrowBack sx={{ width: "24px", height: '24px' }} />
          </IconButton>}
        <Avatar sx={{ width: "42px", height: '42px', fontSize: "16px", fontWeight: "600" }} />
        <Profile>
          <Name>John Doe</Name>
          <Status>Online</Status>
        </Profile>
      </TopBar>
      <Chat>
        <RecievedMessage>hola fghtdfhhhhhhhhhhhhhhhh trw twr twrtrw44t rwerewty rewyetryetyetyetryery ertyetyertyertyetry e5ty5et444444444444y  5y54ey5yy  y53y5e4ye45</RecievedMessage>
        <Time message="recieved">Today at 12:40 PM</Time>
        
        <SentMessage>hola fghtdfhhhhhhhhhhhhhhhh trw twr twrtrw44t rwerewty rewyetryetyetyetryery ertyetyertyertyetry e5ty5et444444444444y  5y54ey5yy  y53y5e4ye45</SentMessage>
        <Time message="sent">Today at 12:40 PM <DoneAll sx={{ width: '16px', height: '16px', color: '#3B82F6' }} /></Time>
        
        <RecievedMessage>hola fghtdfhhhhhhhhhhhhhhhh trw twr twrtrw44t rwerewty rewyetryetyetyetryery ertyetyertyertyetry e5ty5et444444444444y  5y54ey5yy  y53y5e4ye45</RecievedMessage>
        <Time message="recieved">Today at 12:41 PM</Time>
        
        <SentMessage>hola fghtdfhhhhhhhhhhhhhhhh trw twr twrtrw44t rwerewty rewyetryetyetyetryery ertyetyertyertyetry e5ty5et444444444444y  5y54ey5yy  y53y5e4ye45</SentMessage>
        <Time message="sent">Today at 12:42 PM <DoneAll sx={{ width: '16px', height: '16px', color: '#3B82F6' }} /></Time>

        <div ref={messagesEndRef} />
      </Chat>
      <SendMessage>
        <IconButton sx={{ color: 'text.secondary' }}>
          <AttachFile sx={{ height: '24px', width: '24px' }} />
        </IconButton>
        <MessageBox>
          <MessageInput placeholder="Type a message..." />
          <SendButton size="small">
            <Telegram sx={{ height: '22px', width: '22px', marginLeft: '-2px' }} />
          </SendButton>
        </MessageBox>
      </SendMessage>
    </Container>
  )
}

export default ChatContainer