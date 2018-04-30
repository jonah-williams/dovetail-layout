import { connect } from 'react-redux'
import Projection from '../components/Projection'

const mapStateToProps = state => {
  const pinBaseHeight = state.joint.pinWidth
  const pinDepth = state.joint.tailBoardThickness
  const pinMouthHeight = pinBaseHeight - (pinDepth / state.joint.pinSlope) * 2
  const tailExtension = state.joint.pinBoardThickness
  const tailPaths = []
  const pinPathSegments = []
  
  //cut out bottom half pin
  tailPaths.push({x: 0, y: pinBaseHeight / 2})
  tailPaths.push({x: tailExtension, y: pinMouthHeight / 2})
  
  const bottomHalfPin = []
  bottomHalfPin.push({x: 0, y: pinBaseHeight / 2})
  bottomHalfPin.push({x: tailExtension, y: pinMouthHeight / 2})
  bottomHalfPin.push({x: tailExtension, y: 0})
  bottomHalfPin.push({x: 0, y: 0})
  pinPathSegments.push({start: {x: 0, y: 0}, points: bottomHalfPin})
  
  //cut out each pin
  const spaceBetweenPinCenters = state.joint.jointLength / (state.joint.pinCount + 1)
  let currentCenter = spaceBetweenPinCenters
  for (let pinIndex = 0; pinIndex < state.joint.pinCount; pinIndex += 1) {
    tailPaths.push({x: tailExtension, y: currentCenter - pinMouthHeight / 2})
    tailPaths.push({x: 0, y: currentCenter - pinBaseHeight / 2})
    tailPaths.push({x: 0, y: currentCenter + pinBaseHeight / 2})
    tailPaths.push({x: tailExtension, y: currentCenter + pinMouthHeight / 2})
    
    const pinPoints = []
    pinPoints.push({x: tailExtension, y: currentCenter + pinMouthHeight / 2})
    pinPoints.push({x: 0, y: currentCenter + pinBaseHeight / 2})
    pinPoints.push({x: 0, y: currentCenter - pinBaseHeight / 2})
    pinPoints.push({x: tailExtension, y: currentCenter - pinMouthHeight / 2})
    pinPathSegments.push({start: {x: tailExtension, y: currentCenter - pinMouthHeight / 2}, points: pinPoints})
    
    currentCenter += spaceBetweenPinCenters
  }
  
  //cut out top half pin
  tailPaths.push({x: tailExtension, y: state.joint.jointLength - pinMouthHeight / 2})
  tailPaths.push({x: 0, y: state.joint.jointLength - pinBaseHeight / 2})
  
  const topHalfPin = []
  topHalfPin.push({x: 0, y: state.joint.jointLength - pinBaseHeight / 2})
  topHalfPin.push({x: 0, y: state.joint.jointLength})
  topHalfPin.push({x: tailExtension, y: state.joint.jointLength})
  topHalfPin.push({x: tailExtension, y: state.joint.jointLength - pinMouthHeight / 2})
  pinPathSegments.push({start: {x: 0, y: state.joint.jointLength - pinBaseHeight / 2}, points: topHalfPin})
  
  return {
    jointPosition: state.joint.jointPosition,
    tailBoard: {
      length: state.joint.jointLength * 1.5,
      height: state.joint.jointLength,
      thickness: state.joint.tailBoardThickness,
      tailPaths
    },
    pinBoard: {
      length: state.joint.jointLength * 1.5,
      height: state.joint.jointLength,
      thickness: state.joint.pinBoardThickness,
      pinPathSegments
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Projection)