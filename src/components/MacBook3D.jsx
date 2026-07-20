import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Environment,
  Lightformer,
  PerspectiveCamera,
  useGLTF,
} from '@react-three/drei'
import * as THREE from 'three'

const MODEL_URL = `${import.meta.env.BASE_URL}models/macbook-pro.glb`
const DRACO_URL = `${import.meta.env.BASE_URL}draco/`

const SCREEN = {
  width: 1232,
  height: 796,
  panelWidth: 468,
  panelHeight: 470,
}

const FONT_STACK = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'

function roundedRect(context, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2)
  context.beginPath()
  context.moveTo(x + r, y)
  context.arcTo(x + width, y, x + width, y + height, r)
  context.arcTo(x + width, y + height, x, y + height, r)
  context.arcTo(x, y + height, x, y, r)
  context.arcTo(x, y, x + width, y, r)
  context.closePath()
}

function drawSwitchyMark(context, x, y, size) {
  const fill = context.createLinearGradient(x, y, x + size, y + size)
  fill.addColorStop(0, '#374765')
  fill.addColorStop(1, '#ca887b')
  roundedRect(context, x, y, size, size, size * 0.24)
  context.fillStyle = fill
  context.fill()

  context.strokeStyle = 'rgba(255,255,255,0.86)'
  context.lineWidth = size * 0.08
  context.lineCap = 'round'
  context.lineJoin = 'round'
  context.beginPath()
  context.moveTo(x + size * 0.24, y + size * 0.58)
  context.lineTo(x + size * 0.5, y + size * 0.31)
  context.lineTo(x + size * 0.76, y + size * 0.58)
  context.moveTo(x + size * 0.5, y + size * 0.32)
  context.lineTo(x + size * 0.5, y + size * 0.78)
  context.stroke()
}

function createScreenTexture(name, active) {
  const canvas = document.createElement('canvas')
  canvas.width = SCREEN.width
  canvas.height = SCREEN.height
  const context = canvas.getContext('2d')

  const wallpaper = context.createLinearGradient(0, 0, SCREEN.width, SCREEN.height)
  wallpaper.addColorStop(0, '#08111f')
  wallpaper.addColorStop(0.48, '#172b50')
  wallpaper.addColorStop(1, '#070a13')
  context.fillStyle = wallpaper
  context.fillRect(0, 0, SCREEN.width, SCREEN.height)

  const coralGlow = context.createRadialGradient(190, 720, 0, 190, 720, 390)
  coralGlow.addColorStop(0, 'rgba(255,117,76,0.88)')
  coralGlow.addColorStop(0.42, 'rgba(190,64,48,0.28)')
  coralGlow.addColorStop(1, 'rgba(17,29,53,0)')
  context.fillStyle = coralGlow
  context.fillRect(0, 0, SCREEN.width, SCREEN.height)

  const violetGlow = context.createRadialGradient(920, 80, 0, 920, 80, 420)
  violetGlow.addColorStop(0, 'rgba(133,99,255,0.62)')
  violetGlow.addColorStop(0.46, 'rgba(76,65,155,0.2)')
  violetGlow.addColorStop(1, 'rgba(7,10,19,0)')
  context.fillStyle = violetGlow
  context.fillRect(0, 0, SCREEN.width, SCREEN.height)

  context.strokeStyle = 'rgba(255,255,255,0.055)'
  context.lineWidth = 44
  context.beginPath()
  context.ellipse(650, 430, 240, 430, Math.PI / 9, 0, Math.PI * 2)
  context.stroke()

  context.fillStyle = 'rgba(5,8,14,0.66)'
  context.fillRect(0, 0, SCREEN.width, 48)
  drawSwitchyMark(context, 20, 10, 28)
  context.fillStyle = 'rgba(255,255,255,0.91)'
  context.font = `600 17px ${FONT_STACK}`
  context.fillText('Switchy', 60, 31)
  context.fillStyle = 'rgba(255,255,255,0.58)'
  context.font = `500 14px ${FONT_STACK}`
  context.fillText('●', 1110, 30)
  context.fillText('9:41', 1140, 30)

  const panelX = SCREEN.width - SCREEN.panelWidth - 56
  const panelY = 104
  context.save()
  context.shadowColor = 'rgba(0,0,0,0.4)'
  context.shadowBlur = 42
  context.shadowOffsetY = 24
  roundedRect(context, panelX, panelY, SCREEN.panelWidth, SCREEN.panelHeight, 28)
  context.fillStyle = 'rgba(247,248,248,0.96)'
  context.fill()
  context.restore()

  context.fillStyle = '#8a8f96'
  context.font = `700 11px ${FONT_STACK}`
  context.fillText('AVAILABLE MAC', panelX + 28, panelY + 40)
  context.fillStyle = '#15171a'
  context.font = `700 24px ${FONT_STACK}`
  context.fillText(name, panelX + 28, panelY + 70)

  context.fillStyle = active ? '#65a832' : '#78b942'
  context.beginPath()
  context.arc(panelX + SCREEN.panelWidth - 94, panelY + 53, 6, 0, Math.PI * 2)
  context.fill()
  context.fillStyle = '#777d84'
  context.font = `600 12px ${FONT_STACK}`
  context.fillText(active ? 'Connected' : 'Ready', panelX + SCREEN.panelWidth - 80, panelY + 58)

  const devices = [
    ['⌨', 'Magic Keyboard'],
    ['▭', 'Magic Trackpad'],
    ['◉', 'Magic Mouse'],
  ]
  devices.forEach(([icon, label], index) => {
    const rowY = panelY + 104 + index * 78
    roundedRect(context, panelX + 24, rowY, SCREEN.panelWidth - 48, 64, 14)
    context.fillStyle = '#e9ecef'
    context.fill()

    roundedRect(context, panelX + 36, rowY + 11, 42, 42, 10)
    context.fillStyle = '#f9fafb'
    context.fill()
    context.fillStyle = '#66717d'
    context.font = `600 20px ${FONT_STACK}`
    context.textAlign = 'center'
    context.fillText(icon, panelX + 57, rowY + 39)
    context.textAlign = 'left'
    context.fillStyle = '#25282c'
    context.font = `650 15px ${FONT_STACK}`
    context.fillText(label, panelX + 94, rowY + 37)
    context.fillStyle = '#77b940'
    context.beginPath()
    context.arc(panelX + SCREEN.panelWidth - 48, rowY + 32, 5, 0, Math.PI * 2)
    context.fill()
  })

  const actionY = panelY + SCREEN.panelHeight - 78
  roundedRect(context, panelX + 24, actionY, SCREEN.panelWidth - 48, 54, 14)
  context.fillStyle = active ? '#c9ff3d' : '#171a1f'
  context.fill()
  context.fillStyle = active ? '#213000' : '#ffffff'
  context.font = `700 14px ${FONT_STACK}`
  context.fillText(active ? 'Accessories connected' : 'Switch all devices', panelX + 44, actionY + 34)
  context.textAlign = 'right'
  context.fillText(active ? '✓' : '→', panelX + SCREEN.panelWidth - 44, actionY + 34)
  context.textAlign = 'left'

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.flipY = true
  texture.minFilter = THREE.LinearMipmapLinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.generateMipmaps = true
  texture.anisotropy = 8
  texture.needsUpdate = true
  return texture
}

