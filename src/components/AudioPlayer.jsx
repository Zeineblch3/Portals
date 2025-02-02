import { useState } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

const AudioPlayer = () => {
  const [audio] = useState(new Audio('/audio/Magical Fairy Tale Background Music For VideosMedieval Fantasy MusicAtmospheric Ambience.mp3'));
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((error) => {
        console.log(error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={toggleAudio}
      style={{ bottom: '50px', right: '65px' }}
      className={`fixed z-50 border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-lg uppercase shrink-0 border ${
        isPlaying ? "bg-white/90 text-black" : "bg-black/30 text-white"
      }`}
    >
      {/* Use icons instead of text */}
      {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
    </button>
  );
};

export default AudioPlayer;
