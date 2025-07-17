// import { useAnimations, useGLTF, useScroll } from "@react-three/drei"
// import { useFrame } from "@react-three/fiber"
// import { useEffect, useRef } from "react"
// import { Group } from "three"

// useGLTF.preload("/robot_playground.glb")

// export default function Model() {
//   const group = useRef<Group>(null)
//   const { nodes, materials, animations, scene } = useGLTF(
//     "/robot_playground.glb"
//   )
//   const { actions, clips } = useAnimations(animations, scene)
//   const scroll = useScroll()

//   useEffect(() => {
//     console.log(actions)
//     //@ts-ignore
//     actions["Experiment"].play().paused = true
//   }, [])
//   useFrame(
//     () =>
//       //@ts-ignore
//       (actions["Experiment"].time =
//         //@ts-ignore
//         (actions["Experiment"].getClip().duration * scroll.offset) / 4)
//   )
//   return (
//     <group ref={group}>
//       <primitive object={scene} />
//     </group>
//   )
// }


// import { useAnimations, useGLTF, useScroll, Text, MeshTransmissionMaterial, Float } from "@react-three/drei"
// import { useFrame, useThree } from "@react-three/fiber"
// import { useEffect, useRef, useState } from "react"
// import { Group, Mesh, Vector3 } from "three"
// import { useControls } from "leva"
// import { easing } from "maath"

// // Preload the 3D model
// useGLTF.preload("/donut1.glb")

// Camera rig component for interactive mouse movement
// function Rig() {
//   useFrame((state, delta) => {
//     easing.damp3(
//       state.camera.position,
//       [Math.sin(-state.pointer.x) * 5, state.pointer.y * 3.5, 15 + Math.cos(state.pointer.x) * 10],
//       0.2,
//       delta,
//     )
//     state.camera.lookAt(0, 0, 0)
//   })
//   return null
// }

// export default function Model() {
//   const donutGroup = useRef<Group>(null)
//   const { nodes, materials, animations, scene } = useGLTF("/donut1.glb")
//   const { viewport, size } = useThree()
//   const [meshes, setMeshes] = useState<Mesh[]>([])
  
//   // Determine if we're on mobile based on viewport width
//   const isMobile = size.width < 768
  
//   // Calculate model scale based on device
//   const modelScale = isMobile 
//     ? viewport.width / 2.5  // Larger on mobile
//     : viewport.width / 6  // Original size on desktop
  
//   // Calculate text size based on device
//   const textSize = isMobile 
//     ? viewport.width / 3    // Larger text on mobile
//     : viewport.width / 1 // Original size on desktop

//   // Extract all meshes from the scene
//   useEffect(() => {
//     const foundMeshes: Mesh[] = []
//     scene.traverse((child) => {
//       if (child instanceof Mesh) {
//         foundMeshes.push(child)
//       }
//     })
//     setMeshes(foundMeshes)
//   }, [scene])

//   // Animation for rotating the model
//   useFrame((state, delta) => {
//     if (donutGroup.current) {
//       donutGroup.current.rotation.x += delta * 1.5
//       donutGroup.current.rotation.y += delta * 1.5
//     }
//   })

//   // Material properties for the glass effect
//   const materialProps = useControls({
//     thickness: { value: 0.3, min: 0, max: 3, step: 0.05 },
//     roughness: { value: 0.4, min: 0, max: 1, step: 0.1 },
//     transmission: { value: 1, min: 0, max: 1, step: 0.1 },
//     ior: { value: 1, min: 0, max: 3, step: 0.1 },
//     chromaticAberration: { value: 0.13, min: 0, max: 1 },
//     backside: { value: true }
//   })

//   // Float animation settings
//   const floatConfig_text = {
//     speed: 5.5,            // Animation speed
//     rotationIntensity: 0.25,  // No rotation for the text
//     floatIntensity: 2.5,   // Intensity of the floating effect
//   }
//   const floatConfig_model = {
//     speed: 2.5,            // Animation speed
//     rotationIntensity: 0.1,  // No rotation for the text
//     floatIntensity: 0.25,   // Intensity of the floating effect
//   }

