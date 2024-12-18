import { OrbitControls } from 'three/examples/jsm/Addons.js'
import './style.css'

import * as THREE from "three"

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')!
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize( window.innerWidth, window.innerHeight )
camera.position.setZ(30)

const geometry = new THREE.TorusGeometry( 10,3,16, 100 )
const material = new THREE.MeshBasicMaterial({ color: 0xFF6347, /* wireframe: true */ })
const torus = new THREE.Mesh( geometry, material )

scene.add( torus )

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add( pointLight, ambientLight )

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)
scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement)


function addStar(){
  const geometry = new THREE.SphereGeometry( 0.25, 24, 24 )
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff} )
  const star = new THREE.Mesh( geometry, material )

  const [x, y, z] = Array(3).fill(0).map( () => THREE.MathUtils.randFloatSpread( 100 ) )

  star.position.set( x, y, z )
  scene.add( star )
}

Array(200).fill(0).forEach(addStar)

// Background
const spaceTexture = new THREE.TextureLoader().load('space.jpg')
scene.background = spaceTexture

// Avatar
const jeffTexture = new THREE.TextureLoader().load('jeff.png')
const jeff = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3), 
  new THREE.MeshBasicMaterial({ map: jeffTexture})
)

jeff.position.z = -5
jeff.position.x = 2

scene.add(jeff)


// Moon
const moonTexture = new THREE.TextureLoader().load('moon.jpg')
const normalTexture = new THREE.TextureLoader().load('normal.jpg')
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map:moonTexture,
    normalMap:normalTexture
  })
)

moon.position.z = 30
moon.position.x = -10

scene.add(moon)



function animate(){
  requestAnimationFrame( animate )

  torus.rotation.x += 0.01
  torus.position.y += 0.005
  torus.position.z += 0.01

  moon.rotation.x += 0.005

  controls.update()

  renderer.render( scene, camera )
}

animate()
