import { useEffect, useState } from 'react';

function DisplayImage({imageType,imageName }) {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // Assuming your images are stored in the 'uploads' directory on the server
    const serverUrl = 'http://localhost:500';
    const fullPath = `${serverUrl}/uploads/${imageType}/${imageName}`;
    setImageUrl(fullPath);
  }, [imageName]);

  return <img src={imageUrl} alt="Uploaded Image" />;
}

export default DisplayImage;