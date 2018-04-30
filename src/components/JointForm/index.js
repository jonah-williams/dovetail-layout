import React from 'react'
import PropTypes from 'prop-types'
import { JOINT_STYLE_THROUGH, EDGE_STYLE_HALF_PIN } from '../../constants/ActionTypes'
import './JointForm.css';

const JointForm = (props) => (
  <div className="JointForm panel panel-default">
    <div className="panel-heading"></div>
    <div className="panel-body">
      <div className="row">
        <div className="col-sm-6">
          <div className="row">
            <form className="form-horizontal">  
              <div className="form-group">
                <label htmlFor="jointStyle" className="col-sm-8 control-label">Joint style</label>
                <div className="col-sm-4">
                  <select id="jointStyle" className="form-control" defaultValue={props.jointStyle}>
                    <option value={JOINT_STYLE_THROUGH}>through</option>
                  </select>
                </div>
              </div>
            </form>

            <form className="form-horizontal">
              <div className="form-group">
                <label htmlFor="edgeStyle" className="col-sm-8 control-label">Edge style</label>
                <div className="col-sm-4">
                  <select id="edgeStyle" className="form-control" defaultValue={props.edgeStyle}>
                    <option value={EDGE_STYLE_HALF_PIN}>half pin</option>
                  </select>
                </div>
              </div>
            </form>

            <form className="form-horizontal">
              <div className="form-group">
                <label htmlFor="pinBoardThickness" className="col-sm-8 control-label">Pin board thickness</label>
                <div className="col-sm-4">
                  <input 
                    id="pinBoardThickness"
                    className="form-control"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="0.01"
                    value={props.pinBoardThickness}
                    onChange={(event) => props.changePinBoardThickness(Number(event.target.value))}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="tailBoardThickness" className="col-sm-8 control-label">Tail board thickness</label>
                <div className="col-sm-4">
                  <input 
                    id="tailBoardThickness"
                    className="form-control"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="0.01"
                    value={props.tailBoardThickness}
                    onChange={(event) => props.changeTailBoardThickness(Number(event.target.value))}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="jointLength" className="col-sm-8 control-label">Joint length</label>
                <div className="col-sm-4">
                  <input 
                    id="jointLength"
                    className="form-control"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="0.01"
                    value={props.jointLength}
                    onChange={(event) => props.changeJointLength(Number(event.target.value))}
                  />
                </div>
              </div>
            </form>

            <form className="form-horizontal">
              <div className="form-group">
                <label htmlFor="pinCount" className="col-sm-8 control-label">Pin count</label>
                <div className="col-sm-4">
                  <input 
                    id="pinCount"
                    className="form-control"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="1"
                    value={props.pinCount}
                    onChange={(event) => props.changePinCount(Number(event.target.value))}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="pinSlope" className="col-sm-8 control-label">Pin slope (1/{props.pinSlope} = {(Math.atan(1.0 / props.pinSlope) / (Math.PI / 180)).toFixed(2)}°)</label>
                <div className="col-sm-4">
                  <input 
                    id="pinSlope"
                    className="form-control"
                    type="range"
                    inputMode="none"
                    min="4"
                    max="9"
                    step="0.1"
                    value={props.pinSlope}
                    onChange={(event) => props.changePinSlope(Number(event.target.value))}
                    list="slopeTicks"
                  />

                  <datalist id="slopeTicks">
                    <option value="4" label="1:4"/>
                    <option value="5" label="1:5"/>
                    <option value="6" label="1:6 softwood"/>
                    <option value="7" label="1:7"/>
                    <option value="8" label="1:8 hardwood"/>
                    <option value="9" label="1:9"/>
                  </datalist>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="pinWidth" className="col-sm-8 control-label">Pin width </label>
                <div className="col-sm-4">
                  <input 
                    id="pinWidth"
                    className="form-control"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="0.01"
                    value={props.pinWidth}
                    onChange={(event) => props.changePinWidth(Number(event.target.value))}
                  />
                </div>
              </div>
            </form>

            <form className="form-horizontal">
              <div className="form-group">
                <label htmlFor="jointPosition" className="col-sm-8 control-label">Joint position</label>
                <div className="col-sm-4">
                  <input 
                    id="jointPosition"
                    className="form-control"
                    type="range"
                    inputMode="none"
                    min="0"
                    max="2"
                    step="0.01"
                    value={props.jointPosition}
                    onChange={(event) => props.changeJointPosition(Number(event.target.value))}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="row">
            <div className="col-sm-12">
              <img className="img-fluid dovetail-example" alt="A woodworking dovetail joint" src="https://cdn.glitch.com/0db6dd24-4f81-4170-b619-b87f87218831%2F1026px-Joinery-throughdovetail.svg.png?1525069862267" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

JointForm.propTypes = {
  jointStyle: PropTypes.string.isRequired,
  edgeStyle: PropTypes.string.isRequired,
  
  pinBoardThickness: PropTypes.number.isRequired,
  changePinBoardThickness: PropTypes.func.isRequired,
  
  tailBoardThickness: PropTypes.number.isRequired,
  changeTailBoardThickness: PropTypes.func.isRequired,
  
  jointLength: PropTypes.number.isRequired,
  changeJointLength: PropTypes.func.isRequired,
  
  pinStyle: PropTypes.string.isRequired,
  
  pinCount: PropTypes.number.isRequired,
  changePinCount: PropTypes.func.isRequired,
  
  pinSlope: PropTypes.number.isRequired,
  changePinSlope: PropTypes.func.isRequired,
  
  pinWidth: PropTypes.number.isRequired,
  changePinWidth: PropTypes.func.isRequired,
  
  jointPosition: PropTypes.number.isRequired,
  changeJointPosition: PropTypes.func.isRequired,
}

export default JointForm