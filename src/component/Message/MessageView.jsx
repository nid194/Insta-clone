import {
  VStack,
  HStack,
  Input,
  Button,
  Avatar,
} from "@chakra-ui/react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useRef, useState } from "react";
import Chat from "./chat";
import { useNavigate } from "react-router-dom";

const MessageView = ({ selectedUser, currentUser }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);
  const navigate = useNavigate()

  const chatId = [currentUser.userId, selectedUser.userId].sort().join("_");

  // 🔥 Real-time messages
  useEffect(() => {
    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    });

    return () => unsubscribe();
  }, [chatId]);

  // 🔥 Send message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    if (
    !currentUser?.userId ||
    !currentUser?.username ||
    !selectedUser?.userId ||
    !selectedUser?.username
    ) {
     console.error("Missing user data", { currentUser, selectedUser });
     return;
    }

    // create chat doc if not exists
    await setDoc(
      doc(db, "chats", chatId),
      {
        participants:[String(currentUser.userId), String(selectedUser.userId)],
        usernames: [currentUser?.username, selectedUser?.username],
        lastMessage: message,
        lastMessageAt: serverTimestamp(),
      },
      { merge: true }
    );

    await addDoc(collection(db, "chats", chatId, "messages"), {
      text: message,
      senderId: currentUser.userId,
      senderUsername: currentUser.username,
      senderImage: currentUser.profileImg,
      createdAt: serverTimestamp(),
    });

    setMessage("");
  };

  const handleProfile = (username) =>{
     navigate(`/${username}`)
  }

  return (
    <VStack h="full" w="full">
      {/* Header */}
      <HStack w="full" p="3" borderBottom="1px solid #eee">
        <Avatar src={selectedUser.profileImg} />
        <Button onClick={() => handleProfile(selectedUser?.username)}>View Profile</Button>
      </HStack>

      {/* Messages */}



      <VStack h="full" w="full" overflowY="auto" px="3">
        {messages.map((msg) => (
          <Chat
            key={msg.id}
            text={msg.text}
            uri={msg.senderImage}
            user={msg.senderId === currentUser.userId ? "me" : "other"}
          />
        ))}
        <div ref={bottomRef} />
      </VStack>

      {/* Input */}
      <form onSubmit={sendMessage} style={{ width: "100%" }}>
        <HStack p="3">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Message @${selectedUser.username}`}
          />
          <Button type="submit" colorScheme="blue">
            Send
          </Button>
        </HStack>
      </form>
    </VStack>
  );
};

export default MessageView;
