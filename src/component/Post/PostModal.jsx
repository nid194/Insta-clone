import React, { useState } from 'react'
import { Modal,ModalBody, ModalCloseButton, ModalContent, ModalOverlay,Button } from '@chakra-ui/react';
import { FaPhotoVideo } from 'react-icons/fa';
import "./postModal.css"
import { GrEmoji } from "react-icons/gr";
import { GoLocation } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import { createPostAction } from '../Redux/Post/PostAction';
import { uploadToCloudinary } from '../../config/uploadToCloudinary';

const PostModal = ({onClose, isOpen}) => {

    const[isDragOver, setIsDragOver] = useState(false)
    const[file, setFile] = useState()
    const[caption, setCaption] = useState()
    const dispatch = useDispatch();
    const[imageUrl, setImageUrl] = useState("")
    const[location, setLocation] = useState("")
    const token = localStorage.getItem("authToken")
    const {user} = useSelector((store)=>store)

    const handleDrop = async (event) => {
        event.preventDefault()
        const dropFile = event.dataTransfer.file[0]
       
        if(dropFile.type.startsWith("image/")){
            setFile(dropFile)
        }
    }

    const handleDragOver = (event) =>{
         event.preventDefault();
         event.dataTransfer.dropEffect = "copy";
         setIsDragOver(true)
    }

    const handleDragLeave = () =>{
        setIsDragOver(false)
    }

    const handleOnChange = async (e) => {
        const file = e.target.files[0];
        if(file && (file.type.startsWith("image/"))){
            const uploadedUrl = await uploadToCloudinary(file)
            console.log("uploadedUrl:", uploadedUrl);
            setImageUrl(uploadedUrl)
            setFile(file)
            console.log("file:",file)
        }
        else{
            setFile(null)
            alert("please select an image")
        }
    }

    const handleCaptionChange = (e) =>{
        setCaption(e.target.value)
    }

    const handleaddedpost =() =>{
      if(imageUrl){
       const data={
        token:token,
        postData:{
          caption,location,imgUrl:imageUrl
        }
      }
       console.log("payload before dispatch:", data); 
        dispatch(createPostAction(data))
        onClose()
    }
  }



  return (
    <div>
         <Modal size={"4xl"} onClose={onClose} isOpen={isOpen} isCentered>
               <ModalOverlay />
               <ModalContent>
                <div className='flex justify-between py-1 px-10 items-center'>
                   <p>create new post</p>
                   <Button className='' variant="ghost" size="sm" colorschema={"blue"} onClick={handleaddedpost}>
                     Share
                   </Button>
                </div>
                <hr/>
                <ModalCloseButton/>
                 <ModalBody>
                    <div className='h-[70vh] justify-between pb-5 flex'>
                      <div className='w-[50%]'>
                        {
                          !file && <div onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave} className='drag-drop h-full'>
                               <div>
                                 <FaPhotoVideo className='text-3xl'/>
                                 <p>Drag photos here</p>
                               </div>
                              <label htmlFor='file-upload' className='custom-file-upload'>Select From Computer</label>
                              <input className='fileInput' type='file' id='file-upload' accept='image/*' onChange={handleOnChange}/>
                            </div>
                        }
                        {
                          file && <div className='h-full'> <img className='h-full' src={URL.createObjectURL(file)} alt=''/> </div>
                        }
                      </div>
                      <div className='w-[1px] border-2 h-full'>
                      </div>
                          <div className='w-[50%]'>
                             <div className='flex items-center px-2'>
                               <img className='w-7 h-7 rounded-full' src='https://cdn.pixabay.com/photo/2022/07/05/11/06/mountains-7302806_640.jpg' alt='right side'/>
                               <p className='font-semibold ml-4'>{user.findUserProfile?.username}</p>
                             </div>
                             <div className='px-2'>
                                <textarea onChange={handleCaptionChange} placeholder='write a caption' className='captionInput' name='caption' rows='8'></textarea>
                             </div>
                             <div className='flex justify-between px-2'>
                                <GrEmoji/>
                                <p className='opacity-70'>{caption?.length}/2,200</p>
                             </div>
                             <hr/>
                             <div className='p-2 flex justify-between items-center'>
                             <input onChange={(e)=>setLocation(e.target.value)} className='locationInput' type='text' placeholder='location' name='location'></input>
                             <GoLocation/>
                          </div>
                          <hr/>
                      </div>
                    </div>
                 </ModalBody>
             </ModalContent>
        </Modal>
    </div>
  )
}

export default PostModal