import * as THREE from 'three'

export default function SceneManager(canvas) {
  const screenDimensions = {
    width: canvas.width,
    height: canvas.height
  }
  
  const scene = buildScene()
  const renderer = buildRender(screenDimensions)
  const camera = buildCamera(screenDimensions)
  const sceneSubjects = createSceneSubjects(scene)
  
  function buildScene() {
    const schene = new THREE.Scene()
    return schene
  }
  
  function buildRender({ width, height }) {
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true })
    const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1
    renderer.setPixelRatio(DPR)
    renderer.setSize(width, height)

    renderer.gammaInput = true
    renderer.gammaOutput = true 

    return renderer
  }
  
  function buildCamera({ width, height }) {
    const aspectRatio = width / height
    const fieldOfView = 60
    const nearPlane = 1
    const farPlane = 100 
    const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane)

    camera.position.z = 5
    camera.position.x = 5
    camera.position.y = 5
    camera.lookAt( new THREE.Vector3( 0, 0, 0 ) )
    
    return camera
  }
  
  function createSceneSubjects(scene) {
    var geometry = new THREE.BoxGeometry( 1, 1, 1 )
    var material = new THREE.MeshNormalMaterial()
    var cube = new THREE.Mesh( geometry, material )
    scene.add( cube )
    
    var gridHelper = new THREE.GridHelper( 10, 10 )
    scene.add( gridHelper )

    return [cube, gridHelper]
  }
  
  this.update = function() {
    renderer.render(scene, camera)
  }
  
  this.onWindowResize = function() {
    const { width, height } = canvas

    screenDimensions.width = width
    screenDimensions.height = height

    camera.aspect = width / height
    camera.updateProjectionMatrix()
    
    renderer.setSize(width, height)
  }
}
