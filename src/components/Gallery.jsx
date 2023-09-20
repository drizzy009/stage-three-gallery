// src/components/Gallery.js

import  { useState, useEffect } from "react";
import ImageGrid from "./ImageGrid";
import { Image } from "./assets/gallery";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load images from the backend
  useEffect(() => {
    setImages(Image);
    setIsLoading(false);
  }, []);

  // Handle drag and drop events
  const { handleDragStart, handleDrop } = useDragAndDrop(images, setImages);

  return (
    <div className="gallery">
      <ImageGrid
        images={images}
        isLoading={isLoading}
        handleDragStart={handleDragStart}
        handleDrop={handleDrop}
      />
    </div>
  );
};

export default Gallery;
