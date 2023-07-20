import { LoadingScreen } from "./component/LoadingScreen";
import VideoCall from "./component/video/VideoCall";
import { Avatar } from "./component/model/Avatar";
import Three from "./component/Three";
import { Scroll, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { MotionConfig } from "framer-motion";
import { Leva } from "leva";
import { Suspense, useEffect, useState } from "react";
import { Cursor } from "./component/Cursor";
import { Interface } from "./component/Interface";
import { Menu } from "./component/Menu";
import { ScrollManager } from "./component/ScrollManager";
import { framerMotionConfig } from "./config";
function App() {
  const [section, setSection] = useState(0);
  const [started, setStarted] = useState(true);
  const [menuOpened, setMenuOpened] = useState(false);

  useEffect(() => {
    setMenuOpened(false);
  }, [section]);
  return (
    <>
      <LoadingScreen started={started} setStarted={setStarted} />
      {/* <video ref={videoRef} autoPlay></video> */}
      {/* <VideoCall /> */}
      {/* <Three /> */}
      <>
        <MotionConfig
          transition={{
            ...framerMotionConfig,
          }}
        >
          <Canvas shadows camera={{ position: [0, 3, 10], fov: 42 }}>
            <color attach="background" args={["#e6e7ff"]} />
            <ScrollControls pages={4} damping={0.1}>
              <ScrollManager section={section} onSectionChange={setSection} />
              <Scroll>
                <Suspense>{started && <Three section={section} menuOpened={menuOpened} />}</Suspense>
              </Scroll>
              <Scroll html>{started && <Interface setSection={setSection} />}</Scroll>
            </ScrollControls>
          </Canvas>
          <Menu onSectionChange={setSection} menuOpened={menuOpened} setMenuOpened={setMenuOpened} />
          <Cursor />
        </MotionConfig>
        <Leva hidden />
      </>
    </>
  );
}

export default App;
