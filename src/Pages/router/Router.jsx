import React from 'react'
import Sidebar from '../../component/Sidebar/Sidebar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from '../Home/Home'
import Profile from '../Profile/profile'
import Story from '../Story/Story'
import Auth from '../Auth/Auth'
import EditProfileDetail from '../../component/EditAccount/EditProfileDetail'
import Explore from '../Explore/Explore'


const Router = () => {
  const location = useLocation();
  return (
    <div>
      {(location.pathname!=='/login' && location.pathname!=='/signup') && (
        <div className ="flex">
            <div className='w-[20%] border border-l-slate-500'>
               <Sidebar/>
            </div>
            <div className='w-full'>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/:username' element={<Profile />}></Route>
                <Route path='/story' element={<Story />}></Route>
                <Route path='/explore' element={<Explore />}></Route>
                <Route path='/comment/:postId' element={<Home />}></Route>
                <Route path='/account/edit' element={<EditProfileDetail />}></Route>
            </Routes>
            </div>
        </div>
        )}
        {(location.pathname==='/login' || location.pathname==='/signup') && (
          <div>
          <Routes>
            <Route path='/signup' element={<Auth />}></Route>
            <Route path='/login' element={<Auth />}></Route>
          </Routes>
        </div>
      )}
    </div>
  )
}

export default Router