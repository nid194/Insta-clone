import React, { useState } from 'react'
import StoryViewer from '../../component/StoryComponent/StoryViewer'
import { useDispatch, useSelector } from 'react-redux'
import { addStoryAction } from '../../component/Redux/Story/StoryAction'
import { FaPhotoVideo } from 'react-icons/fa'
import { uploadToCloudinary } from '../../config/uploadToCloudinary'
import { Modal,ModalBody, ModalCloseButton, ModalContent, ModalOverlay,Button } from '@chakra-ui/react'
import { GrEmoji } from "react-icons/gr"

const Story = ({isOpen, onClose}) => {

     const {story} = useSelector((store)=>store)
     const token = localStorage.getItem("authToken")
     const dispatch = useDispatch()
     const[file, setFile] = useState()
     const[caption, setCaption] = useState()
     const[imageUrl, setImageUrl] = useState("")
     const [setIsDragOver] = useState(false)
    
     const handleDrop = async (event) => {
      event.preventDefault();
      const dropFile = event.dataTransfer.file[0];

     if (dropFile.type.startsWith("image/")) {
       const url = await uploadToCloudinary(dropFile);
       setImageUrl(url);
       setFile(dropFile);
     }
   };

    const handleDragOver = (event) => {
     event.preventDefault();
     setIsDragOver(true);
    };

  const handleDragLeave = () => setIsDragOver(false);

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

    const handleStory = () => {
     if (!imageUrl) {
      alert("Please upload an image first");
      return;
     }

     dispatch(addStoryAction({
      token,
      story: { caption, img: imageUrl }
    }));
};

const stories = story.allStories || [];


  return (
    <div>
         <Modal size={"4xl"} onClose={onClose} isOpen={isOpen} isCentered>
                   <ModalOverlay />
                   <ModalContent>
                    <div className='flex justify-between py-1 px-10 items-center'>
                       <p>create new post</p>
                       <Button className='' variant="ghost" size="sm" colorschema={"blue"} onClick={handleStory}>
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
                                     <p>Drag videos/images here</p>
                                   </div>
                                  <label htmlFor='file-upload' className='custom-file-upload'>Select From Computer</label>
                                  <input className='fileInput' type='file' id='file-upload' accept='video/*' onChange={handleOnChange}/>
                                </div>
                            }
                            {file && (<video className='h-full object-cover' src={URL.createObjectURL(file)} controls />)}
                          </div>
                          <div className='w-[1px] border-2 h-full'>
                          </div>
                              <div className='w-[50%]'>
                                 <div className='flex items-center px-2'>
                                   <img className='w-7 h-7 rounded-full' src='https://cdn.pixabay.com/photo/2022/07/05/11/06/mountains-7302806_640.jpg' alt='right side'/>
                                   <p className='font-semibold ml-4'>{story.findStoryAction?.username}</p>
                                 </div>
                                 <div className='px-2'>
                                    <textarea onChange={handleCaptionChange} placeholder='write a caption' className='captionInput' name='caption' rows='8'></textarea>
                                 </div>
                                 <div className='flex justify-between px-2'>
                                    <GrEmoji/>
                                    <p className='opacity-70'>{caption?.length}/2,200</p>
                                 </div>
                                 <hr/>
                              <hr/>
                          </div>
                        </div>
                     </ModalBody>
                 </ModalContent>
            </Modal>

      {/* Show stories */}
      <StoryViewer stories={stories} />
    </div>
  );
};

export default Story