//   return (
//     <>
//       {/* Rotating donut group */}
//       {/* <group ref={donutGroup} scale={modelScale} rotation={[Math.PI / 2,0, 0]}>
//         <Float {...floatConfig_model}> */}
//       {/* for glass */}
//       <group ref={donutGroup} scale={modelScale} rotation={[Math.PI / 2,0, 0]}>
//         {/* Create duplicate meshes with the new material */}
//           {meshes.map((mesh, index) => (
//             <mesh
//               key={index}
//               geometry={mesh.geometry}
//               position={mesh.position.clone()}
//               rotation={mesh.rotation.clone()}
//               scale={mesh.scale.clone()}
//             >
//               <MeshTransmissionMaterial {...materialProps} />
//             </mesh>
//           ))}
//           {/* Hide the original scene */}
//           <primitive object={scene} visible={false} />
//         {/* </Float> */}
//       </group>
     
//       {/* Floating text with Float component */}
//       <Float {...floatConfig_text}>
//         <Text
//           fontSize={textSize}
//           color="white"
//           font="/PPNeueMontreal-Bold.otf"
//           anchorX="center"
//           anchorY="middle"
//           position={[0, 0, -3]}
//         >
//           MHV
//         </Text>
//       </Float>
      
//       {/* Camera rig for interactive mouse-based camera movement */}
//       {/* <Rig /> */}
//     </>
//   )
// }

import { useAnimations, useGLTF, useScroll, Text, MeshTransmissionMaterial, Float } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import { Group, Mesh } from "three"
import { useControls } from "leva"

// Preload the 3D model
useGLTF.preload("/donut1.glb")



export default function Model() {
  const donutGroup = useRef<Group>(null)
  const { nodes, materials, animations, scene } = useGLTF("/donut1.glb")
  const { viewport, size } = useThree()
  const [meshes, setMeshes] = useState<Mesh[]>([])
  
  // Determine if we're on mobile based on viewport width
  const isMobile = size.width < 768
  
  // Calculate model scale based on device
  const modelScale = isMobile 
    ? viewport.width / 2.5  // Larger on mobile
    : viewport.width / 4.5  // Original size on desktop
  
  // Calculate text size based on device
  const textSize = isMobile 
    ? viewport.width / 3    // Larger text on mobile
    : viewport.width / 4.8  // Original size on desktop

  // Extract all meshes from the scene
  useEffect(() => {
    const foundMeshes: Mesh[] = []
    scene.traverse((child) => {
      if (child instanceof Mesh) {
        foundMeshes.push(child)
      }
    })
    setMeshes(foundMeshes)
  }, [scene])

  // Animation for rotating the model
  useFrame((state, delta) => {
    if (donutGroup.current) {
      donutGroup.current.rotation.x += delta * 1.5
      donutGroup.current.rotation.y += delta * 1.5
    }
  })

  // Material properties for the glass effect
  const materialProps = useControls({
    thickness: { value: 0.3, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0.4, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    ior: { value: 1, min: 0, max: 3, step: 0.1 },
    chromaticAberration: { value: 0.13, min: 0, max: 1 },
    backside: { value: true }
  })

  const floatConfig = {
    speed: 5.5,
    rotationIntensity: 0,
    floatIntensity: 2.5,
  }

  return (
    <>
      <group ref={donutGroup} scale={modelScale} rotation={[0, 0, 0]}>
        {meshes.map((mesh, index) => (
          <mesh
            key={index}
            geometry={mesh.geometry}
            position={mesh.position.clone()}
            rotation={mesh.rotation.clone()}
            scale={mesh.scale.clone()}
          >
            <MeshTransmissionMaterial {...materialProps} />
          </mesh>
        ))}
        <primitive object={scene} visible={false} />
      </group>
     
      <group position={[0, 0, -0.5]}>
        <Float {...floatConfig}>
          <Text
            fontSize={textSize}
            color="white"
            font="/PPNeueMontreal-Bold.otf"
            anchorX="center"
            anchorY="middle"
          >
            MHV
          </Text>
        </Float>
      </group>
    </>
  )
}