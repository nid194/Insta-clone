import React, { useState } from 'react'
import { IoReorderThreeOutline } from "react-icons/io5";
import { menu } from './sidebarConfig';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react'
import PostModal from '../Post/PostModal';
import SearchComp from '../SearchComponent/SearchComp';
import { useSelector } from 'react-redux';
import Reel from '../../component/ReelComponent/Reel'
import NotificationComp from '../NotificationComponent/NotificationComp';


const Sidebar = () => {
  
  const[activeTab,setActiveTab] = useState("Home");
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const {user} =useSelector((store)=>store)
  const [openCreateMenu, setOpenCreateMenu] = useState(false);


  const {
  isOpen: isPostOpen,
  onOpen: onPostOpen,
  onClose: onPostClose
 } = useDisclosure();

 const {
  isOpen: isReelOpen,
  onOpen: onReelOpen,
  onClose: onReelClose
 } = useDisclosure();

  const handleTab = (title) =>{
   setActiveTab(title);
   if(title === "Profile") {
    navigate(`/${user.findUserProfile?.username}`);
   }
   else if(title === "Home"){
    navigate("/");
   }
   else if(title === "Notification"){
    setActiveTab("Notification");
    setIsSearchOpen(false);
    navigate("/notifications")
   }
   else if (title === "Create") {
   setOpenCreateMenu(true);
   }
   if (title === "Search") {
      setIsSearchOpen(true);
    } else {
      setIsSearchOpen(false);
    }
   if (title === "Explore"){
    navigate("/explore")
  }
  if (title === "Reels"){
    navigate("/reel")
  }
  if (title === "Message"){
    navigate("/messages")
  }
} 

  return (
  <>
    {/* Sidebar / Notification column */}
    <div
      className={`fixed top-0 left-0 h-screen bg-white shadow-md z-10 transition-all duration-300 ${
        activeTab === "Notification" ? "w-[420px]" : "w-[250px]"
      }`}
    >
      <div className="flex flex-col justify-between h-full px-10">
        
        {/* MAIN CONTENT */}
        <div>
          {activeTab === "Notification" ? (
            <NotificationComp onClose={() => setActiveTab("Home")}/>
          ) : (
            <>
              {/* Logo */}
              <div className="pt-10">
                <img
                  className="w-40"
                  src="https://i.imgur.com/zqpwkLQ.png"
                  alt="insta"
                />
              </div>

              {/* Menu */}
              <div className="mt-10">
                {menu.map((item) => (
                  <div
                    key={item.title}
                    onClick={() => handleTab(item.title)}
                    className="flex items-center mb-5 cursor-pointer text-lg space-x-3"
                  >
                    {activeTab === item.title
                      ? item.activeIcon
                      : item.icon}
                    <p className="font-semibold">{item.title}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* FOOTER */}
        {activeTab !== "Notification" && (
          <div className="flex items-center cursor-pointer pb-10">
            <IoReorderThreeOutline className="text-2xl font-semibold" />
            <p className="ml-5">More</p>
          </div>
        )}
      </div>
    </div>

    {/* Post modal */}
    <PostModal isOpen={isPostOpen} onClose={onPostClose} />

    {/* Reel modal */}
    <Reel isOpen={isReelOpen} onClose={onReelClose} />

    {/* Search panel (unchanged) */}
    {isSearchOpen && (
      <div className="fixed top-0 left-[250px] z-20 h-screen w-[calc(100%-250px)] bg-white">
        <SearchComp />
      </div>
    )}

    {/* Create menu */}
    {openCreateMenu && (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-72 space-y-4">
          <button
            className="w-full p-3 bg-gray-100 rounded"
            onClick={() => {
              setOpenCreateMenu(false);
              onPostOpen();
            }}>
            Create Post (Image)
          </button>

          <button
            className="w-full p-3 bg-gray-100 rounded"
            onClick={() => {
              setOpenCreateMenu(false);
              onReelOpen();
            }}>
            Create Reel (Video)
          </button>

          <button
            className="w-full p-2 text-red-500"
            onClick={() => setOpenCreateMenu(false)}>
            Cancel
          </button>
        </div>
      </div>
    )}
  </>
 )
}

export default Sidebar