function ProductLighting() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[24, 34, 42]} intensity={3.8} color="#fff6ef" />
      <directionalLight position={[-30, 16, 28]} intensity={2.1} color="#b7ccff" />
      <Environment resolution={64}>
        <Lightformer form="rect" intensity={4} position={[0, 12, 22]} scale={[42, 18, 1]} />
        <Lightformer form="rect" intensity={2.6} color="#ff9a83" position={[-28, 2, 8]} rotation-y={Math.PI / 2} scale={[20, 12, 1]} />
        <Lightformer form="rect" intensity={2.2} color="#9bb8ff" position={[28, 4, 4]} rotation-y={-Math.PI / 2} scale={[18, 12, 1]} />
      </Environment>
    </>
  )
}

function MacBookModel({
  name,
  active,
  anchorRef,
  lidStateRef,
  appearanceRef,
  opacityKey,
  yaw = 0,
  onReady,
}) {
  const { scene } = useGLTF(MODEL_URL, DRACO_URL)
  const camera = useThree((state) => state.camera)
  const gl = useThree((state) => state.gl)
  const groupRef = useRef(null)
  const screenTexture = useMemo(() => createScreenTexture(name, active), [active, name])
  const lastOpacityRef = useRef(-1)

  const model = useMemo(() => {
    const clone = scene.clone(true)
    clone.traverse((object) => {
      if (!object.isMesh) return
      object.material = Array.isArray(object.material)
        ? object.material.map((material) => material.clone())
        : object.material.clone()
      object.castShadow = true
      object.receiveShadow = true
    })

    const screen = clone.getObjectByName('screen')
    const matte = clone.getObjectByName('matte')
    if (matte?.isMesh) {
      matte.material = new THREE.MeshBasicMaterial({
        map: screenTexture,
        toneMapped: false,
        transparent: true,
      })
    }

    const materials = []
    const seenMaterials = new Set()
    clone.traverse((object) => {
      if (!object.isMesh) return
      const objectMaterials = Array.isArray(object.material) ? object.material : [object.material]
      objectMaterials.forEach((material) => {
        material.transparent = true
        if (!seenMaterials.has(material)) {
          seenMaterials.add(material)
          materials.push(material)
        }
      })
    })

    return { clone, materials, screen }
  }, [scene, screenTexture])

  useEffect(() => {
    onReady?.()
    return () => {
      model.materials.forEach((material) => material.dispose())
      screenTexture.dispose()
    }
  }, [model, onReady, screenTexture])

  useFrame(() => {
    const anchorRect = anchorRef.current?.getBoundingClientRect()
    const canvasRect = gl.domElement.getBoundingClientRect()
    const group = groupRef.current
    if (anchorRect && group && camera.isPerspectiveCamera && canvasRect.height > 0) {
      const worldHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2) * camera.position.z
      const worldPerPixel = worldHeight / canvasRect.height
      const scale = (anchorRect.width / 31.5) * worldPerPixel * 0.96
      const centerX = anchorRect.left + anchorRect.width / 2 - canvasRect.left
      const bottomY = anchorRect.bottom - canvasRect.top - anchorRect.height * 0.07

      group.visible = true
      group.position.x = (centerX - canvasRect.width / 2) * worldPerPixel
      group.position.y = (canvasRect.height / 2 - bottomY) * worldPerPixel + 1.22 * scale
      group.scale.setScalar(scale)
    } else if (group) {
      group.visible = false
    }

    const lidProgress = lidStateRef?.current?.open ?? 1
    if (model.screen) {
      model.screen.rotation.x = THREE.MathUtils.lerp(Math.PI, Math.PI / 2, lidProgress)
    }

    const opacity = appearanceRef?.current?.[opacityKey] ?? 1
    if (Math.abs(opacity - lastOpacityRef.current) > 0.002) {
      model.materials.forEach((material) => {
        material.opacity = opacity
      })
      lastOpacityRef.current = opacity
    }
  })

  return (
    <group ref={groupRef} rotation={[0, yaw, 0]} visible={false}>
      <primitive object={model.clone} />
    </group>
  )
}

