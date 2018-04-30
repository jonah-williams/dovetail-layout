import { connect } from 'react-redux'
import Projection from '../components/Projection'

const mapStateToProps = state => {
  const pinBaseHeight = state.joint.pinWidth
  const pinDepth = state.joint.tailBoardThickness
  const pinMouthHeight = pinBaseHeight - (pinDepth / state.joint.pinSlope) * 2
  const tailExtension = state.joint.pinBoardThickness
  const tailPaths = []
  //cut out bottom half pin
  tailPaths.push({x: 0, y: pinBaseHeight / 2})
  tailPaths.push({x: tailExtension, y: pinMouthHeight / 2})
  
  //cut out each pin
  const spaceBetweenPinCenters = state.joint.jointLength / (state.joint.pinCount + 1)
  let currentCenter = spaceBetweenPinCenters
  for (let pinIndex = 0; pinIndex < state.joint.pinCount; pinIndex += 1) {
    tailPaths.push({x: tailExtension, y: currentCenter - pinMouthHeight / 2})
    tailPaths.push({x: 0, y: currentCenter - pinBaseHeight / 2})
    tailPaths.push({x: 0, y: currentCenter + pinBaseHeight / 2})
    tailPaths.push({x: tailExtension, y: currentCenter + pinMouthHeight / 2})
    currentCenter += spaceBetweenPinCenters
  }
  
  //cut out top half pin
  tailPaths.push({x: tailExtension, y: state.joint.jointLength - pinMouthHeight / 2})
  tailPaths.push({x: 0, y: state.joint.jointLength - pinBaseHeight / 2})
  
  return {
    tailBoard: {
      length: state.joint.jointLength * 1.5,
      height: state.joint.jointLength,
      thickness: state.joint.tailBoardThickness,
      tailPaths
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Projection)