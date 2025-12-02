import React from 'react'
import './Auth.css'
import SignIn from '../../component/Register/SignIn'
import SignUp from '../../component/Register/SignUp'
import { useLocation } from 'react-router-dom'

const Auth = () => {
  const location = useLocation();
  return (
    <div>
        <div className='flex items-center justify-center h-[100vh]'>
            <div>
                {/* <div className='h-[35.3rem] w-[23rem]'>
                    <img src='https://res.cloudinary.com/dnbw04gbs/image/upload/v1679494375/home-phones-2x-edited_glksxn.png' alt=''/>
                </div> */}
            </div>
            <div className='w-[23vw]'>
              {location.pathname==='/login'? <SignIn/> : <SignUp/>}
            </div>
        </div>
    </div>
  )
}

export default Auth