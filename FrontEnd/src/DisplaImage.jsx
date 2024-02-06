import { useEffect, useState } from 'react';
import { BASE_URL } from './utils/BASE_URL';

function DisplayImage({imageType,imageName }) {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // Assuming your images are stored in the 'uploads' directory on the server
    const serverUrl = BASE_URL;
    const fullPath = `${serverUrl}/uploads/${imageType}/${imageName}`;
    setImageUrl(fullPath);
  }, [imageName]);

  return <img src={imageUrl} alt="Uploaded Image" />;
}

export default DisplayImage;