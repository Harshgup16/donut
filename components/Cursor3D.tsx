import { MeshTransmissionMaterial, useGLTF, Center, Text3D, Float } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import { Group, Mesh, Shape, ExtrudeGeometry, ShapeGeometry, Euler } from "three"
import { useMouseStore } from "@/utils/mouse"
import { easing } from "maath"

export default function Cursor3D() {
  const cursorRef = useRef<Group>(null)
  const { viewport, size } = useThree()
  
  // Get mouse position from store
  const mouseX = useMouseStore((state) => state.x)
  const mouseY = useMouseStore((state) => state.y)

  // Determine if we're on mobile based on viewport width
  const isMobile = size.width < 768
  
  // Calculate cursor scale based on device
  const cursorScale = isMobile ? 0.8 : 0.4

  useFrame((state, delta) => {
    if (cursorRef.current) {
      // Convert normalized coordinates to world space
      const x = mouseX * (viewport.width / 2)
      const y = mouseY * (viewport.height / 2)
      
      // Smooth cursor movement using maath easing
      easing.damp3(
        cursorRef.current.position,
        [x, y, 0],
        0.2,
        delta
      )

      // Add subtle rotation based on mouse movement for catch light effect
      const targetRotationX = mouseY * 0.1
      const targetRotationY = mouseX * 0.1
      
      easing.dampE(
        cursorRef.current.rotation,
        [targetRotationX, targetRotationY, 0],
        0.2,
        delta
      )
    }
  })

  // Create circular shape with lens curvature
  const circleShape = new Shape()
  const radius = 1
  const segments = 32
  
  // Draw the main circle
  circleShape.moveTo(radius, 0)
  for (let i = 1; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2
    circleShape.lineTo(
      Math.cos(theta) * radius,
      Math.sin(theta) * radius
    )
  }
  circleShape.closePath()

  // Flatter extrusion with lens-like bevel for the curvature
  const extrudeSettings = {
    steps: 1,
    depth: 0.08,  // Slightly thicker for lens effect
    bevelEnabled: true,
    bevelThickness: 0.04,  // Increased for more pronounced lens curve
    bevelSize: 0.75,       // Larger bevel for smoother curve
    bevelSegments: 8       // More segments for smoother curvature
  }

  const materialProps = {
    thickness: 0.4,                   // Increased for lens effect
    roughness: 0.05,                  // Very smooth surface
    transmission: 0.98,               // High transparency
    ior: 1.4,                         // Increased for stronger lens effect
    chromaticAberration: 0.04,        // Subtle color separation
    backside: true,
    distortion: 0.2,                  // Increased lens distortion
    distortionScale: 0.6,             // Larger scale distortion
    temporalDistortion: 0,            // No temporal distortion for clean look
    clearcoat: 1,                     // Maximum clearcoat for strong highlights
    clearcoatRoughness: 0.1,          // Slightly rough clearcoat
    attenuationDistance: 0.3,         // Increased for stronger edge effect
    attenuationColor: '#ffffff',      // White attenuation for clean look
    color: '#ffffff',                 // Pure white base
    samples: 16,                      // Higher sample count for better quality
    resolution: 1024,                 // Higher resolution for clearer refraction
    envMapIntensity: 1.5,             // Stronger environment reflections
  }

  return (
    <group ref={cursorRef} scale={cursorScale}>
      <Center>
        <mesh>
          <extrudeGeometry args={[circleShape, extrudeSettings]} />
          <MeshTransmissionMaterial {...materialProps} />
        </mesh>
      </Center>
    </group>
  )
}