import { Canvas } from "@react-three/fiber/native";
import { Suspense } from "react";
import { StyleSheet, View } from "react-native";
import Model from "./components/Model";

export default function App() {
  return (
    <View style={styles.modelContainer}>
      <Canvas
        onCreated={(state) => {
          const _gl = state.gl.getContext();
          const pixelStorei = _gl.pixelStorei.bind(_gl);
          _gl.pixelStorei = function (...args) {
            const [parameter] = args;
            switch (parameter) {
              // expo-gl only supports the flipY param
              case _gl.UNPACK_FLIP_Y_WEBGL:
                return pixelStorei(...args);
            }
          };
        }}>
        <ambientLight intensity={3} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  modelContainer: {
    flex: 1,
  },
});
