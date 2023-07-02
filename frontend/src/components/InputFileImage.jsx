import { useState } from "react";
import { MdOutlinePhotoCamera } from "react-icons/md";

const InputFileImage = ({ imageUrl }) => {
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <div>
      <label htmlFor="selectImage">
        {" "}
        {previewImage ? (
          <div className="flex justify-center py-2">
            <img
              src={previewImage}
              alt="Preview"
              className="w-[100px] h-[100px] rounded-full cursor-pointer hover:-z-10 z-10"
            />
            <div className="w-[100px] h-[100px] bg-black absolute cursor-pointer flex hover:z-10 bg-opacity-40 rounded-full justify-center items-center">
              <MdOutlinePhotoCamera className="scale-150 text-blue-700" />
            </div>
          </div>
        ) : (
          <div className="flex justify-center py-2">
            <img
              src={imageUrl}
              alt="Preview"
              className="w-[100px] h-[100px] rounded-full cursor-pointer hover:-z-10 z-10"
            />
            <div className="w-[100px] h-[100px] bg-black absolute cursor-pointer flex hover:z-10 bg-opacity-40 rounded-full justify-center items-center">
              <MdOutlinePhotoCamera className="scale-150 text-blue-700" />
            </div>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          id="selectImage"
          name="selectImage"
          className="hidden"
        />
      </label>
    </div>
  );
};

export default InputFileImage;
