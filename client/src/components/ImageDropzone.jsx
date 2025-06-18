// components/ImageDropzone.jsx
import { useDropzone } from 'react-dropzone';
import { useRef, useEffect } from 'react';

export const ImageDropzone = ({ onImageSelect }) => {
  const inputRef = useRef(null);

  const { getInputProps, open } = useDropzone({
    accept: { 'image/*': [] },
    multiple: false,
    noClick: true,
    noDrag: true,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const previewUrl = URL.createObjectURL(file);
        onImageSelect(file, previewUrl);
      }
    },
  });

  useEffect(() => {
    // optional cleanup on unmount
    return () => {
      if (inputRef.current?.previewUrl) {
        URL.revokeObjectURL(inputRef.current.previewUrl);
      }
    };
  }, []);

  return (
    <>
      <input {...getInputProps()} ref={inputRef} />
      {/* use `open` outside to trigger it */}
    </>
  );
};
