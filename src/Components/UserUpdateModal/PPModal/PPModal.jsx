import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Slider } from "@mui/material";
import { MdUpload } from "react-icons/md";
import { FaCheck, FaTimes } from "react-icons/fa";
import { getCroppedImg } from "../../../utils";

const PPModal = ({ onImageCropped }) => {
  const [imageSrc, setImageSrc] = useState(null); // original image preview
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null); // final cropped preview

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // when user picks file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageSrc(URL.createObjectURL(file));
    }
  };

  // finalize cropping
  const handleCropSave = async () => {
    try {
      const { file, url } = await getCroppedImg(imageSrc, croppedAreaPixels);
      setCroppedImage(url); // preview
      if (onImageCropped) {
        onImageCropped(file, url); // send cropped file and url to parent
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full my-10 ">
      {/* Upload Box */}
      {!imageSrc && (
        <label className="w-full max-w-md h-52 flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <MdUpload className="text-5xl text-gray-500 mb-3" />
          <p className="text-gray-600 font-medium">
            Click to upload or drag & drop
          </p>
          <p className="text-sm text-gray-400">PNG, JPG (max 5MB)</p>
        </label>
      )}

      {/* Cropper */}
      {imageSrc && (
        <div className="flex flex-col items-center gap-4 w-full p-5">
          <div className="relative w-[500px] h-[500px] rounded-lg overflow-hidden shadow-md">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>

          {/* Zoom Control */}
          <div className="w-72">
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              onChange={(e, newZoom) => setZoom(newZoom)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => setImageSrc(null)}
              className="flex items-center gap-2 px-6 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              <FaTimes /> Cancel
            </button>

            <button
              type="button"
              onClick={handleCropSave}
              className="flex items-center gap-2 px-6 py-2 bg-[#3C8F63] text-white rounded-lg hover:bg-green-700 transition"
            >
              <FaCheck /> Save
            </button>
          </div>

          {/* Cropped preview */}
          {croppedImage && (
            <div className="flex flex-col items-center border-2 border-[#3C8F63] rounded-lg py-5 w-full">
              <img
                src={croppedImage}
                alt="Cropped"
                className="w-80 h-80 p-1 rounded-full shadow border-2 border-[#3C8F63]"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PPModal;
