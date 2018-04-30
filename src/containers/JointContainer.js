import { connect } from 'react-redux'
import {
  changePinBoardThickness,
  changeTailBoardThickness,
  changeJointLength,
  changePinCount,
  changePinSlope,
  changePinWidth,
  changeJointPosition
} from '../actions'
import JointForm from '../components/JointForm'

const mapStateToProps = state => {
  return state.joint
}

const mapDispatchToProps = (dispatch) => ({
  changePinBoardThickness: (thickness) => dispatch(changePinBoardThickness(thickness)),
  changeTailBoardThickness: (thickness) => dispatch(changeTailBoardThickness(thickness)),
  changeJointLength: (length) => dispatch(changeJointLength(length)),
  changePinCount: (count) => dispatch(changePinCount(count)),
  changePinSlope: (slope) => dispatch(changePinSlope(slope)),
  changePinWidth: (width) => dispatch(changePinWidth(width)),
  changeJointPosition: (position) => dispatch(changeJointPosition(position)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JointForm)