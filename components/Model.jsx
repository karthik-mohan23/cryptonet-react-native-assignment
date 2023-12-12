import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei/native";
import * as FileSystem from "expo-file-system";

export default function Model(props) {
  useEffect(() => {
    downloadFromURL();
  }, []);

  const modelPath = "https://threejs.org/examples/models/gltf/Soldier.glb";
  const downloadFromURL = async () => {
    try {
      const { uri } = await FileSystem.downloadAsync(
        modelPath,
        FileSystem.documentDirectory + "Soldier.glb"
      );
      console.log("Download successful. File URI:", uri);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const group = useRef();

  const { nodes, materials, animations } = useGLTF(
    `${FileSystem.documentDirectory}/Soldier.glb`
  );

  const { actions } = useAnimations(animations, group);

  //   useEffect(() => {
  //     console.log("Available animations:", Object.keys(actions));
  //   }, [actions]);

  useEffect(() => {
    // Check if the "Idle" animation exists in the actions
    if ("Walk" in actions) {
      actions["Walk"].play();
    }
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="Armature"
          rotation={[1.5, Math.PI, 0]}
          scale={0.02}
          position={[0, -1.5, 0]}>
          <skinnedMesh
            name="vanguard_Mesh"
            geometry={nodes.vanguard_Mesh.geometry}
            material={materials.VanguardBodyMat}
            skeleton={nodes.vanguard_Mesh.skeleton}
          />
          <skinnedMesh
            name="vanguard_visor"
            geometry={nodes.vanguard_visor.geometry}
            material={materials.Vanguard_VisorMat}
            skeleton={nodes.vanguard_visor.skeleton}
          />
          <primitive object={nodes.mixamorigHips} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(`${FileSystem.documentDirectory}/Soldier.glb`);
