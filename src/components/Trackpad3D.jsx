import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

// The actual 3D trackpad model
const TrackpadModel = forwardRef(({ onLoad }, ref) => {
  const modelRef = useRef()
  const { scene } = useGLTF('/magic_trackpad_3D.glb')

  // Clone the scene to avoid mutation issues
  const clonedScene = scene.clone()

  // Expose the model ref to parent
  useImperativeHandle(ref, () => ({
    getObject: () => modelRef.current,
    rotation: modelRef.current?.rotation,
    position: modelRef.current?.position,
  }))

  useEffect(() => {
    if (modelRef.current) {
      // Center the model
      const box = new THREE.Box3().setFromObject(modelRef.current)
      const center = box.getCenter(new THREE.Vector3())
      modelRef.current.position.sub(center)

      // Apply materials enhancement for premium look
      modelRef.current.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true
          child.receiveShadow = true
          // Enhance material properties
          if (child.material) {
            child.material.envMapIntensity = 1.5
          }
        }
      })

      onLoad?.()
    }
  }, [onLoad])

  // Subtle idle animation - gentle floating
  useFrame((state) => {
    if (modelRef.current) {
      // Very subtle breathing animation
      modelRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.02
    }
  })

  return (
    <primitive
      ref={modelRef}
      object={clonedScene}
      scale={6}
      rotation={[-0.3, 0.2, 0]}
    />
  )
})

TrackpadModel.displayName = 'TrackpadModel'

// Container component with Canvas
const Trackpad3D = forwardRef(({ className = '', style = {} }, ref) => {
  const modelRef = useRef()
  const containerRef = useRef()

  // Expose methods to parent for GSAP integration
  useImperativeHandle(ref, () => ({
    container: containerRef.current,
    getModel: () => modelRef.current?.getObject?.(),
    setRotation: (x, y, z) => {
      const obj = modelRef.current?.getObject?.()
      if (obj) {
        obj.rotation.set(x, y, z)
      }
    },
    addRotation: (x, y, z) => {
      const obj = modelRef.current?.getObject?.()
      if (obj) {
        obj.rotation.x += x
        obj.rotation.y += y
        obj.rotation.z += z
      }
    }
  }))

  return (
    <div
      ref={containerRef}
      className={`trackpad-3d-container ${className}`}
      style={{
        width: '100%',
        height: '100%',
        ...style
      }}
    >
      <Canvas
        camera={{
          position: [0, 1.5, 2.5],
          fov: 50,
          near: 0.1,
          far: 100
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        {/* Enhanced lighting for better visibility */}
        <ambientLight intensity={0.8} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={2}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight
          position={[-5, 3, 2]}
          intensity={1.2}
          color="#ffffff"
        />
        <pointLight position={[0, 3, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[0, -2, 3]} intensity={0.8} color="#f0f0f0" />

        {/* Environment for reflections */}
        <Environment preset="studio" />

        {/* The 3D trackpad model */}
        <TrackpadModel ref={modelRef} />

        {/* Subtle contact shadow */}
        <ContactShadows
          position={[0, -1, 0]}
          opacity={0.4}
          scale={8}
          blur={2}
          far={4}
        />
      </Canvas>
    </div>
  )
})

Trackpad3D.displayName = 'Trackpad3D'

// Preload the model
useGLTF.preload('/magic_trackpad_3D.glb')

export default Trackpad3D
