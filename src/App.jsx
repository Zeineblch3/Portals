import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import AudioPlayer from './components/AudioPlayer';


function App() {
  return (
    <>
    <AudioPlayer />

    <Canvas shadows camera={{ position: [0, 0, 10], fov: 30 }}>
      <Experience />

    </Canvas>

    </>
  );
}

export default App;
