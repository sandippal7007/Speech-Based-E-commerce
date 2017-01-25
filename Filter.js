import React from 'react';
import { Grid,Row,Col } from 'react-bootstrap';

class Filter extends React.Component {
  constructor(props){
    super(props);
    this.radioCheck = this.radioCheck.bind(this);
  }
  radioCheck () {
    if(this.refs.low_price.checked)
      this.props.radioCheckResponse(this.refs.low_price)
    else if(this.refs.high_price.checked)
      this.props.radioCheckResponse(this.refs.high_price)
    else if(this.refs.date.checked)
      this.props.radioCheckResponse(this.refs.date)
  }
   render() {
    const { checkLow } = this.props.checkLow;
    const { checkHigh } = this.props.checkHigh;
    const { checkDate } = this.props.checkDate;
      return (
      <Grid>
        <Row className="show-grid">
          <Col lg={8} md={8} xs={6}><label className="pull-right">Filter By:</label></Col>
          <Col lg={4} md={4} xs={6}>
            <div>
              <label className="radio-group">
                <input id="low_to_high" ref="low_price" name="sort" type="radio" value="low" onChange={this.radioCheck} checked={checkLow}/>  Low To High
              </label>
              <label className="radio-group">
                <input id="high_to_low" ref="high_price" name="sort" type="radio" value="high" onChange={this.radioCheck} checked={checkHigh}/>  High To Low
              </label>
              <label className="radio-group">
                <input id="date" ref="date" name="sort" type="radio" value="date" onChange={this.radioCheck} checked={checkDate}/>  New Release
              </label>
            </div>
          </Col>
        </Row>
        <hr/>
      </Grid>)
    }
   }
export default Filter;

