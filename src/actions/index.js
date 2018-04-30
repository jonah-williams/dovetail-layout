import * as types from '../constants/ActionTypes'

export const changePinBoardThickness = thickness => ({
  type: types.SET_PIN_BOARD_THICKNESS,
  thickness
})
  
export const changeTailBoardThickness = thickness => ({
  type: types.SET_TAIL_BOARD_THICKNESS,
  thickness
})

export const changeJointLength = length => ({
  type: types.SET_JOINT_LENGTH,
  length
})

export const changePinCount = count => ({
  type: types.SET_SIMPLE_PIN_LAYOUT_PIN_COUNT,
  count
})
  
export const changePinSlope = slope => ({
  type: types.SET_SIMPLE_PIN_LAYOUT_SLOPE,
  slope
})
  
export const changePinWidth = width => ({
  type: types.SET_SIMPLE_PIN_LAYOUT_WIDTH,
  width
})

export const changeJointPosition = position => ({
  type: types.UPDATE_JOINT_POSITION,
  position
})