import { Environment,Text,RoundedBox, useTexture, MeshPortalMaterial, CameraControls, useCursor } from "@react-three/drei";
import * as THREE from "three";
import { Fish } from "./Fish";
import { Cactoro } from "./Cactoro";
import { DragonEvolved } from "./Dragon_Evolved";
import { Bunny } from "./Bunny";
import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";


export const Experience = () => {

  const [active ,setActive] = useState(null);
  const [hovered ,setHovered] = useState(null); //to detect the idle
  const controlsRef = useRef();
  useCursor(hovered);
  const scene = useThree((state) => state.scene);
 
  useEffect(() => {
    if(active) {
      const targetPosition = new THREE.Vector3();
      scene.getObjectByName(active).getWorldPosition(targetPosition);
      controlsRef.current.setLookAt(
        0,
        0,
        5, //to go inside the world
        targetPosition.x,
        targetPosition.y,
        targetPosition.z,
        true, //animate it or not
      )
    } else { //animate it back
      controlsRef.current.setLookAt(
        0,
        0,
        10, //to go outside the world
        0,
        0,
        0,
        true, //animate it or not
      )
    }
  }, [active]);



    return (
    <>
      <ambientLight intensity={0.5} /> 
      <Environment preset="sunset" />
      <CameraControls ref={controlsRef} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 6}/>
      <MonsterStage 
        texture={"textures/panorama.jpg"} 
        name="Bunny" 
        color="#C960EB"
        position-x={3.5} // Left side (top)
        rotation-y={-Math.PI / 4}
        active = {active}
        setActive = {setActive}
        hovered = {hovered}
        setHovered = {setHovered}
      >
        <Bunny scale={0.6} position-y={-1} hovered={hovered === "Bunny"}/>
      </MonsterStage>
      <MonsterStage 
        texture={"textures/anime_art_style_a_water_based_pokemon_like_environ.jpg"} 
        name="Fish King" 
        color="#38adcf"
        position-x={-0.9} // Right side (top)
        position-z={-1}
        rotation-y={Math.PI / 10} 
        active = {active}
        setActive = {setActive}
        hovered = {hovered}
        setHovered = {setHovered}
      >
        <Fish scale={0.6} position-y={-1} hovered={hovered === "Fish King"}/>
      </MonsterStage>
      <MonsterStage 
        texture={"textures/anime_art_style_cactus_forest.jpg"} 
        position-x={-3} // Left side (top)
        rotation-y={Math.PI / 5} 
        name="Cactoro" 
        color="#739d3c"
        active = {active}
        setActive = {setActive}
        hovered = {hovered}
        setHovered = {setHovered}
      >
        < Cactoro scale={0.45} position-y={-1} hovered={hovered === "Cactoro"}/>
      </MonsterStage>
      <MonsterStage 
        texture={"textures/anime_art_style_lava_world.jpg"} 
        position-x={1.5} // Right side (bottom)
        rotation-y={-Math.PI / 20}
        position-z={-1.1}
        name="Dragon" 
        color={"#df8d52"}
        active = {active}
        setActive = {setActive}
        hovered = {hovered}
        setHovered = {setHovered}
      >
        <DragonEvolved scale={0.5} position-y={-1} hovered={hovered === "Dragon"}/>
      </MonsterStage>
    </>
  );
};

const MonsterStage = ({children,texture,name,color,active, setActive,hovered, setHovered, ...props}) => {
  const map = useTexture(texture);
  const portalMaterial = useRef();
  const audioRef = useRef(new Audio("/audio/magic-3-278824.mp3"));

  useFrame((_state, delta) => {
    const worldOpen = active === name;
    easing.damp(portalMaterial.current, "blend", worldOpen ? 1 : 0, 0.2 , delta);
  })

  return <group {...props}>
     <Text
        font="fonts/Caprasimo-Regular.ttf"
        fontSize={0.3}
        position={[0, -1.3, 0.051]}
        anchorY={"bottom"}
      >
        {name}
        <meshBasicMaterial color={color} toneMapped={false} />
      </Text>
    <RoundedBox 
      name={name} 
      args={[2, 3, 0.1]} 
      onDoubleClick={() => {setActive(active === name ? null : name)
        audioRef.current.currentTime = 0; // Restart sound
        audioRef.current.play();
      }}
      onPointerEnter={() => setHovered(name)}
      onPointerLeave={() => setHovered(null)}
      >
        <MeshPortalMaterial ref = {portalMaterial} side={THREE.DoubleSide} >
          <ambientLight intensity={1} /> 
          <Environment preset="sunset" />
          {children}
          <mesh>
            <sphereGeometry args={[5, 64, 64]} />
            <meshStandardMaterial map={map} side={THREE.BackSide} />
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
  </group>
}