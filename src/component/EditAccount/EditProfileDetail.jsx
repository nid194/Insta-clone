import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { useToast, useDisclosure } from "@chakra-ui/react";
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import ChangeProfileModal from "./ChangeProfileModal";
import { updateUserAction } from "../Redux/User/UserAction";
import { uploadToCloudinary } from '../../config/uploadToCloudinary';

const EditProfileDetail = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { user } = useSelector((store) => store);
  const token = localStorage.getItem("authToken");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [picFile, setPicFile] = useState(null);
  const [isOn, setIsOn] = useState(false);

  // Formik setup
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: user.findUserProfile?.name || "",
      username: user.findUserProfile?.username || "",
      bio: user.findUserProfile?.bio || "",
      gender: user.findUserProfile?.gender || "",
      website: user.findUserProfile?.website || "",
      private: false,
    },
    onSubmit: (values) => {
      if (!token) {
        toast({
          title: "Token missing. Please login again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const body = {
        userId: user.findUserProfile?.userId,
        ...values,
        profileImg: picFile || user.profileImg,
      };

      dispatch(updateUserAction({ token, body }))
        .then(() => {
          toast({
            title: "Profile updated successfully.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        })
        .catch(() => {
          toast({
            title: "Failed to update profile.",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        });
    },
  });

  // Handle profile picture change
  const handleProfilePictureChange = async (file) => {
    if (!file) return;
    const uploadedUrl = await uploadToCloudinary(file);
    setPicFile(uploadedUrl); // store local URL for preview
    const data = {
    token,
    data: {
      ...formik.values, // name, username, etc.
      userId: user.findUserProfile?.userId,
      profileImg: uploadedUrl, // ✅ the Cloudinary URL
    },
  };

  // 3️⃣ Dispatch update to backend
    dispatch(updateUserAction(data));
    onClose();
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <p className="font-bold text-[20px] text-left ml-[5%] mt-[5%] mb-3">
          Edit profile
        </p>

        {/* Profile Picture */}
        <div className="flex items-center justify-between gap-50 border border-gray-300 rounded-lg p-2 mx-20">
          <img
            className="w-[40px] h-[40px] rounded-full"
            src={user.findUserProfile?.profileImg || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"}
            alt="user pic"/>
          <button
            type="button"
            className="bg-purple-600 text-white px-2 py-1 rounded-md hover:bg-purple-700 transition"
            onClick={onOpen}>
            Change Profile
          </button>
        </div>

        {/* Website */}
        <div>
          <p className="font-bold text-[20px] text-left ml-[5%] mt-5 mb-2">Website</p>
          <input
            className="border border-gray-300 rounded-md h-12 w-[90%]"
            type="text"
            name="website"
            placeholder="website"
            value={formik.values.website}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <p className="font-small text-left ml-20">
            Editing links is only available on mobile. Visit the app to change websites in your bio.
          </p>
        </div>

        {/* Bio */}
        <div>
          <p className="font-bold text-[20px] text-left ml-[5%] mt-5 mb-2">Bio</p>
          <input
            className="border border-gray-300 rounded-md h-12 w-[90%]"
            type="text"
            name="bio"
            placeholder="bio"
            value={formik.values.bio}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

        {/* Gender */}
        <div>
          <p className="font-bold text-[20px] text-left ml-[5%] mt-5 mb-2">Gender</p>
          <select
            className="border border-gray-300 rounded-md h-12 w-[90%] px-3 bg-white"
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
          >
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <p className="text-xs text-left ml-20">This won't be part of your public profile.</p>
        </div>

        {/* Account Suggestion Toggle */}
        <p className="font-bold text-[20px] text-left ml-[5%] mt-5 mb-2">Show Account Suggestion On Profile</p>
        <div className="flex mt-5 justify-center">
          <div className="border border-gray-300 rounded-md w-[90%] mx-20 p-4 flex justify-between items-start">
            <div className="text-left">
              <span className="font-semibold">Show Account Suggestion On Profile</span>
              <span className="block mt-2 text-gray-600">
                Choose whether people can see similar account suggestions on your profile.
              </span>
            </div>
            <button type="button" className="ml-4" onClick={() => setIsOn(!isOn)}>
              {isOn ? <MdToggleOn size={40} color="green" /> : <MdToggleOff size={40} color="gray" />}
            </button>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end items-center p-4 mr-20">
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition">
            Submit
          </button>
        </div>
      </form>

      {/* Change Profile Modal */}
      <ChangeProfileModal
        handleProfilePictureChange={handleProfilePictureChange}
        isOpen={isOpen}
        onClose={onClose}
      />
    </div>
  );
};

export default EditProfileDetail;
