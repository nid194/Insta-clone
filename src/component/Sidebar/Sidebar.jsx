import React, { useState } from 'react'
import { IoReorderThreeOutline } from "react-icons/io5";
import { menu } from './sidebarConfig';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react'
import PostModal from '../Post/PostModal';
import SearchComp from '../SearchComponent/SearchComp';
import { useSelector } from 'react-redux';
import Reel from '../../component/ReelComponent/Reel'


const Sidebar = () => {
  
  const[activeTab,setActiveTab] = useState();
  const navigate = useNavigate();
  const {isOpen, onClose, onOpen} = useDisclosure()
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const {user} =useSelector((store)=>store)


  const handleTab = (title) =>{
   setActiveTab(title);
   if(title === "Profile") {
    navigate(`/${user.findUserProfile?.username}`);
   }
   else if(title === "Home"){
    navigate("/");
   }
   else if(title === "Notification"){
    
   }
   else if(title === "Create"){
       onOpen();
   }
   if (title === "Search") {
      setIsSearchOpen(true);
    } else {
      setIsSearchOpen(false);
    }
   if (title === "Explore"){
    navigate("/explore")
  }
} 

  return (
    <>
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-screen ${activeTab === "Search" ? "w-[70px]" : "w-[250px]"} bg-white shadow-md z-10`}>
        <div className={`flex flex-col justify-between h-full ${activeTab === "Search" ? "px-2":"px-10"}`}>
          {<div>
            {activeTab !== 'Search' && (
              <div className='pt-10'>
                <img width="w-40" src="https://i.imgur.com/zqpwkLQ.png/" alt="insta" />
              </div>
            )}
            <div className='mt-10'>
              {
                menu.map((item) => (
                  <div
                    key={item.title}
                    onClick={() => handleTab(item.title)}
                    className='flex items-center mb-5 cursor-pointer text-lg space-x-3'
                  >
                    {activeTab === item.title ? item.activeIcon : item.icon}
                    {activeTab !== "Search" && (
                      <p className={`${activeTab === item.title ? "font-bold" : "font-semibold"}`}>
                        {item.title}
                      </p>
                    )}
                  </div>
                ))
              }
            </div>
          </div>}

          <div className='flex items-center cursor-pointer pb-10'>
            <IoReorderThreeOutline className='text-2xl font-semibold' />
            {activeTab !== 'Search' && <p className='ml-5'>More</p>}
          </div>
        </div>
      </div>

      {/* Post modal */}
      <PostModal onClose={onClose} isOpen={isOpen} />

      {/* Reel modal */}
      <Reel onClose={onClose} isOpen={isOpen} />

      {/* Search component rendered to the right of sidebar */}
      {isSearchOpen && (
    <div
      className={`fixed top-0 z-20 h-screen bg-white transition-all duration-300 ${
      activeTab === "Search" ? "left-[70px] w-[calc(100%-70px)]" : "left-[250px] w-[calc(100%-250px)]"
    }`}
    >
    <SearchComp />
  </div>
)}

    </>
  );
};

export default Sidebar;