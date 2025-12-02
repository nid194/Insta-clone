import React,{ useState } from 'react'
import { Modal,ModalBody, ModalCloseButton, ModalContent, ModalOverlay,Button } from '@chakra-ui/react';
import { uploadToCloudinary } from '../../config/uploadToCloudinary';
import { FaPhotoVideo } from 'react-icons/fa';

const ChangeProfileModal = ({isOpen, onClose, handleProfilePictureChange}) => {
    
    const[file, setFile] = useState()
    const[isDragOver, setIsDragOver] = useState(false)

    const handleDrop = async (event) => {
            event.preventDefault()
            const dropFile = event.dataTransfer.files[0]
           
            if(dropFile.type.startsWith("image/") || dropFile.type.startsWith("video/")){
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
            if(file && (file.type.startsWith("image/") || file.type.startsWith("video/"))){
                const uploadedUrl = await uploadToCloudinary(file)
                console.log("uploadedUrl:", uploadedUrl);
                setFile(file)
                handleProfilePictureChange(uploadedUrl);
                console.log("file:",file)
            }
            
            else{
                setFile(null)
                alert("please select an image/video")
            }
        }

  return (
    <div>
        <Modal size={"4xl"} onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
                <ModalContent>
                    <div className='flex justify-between py-1 px-10 items-center'>
                        <p>change Profile</p>
                        <Button className='' variant="ghost" size="sm" colorschema={"blue"}>
                         Send
                        </Button>
                    </div>
                    <hr/>
                    <ModalCloseButton/>
                        <ModalBody>
                            <div className='w-[50%]'>
                                {
                                  !file && <div onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave} className='drag-drop h-full'>
                                       <div>
                                         <FaPhotoVideo className='text-3xl'/>
                                         <p>Drag photos and videos here</p>
                                       </div>
                                      <label htmlFor='file-upload' className='custom-file-upload'>Select From Computer</label>
                                      <input className='fileInput' type='file' id='file-upload' accept='image/*, video/*' onChange={handleOnChange}/>
                                    </div>
                                }
                                {
                                  file && <div className='h-full'> <img className='h-full' src={URL.createObjectURL(file)} alt=''/> </div>
                                }
                            </div>

                        </ModalBody>
                </ModalContent>
             </Modal>
    </div>
  )
}

export default ChangeProfileModal