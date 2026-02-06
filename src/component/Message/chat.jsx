import { Avatar, HStack, Text } from '@chakra-ui/react'
import React from 'react'

const Chat = ({ text, uri, user="other" }) => {
  return (
    <HStack
    alignSelf={user === "me" ? "flex-end" : "flex-start"}
    bg="gray.100"
    borderRadius="lg"
    px="3"
    py="2"
    maxW="70%"
  >
    {user === "other" && <Avatar src={uri} size="sm" />}
    <Text>{text}</Text>
    {user === "me" && <Avatar src={uri} size="sm" />}
  </HStack>
  )
}

export default Chat