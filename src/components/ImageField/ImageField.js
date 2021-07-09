import React from "react";
import Compress from "browser-image-compression";
import Text from "../Text";

const ImageField = () => {
  const [image, setImage] = React.useState("");
  const [imagePreview, setImagePreview] = React.useState("");
  const [imagePreviewLoading, setimagePreviewLoading] = React.useState(false);

  const onFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadstart = () => {
      setimagePreviewLoading(true);
    };
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagePreview(reader.result);
      }
      reader.onloadend = () => {
        setimagePreviewLoading(false);
      };
    };
    if (file) {
      reader.readAsDataURL(event.target.files[0]);
    }

    const options = {
      maxSizeMB: 1.5,
      maxWidthOrHeight: 420,
      useWebWorker: true,
    };

    Compress(file, options)
      .then((compressedBlob) => {
        compressedBlob.lastModifiedDate = new Date();
        // Convert the blob to file
        const convertedBlobFile = new File([compressedBlob], file.name, {
          type: file.type,
          lastModified: Date.now(),
        });
        setImage(convertedBlobFile);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //   const onFileResize = (e) => {
  //     const file = e.target.files[0];
  //     Resizer.imageFileResizer(
  //       file, // the file from input
  //       480, // width
  //       480, // height
  //       "JPEG", // compress format WEBP, JPEG, PNG
  //       70, // quality
  //       0, // rotation
  //       (uri) => {
  //         console.log(uri);
  //         // You upload logic goes here
  //         setImage(uri);
  //       },
  //       "base64" // blob or base64 default base64
  //     );
  //   };

  return (
    <div className="space-y-2">
      <input
        type="file"
        className="file"
        name="myImage"
        onChange={onFileChange}
        // accept="image/*"
        id="input"
        style={{ display: "none" }}
      />

      <label
        htmlFor="input"
        className="w-full text-center inline-block p-2 border-2 border-dashed"
      >
        <Text>{imagePreview ? "Change Logo" : "Select company logo"}</Text>
      </label>
      <div className="relative">
        <img src={imagePreview} />
        {imagePreview !== "" && (
          <div
            className="absolute left-0 right-0 p-1.5 cursor-pointer bg-red-400 text-center"
            onClick={() => setImagePreview(null)}
          >
            <Text variant="white">Remove</Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageField;
