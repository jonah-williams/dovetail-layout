import * as THREE from 'three'

export default function SceneManager(canvas) {
  const screenDimensions = {
    width: canvas.width,
    height: canvas.height
  }
  
  const scene = buildScene()
  const renderer = buildRender(screenDimensions)
  const camera = buildCamera(screenDimensions)
  createSceneStaticObjects(scene)
  
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
    const farPlane = 1000 
    const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane)
    // const camera = new THREE.OrthographicCamera(-5, 5, 5, -5, 1, 100)
    
    camera.position.z = 5
    camera.position.x = 5
    camera.position.y = 5
    camera.lookAt( new THREE.Vector3( 0, 0, 0 ) )
    
    return camera
  }
  
  function createSceneStaticObjects(scene) {
    var gridHelper = new THREE.GridHelper( 10, 10 )
    scene.add( gridHelper )

    return [gridHelper]
  }
  
  function updateSceneObjects(scene, props) {
    const PIN_BOARD = 'PIN_BOARD'
    const TAIL_BOARD = 'TAIL_BOARD'
  
    for (var existingObject of [PIN_BOARD, TAIL_BOARD].map(name => scene.getObjectByName(name))) {
      scene.remove(existingObject)
    }
    
    const tailBoard = createTailBoard(props)
    tailBoard.name = TAIL_BOARD
    scene.add(tailBoard)
  }
  
  function createTailBoard(props) {
    let shape = new THREE.Shape()
    shape.moveTo(0, 0)
    
    for (var coordinate of props.tailBoard.tailPaths) {
      shape.lineTo(coordinate.x, coordinate.y)
    }
    
    shape.lineTo(0, props.tailBoard.height)
    shape.lineTo(-1 * props.tailBoard.length, props.tailBoard.height)
    shape.lineTo(-1 * props.tailBoard.length, 0)
    
    const extrudeSettings = {
      amount: props.tailBoard.thickness,
      bevelEnabled: false
    }
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
    const wireframe = new THREE.WireframeGeometry(geometry)
    const line = new THREE.LineSegments(wireframe)
    line.material.depthTest = false
    line.material.opactity = 0.5
    line.material.transparent = true
    
    const material = new THREE.MeshNormalMaterial()
    return new THREE.Mesh(geometry, material)
  }
  
  this.update = function(props) {
    if (props) {
      updateSceneObjects(scene, props)
    }
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
