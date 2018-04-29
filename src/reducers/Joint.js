import * as types from '../constants/ActionTypes'

const initialState = {
  jointStyle: types.JOINT_STYLE_THROUGH,
  
  edgeStyle: types.EDGE_STYLE_HALF_PIN,
  
  pinBoardThickness: 1.0,
  tailBoardThickness: 1.0,
  jointLength: 4.0,
  
  pinStyle: types.PIN_LAYOUT_STYLE_SIMPLE,
  pinCount: 3,
  pinSlope: 6.0,
  pinWidth: 0.5,
}

export default function joint(state = initialState, action) {
  switch (action.type) {
    // joint style
    case types.SET_JOINT_STYLE:
      return Object.assign({}, state, {
        jointStyle: action.style
      })
    case types.SET_HALF_BLIND_JOINT_OFFSET:
      return state
      
    // edge style
    case types.SET_EDGE_STYLE:
      return Object.assign({}, state, {
        edgeStyle: action.style
      })
      
    // joint dimensions
    case types.SET_PIN_BOARD_THICKNESS:
      return Object.assign({}, state, {
        pinBoardThickness: action.thickness
      })
    case types.SET_TAIL_BOARD_THICKNESS:
      return Object.assign({}, state, {
        tailBoardThickness: action.thickness
      })
    case types.SET_JOINT_LENGTH:
      return Object.assign({}, state, {
        jointLength: action.length
      })

    // pin style
    case types.SET_PIN_LAYOUT_STYLE:
      return Object.assign({}, state, {
        pinStyle: action.style
      })

    case types.SET_SIMPLE_PIN_LAYOUT_PIN_COUNT:
      return Object.assign({}, state, {
        pinCount: action.count
      })
    case types.SET_SIMPLE_PIN_LAYOUT_WIDTH:
      return Object.assign({}, state, {
        pinWidth: action.width
      })
    case types.SET_SIMPLE_PIN_LAYOUT_SLOPE:
      return Object.assign({}, state, {
        pinSlope: action.slope
      })

    case types.ADD_CUSTOM_PIN:
      return state
    case types.UPDATE_CUSTOM_PIN:
      return state
    case types.REMOVE_CUSTOM_PIN:
      return state
    
    default:
      return state
  }
}