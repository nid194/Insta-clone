
export const uploadToCloudinary = async (image)=>{

    if(!image){
        console.log("image not found")
    }
        const formData = new FormData()
        formData.append("file",image)
        formData.append("upload_preset","Instagram")
        // formData.append("cloud_name","dhvb9d8jk")
   

    const response = await fetch("https://api.cloudinary.com/v1_1/dhvb9d8jk/image/upload",{
        method:"POST",
        body:formData
    })

    const fileData = await response.json()

    console.log("file data",fileData)
    return fileData.secure_url || null;
}

export const uploadVideoToCloudinary = async (videoFile) => {
    if (!videoFile) {
        console.log("Video not found");
        return null;
    }

    const formData = new FormData();
    formData.append("file", videoFile);
    formData.append("upload_preset", "Instagram"); // your preset
    // formData.append("cloud_name", "dhvb9d8jk"); // optional

    const response = await fetch(
        "https://api.cloudinary.com/v1_1/dhvb9d8jk/video/upload", // notice 'video/upload'
        {
            method: "POST",
            body: formData,
        }
    );

    const fileData = await response.json();

    console.log("video uploaded:", fileData);
    return fileData.secure_url || null;
};