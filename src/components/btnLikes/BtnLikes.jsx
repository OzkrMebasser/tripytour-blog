"use client"

import { useState } from 'react';

const BtnLikes = ({ slug, initialLikes }) => {
  const [likes, setLikes] = useState(0);

  const handleLike = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/posts/${slug}`, {
      
        method: 'POST',
      });

      if (!response.ok) {
        console.error('Error incrementando los likes');
        return;
      }

      // Actualizar localmente los likes después de una respuesta exitosa
      setLikes((prevLikes) => prevLikes + 1);
    } catch (error) {
      console.error('Error incrementando los likes:', error.message);
    }
    // console.log(response)
  };

  return (
    <div>
      <button onClick={handleLike}>Like</button>
      <span>Likes: {likes}</span>
    </div>
  );
};

export default BtnLikes;