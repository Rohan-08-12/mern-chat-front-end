import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import ChatArea from "../components/ChatArea";
import io from "socket.io-client";
import { useEffect, useState } from "react";
// const ENDPOINT=import.meta.env.API_URL;
const ENDPOINT='https://mern-chat-backend-79ix.onrender.com';

const Chat = () => {
  const [selectedGroup,setSelectedGroup]=useState(null);
  const [socket,setSocket]=useState(null);

  useEffect(()=>{
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || {});
    const newSocket = io(ENDPOINT, {
      auth: {user:userInfo}
    });
    setSocket(newSocket);
    return () => {
      if(newSocket){
        newSocket.disconnect();
      }
    };
  },[])

  return (
    <Flex h="100vh">
      <Box w="300px" borderRight="1px solid" borderColor="gray.200">
        <Sidebar setSelectedGroup={setSelectedGroup}  />
      </Box>
      <Box flex="1">
        {socket && <ChatArea socket={socket} selectedGroup={selectedGroup} />}
      </Box>
    </Flex>
  );
};

export default Chat;