export default function MacBookStage({
  macARef,
  macBRef,
  lidStateRef,
  appearanceRef,
  onReady,
}) {
  const [loaded, setLoaded] = useState({ first: false, second: false })
  const [isVisible, setIsVisible] = useState(false)
  const viewARef = useRef(null)
  const viewBRef = useRef(null)
  const stageRef = useRef(null)
  const markFirstLoaded = useCallback(() => {
    setLoaded((value) => (value.first ? value : { ...value, first: true }))
  }, [])
  const markSecondLoaded = useCallback(() => {
    setLoaded((value) => (value.second ? value : { ...value, second: true }))
  }, [])

  useEffect(() => {
    onReady?.()
  }, [onReady])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: '15% 0px' },
    )
    observer.observe(stage)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div className={`switch-story__mac switch-story__mac--a ${loaded.first ? 'switch-story__mac--loaded' : ''}`} ref={macARef}>
        <div className="macbook-view__fallback" aria-hidden="true" />
        <div className="macbook-view" ref={viewARef} aria-hidden="true" />
      </div>

      <div className={`switch-story__mac switch-story__mac--b ${loaded.second ? 'switch-story__mac--loaded' : ''}`} ref={macBRef}>
        <div className="macbook-view__fallback" aria-hidden="true" />
        <div className="macbook-view" ref={viewBRef} aria-hidden="true" />
      </div>

      <div className="switch-story__canvas" ref={stageRef} aria-hidden="true">
        <Canvas
          dpr={[1, 1.5]}
          frameloop={isVisible ? 'always' : 'never'}
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
          fallback={<span />}
        >
          <PerspectiveCamera makeDefault fov={32} near={0.1} far={300} position={[0, 0, 120]} />
          <ProductLighting />
          <Suspense fallback={null}>
            <MacBookModel
              name="Personal Mac"
              active={false}
              anchorRef={viewARef}
              lidStateRef={lidStateRef}
              appearanceRef={appearanceRef}
              opacityKey="firstOpacity"
              yaw={0.055}
              onReady={markFirstLoaded}
            />
            <MacBookModel
              name="Work Mac"
              active
              anchorRef={viewBRef}
              lidStateRef={null}
              appearanceRef={appearanceRef}
              opacityKey="secondOpacity"
              yaw={-0.055}
              onReady={markSecondLoaded}
            />
          </Suspense>
        </Canvas>
      </div>
    </>
  )
}

useGLTF.preload(MODEL_URL, DRACO_URL)
