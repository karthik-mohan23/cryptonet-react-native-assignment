import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei/native";

export default function Model(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    require("../assets/Soldier.glb")
  );
  const { actions } = useAnimations(animations, group);

  //   useEffect(() => {
  //     console.log("Available animations:", Object.keys(actions));
  //   }, [actions]);

  useEffect(() => {
    actions["Armature|mixamo.com|Layer0"]?.play();
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="Armature"
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
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

useGLTF.preload(require("../assets/Soldier.glb"));
