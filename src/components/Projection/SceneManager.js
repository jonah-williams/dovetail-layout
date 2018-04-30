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
    tailBoard.applyMatrix(new THREE.Matrix4().makeTranslation( 0, 0, props.jointPosition ))
    scene.add(tailBoard)
    
    const pinBoard = createPinBoard(props)
    pinBoard.name = PIN_BOARD
    scene.add(pinBoard)
  }
  
  function createTailBoard(props) {
    const material = new THREE.MeshBasicMaterial({color: 0x4286f4})
    const wireframeMaterial = new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true, transparent: true})
    
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
    const wireframeMesh = new THREE.Mesh(geometry, wireframeMaterial)
    const mesh = new THREE.Mesh(geometry, material)
    mesh.add(wireframeMesh)
    return mesh
  }
  
  function createPinBoard(props) {
    const material = new THREE.MeshBasicMaterial({color: 0xf441b5})
    const wireframeMaterial = new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true, transparent: true})
    const pinsGroup = new THREE.Group()
    
    for (var pathSegment of props.pinBoard.pinPathSegments) {
      let shape = new THREE.Shape()
      const initialPostion = pathSegment.start
      shape.moveTo(initialPostion.x, initialPostion.y)
      for (var coordinate of pathSegment.points) {
        shape.lineTo(coordinate.x, coordinate.y)
      }
      const extrudeSettings = {
        amount: props.tailBoard.thickness,
        bevelEnabled: false
      }
      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
      const wireframeMesh = new THREE.Mesh(geometry, wireframeMaterial)
      const mesh = new THREE.Mesh(geometry, material)
      mesh.add(wireframeMesh)
      pinsGroup.add(mesh)
    }
    
    const boardGeometry = new THREE.BoxGeometry(props.pinBoard.length, props.pinBoard.height, props.pinBoard.thickness);
    boardGeometry.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI/2))
    boardGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(props.pinBoard.thickness / 2, props.pinBoard.height / 2, -1 * props.pinBoard.length / 2 ))
    const wireframeMesh = new THREE.Mesh(boardGeometry, wireframeMaterial)
    const boardMesh = new THREE.Mesh(boardGeometry, material)
    boardMesh.add(wireframeMesh)
    pinsGroup.add(boardMesh)
    return pinsGroup
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
