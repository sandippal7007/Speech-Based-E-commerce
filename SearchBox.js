import React from 'react';
import { Grid,Row,Col } from 'react-bootstrap';

class SearchBox extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
    this.searchByIcon = this.searchByIcon.bind(this);
  }
  handleChange () {
    this.props.handleChangeResponse(this.refs.myInput.value);
  }
  search (event){
    this.props.searchResponse(event,this.refs.myInput.value);
  }
  searchByIcon (){
    this.props.searchByIconResponse(this.refs.myInput.value);
  }
  render() {
      return (
      <Grid>
          <Row className="show-grid grid-border">
            <Col lg={8} md={8}></Col>
            <Col lg={4} md={4}>
              <form className="navbar-form" role="search">
                <div className="input-group search-box">
                  <input ref="searchKeyWords" onKeyDown={this.search} onChange={this.handleChange} id="searchId" ref="myInput" type="text"
                    className="form-control" placeholder="Enter search item.." />
                  <div className="input-group-btn">
                    <button type="button" className="btn btn-default btn-m search-button" onClick={this.searchByIcon}>
                      <span className="glyphicon glyphicon-search"></span>
                    </button>
                  </div>
                </div>
              </form>
            </Col>
          </Row>
        </Grid>)
    }
   }
export default SearchBox;

