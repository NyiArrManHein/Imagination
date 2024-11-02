import { useState } from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";

export default function ImageUpload({ setImageFile }) {
  const [imagePreview, setImagePreview] = useState(null);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setImageFile(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <label
        htmlFor="image-upload"
        className="relative flex items-center justify-center w-96 h-56 bg-gray-200 border-2 border-dashed  border-gray-300 rounded-lg cursor-pointer overflow-hidden"
      >
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Uploaded"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center">
            <FaArrowAltCircleUp size={30} className="text-gray-400" />
            <span className="mt-2 text-gray-500">Upload Image</span>
          </div>
        )}
        {/* Hidden file input */}
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </label>
    </div>
  );
}
