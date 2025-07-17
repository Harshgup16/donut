// "use client"

// import { Canvas, useThree } from "@react-three/fiber"
// import Model from "./Model"
// import { Suspense } from "react"
// import { useProgress, Html, ScrollControls, OrbitControls, Environment } from "@react-three/drei"

// function Loader() {
//   const { progress, active } = useProgress()

//   return <Html center>{progress.toFixed(1)} % loaded</Html>
// }



// export default function Scene() {
//   return (
//     <Canvas className="relative h-svh" style={{ background: "black" }}>
//       <directionalLight position={[0, 3, 2]} intensity={3} />
//       <Environment files={'/potsdamer_platz_1k.hdr'} />
//       <Suspense fallback={<Loader />}>
//         {/* <OrbitControls /> */}
//         <Model />
//       </Suspense>
//     </Canvas>
//   )
// }


"use client"

import { Canvas, useThree } from "@react-three/fiber"
import Model from "./Model"
import Cursor3D from "./Cursor3D"
import { Suspense, useEffect } from "react"
import { useProgress, Html, ScrollControls, OrbitControls, Environment } from "@react-three/drei"
import { useMousePosition } from "@/utils/mouse"

function Loader() {
  const { progress, active } = useProgress()
  return <Html center>{progress.toFixed(1)} % loaded</Html>
}

function MouseTracker() {
  const { updateMousePosition } = useMousePosition()

  useEffect(() => {
    // Add mouse move listener
    window.addEventListener('mousemove', updateMousePosition)
    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
    }
  }, [updateMousePosition])

  return null
}

export default function Scene() {
  return (
    <>
      {/* Hide the default cursor */}
      <style jsx global>{`
        * {
          cursor: none;
        }
      `}</style>

      <Canvas className="relative h-svh" style={{ background: "black" }}>
        <MouseTracker />
        <directionalLight position={[0, 3, 2]} intensity={3} />
        {/* <Environment files={'/potsdamer_platz_1k.hdr'} /> */}
        <Environment preset="night" />
        <Suspense fallback={<Loader />}>
          <Model />
          <Cursor3D />
        </Suspense>
      </Canvas>
    </>
  )
}
