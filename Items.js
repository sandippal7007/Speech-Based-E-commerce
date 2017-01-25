import React from 'react';
import { Grid,Row,Col,Modal,Button,Alert } from 'react-bootstrap';

class Items extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      openModal: false,
      itemToCheckout: '',
      alert: false,
      openModalPayment: false
    }
  }
  checkout(i, event) {
    const { products } = this.props;
    this.setState({
      openModal: true,
      itemToCheckout : products[i]
    })
  }
  close() {
    this.setState({
      openModal: false,
      openModalPayment:false
    })
  }
  submit() {
    this.setState({
      openModal: false,
      openModalPayment: true
    })
  }
  closePayment() {
    this.setState({
      openModalPayment: false
    })
  }
  pay() {
    this.setState({
      openModalPayment:false,
      alert: true
    })
  }
  handleAlertDismiss(){
    this.setState({
      openModalPayment:false,
      alert: false
    })
  }
   render() {
    const { products } = this.props;
    const { openModal,itemToCheckout,alert } =this.state;

      return (
        <div>
        {
            alert ?
              <Alert bsStyle="success" onDismiss={this.handleAlertDismiss.bind(this)}>
                  <strong>Thank you, your order has been placed.</strong>
              </Alert>
            : null
          }
          <Grid>
            <Row className="show-grid">
            {
              products.map((option,index)=>{
                return(
                  <Col sm={6} md={6} lg={4}>
                      <div>
                        <p className="description">{option.description}</p>
                        <img className="media-object" src={option.src}
                         height="150px"
                        alt="Not Found"/>
                        <br />
                        {
                          _.times(option.rating,i=>{
                            return(<span className="glyphicon glyphicon-star star-gap" aria-hidden="true"></span>)
                          })
                        }
                        <hr style={{margin:'10px'}}/>
                        <p>Rs. {parseInt(option.price).toLocaleString()}</p>
                        <p>EMI from Rs. {option.emi}</p>
                        <Button id={index} bsStyle="primary" onClick={this.checkout.bind(this,index)}>checkout</Button>
                        <hr />
                      </div>
                  </Col>
                  )
              })

            }
            </Row>
          </Grid>
          <Modal show={this.state.openModal} onHide={this.close.bind(this)}>
            <Modal.Body>
                 <div>
                        <p className="description">{itemToCheckout.description}</p>
                        <img className="media-object" src={itemToCheckout.src}
                         height="150px"
                        alt="Not Found" style={{margin:'auto'}}/>
                        <br />
                        {
                          _.times(itemToCheckout.rating,i=>{
                            return(<span className="glyphicon glyphicon-star star-gap" aria-hidden="true"></span>)
                          })
                        }
                        <hr style={{margin:'10px'}}/>
                        <p>Rs. {parseInt(itemToCheckout.price).toLocaleString()}</p>
                        <p>EMI from Rs. {itemToCheckout.emi}</p>
                  </div>
            </Modal.Body>
            <Modal.Footer>
               <Button id="payment_button" bsStyle="primary" onClick={this.submit.bind(this)}>Continue</Button>
               <Button id="close_checkout" onClick={this.close.bind(this)}>Cancel</Button>
            </Modal.Footer>
          </Modal>

          <Modal show={this.state.openModalPayment} onHide={this.closePayment.bind(this)}>
            <Modal.Body>
                 <div>
                    <input id="bank" type="text" placeholder="Bank Name"></input><br/><br/>
                    <input id="card" type="text" placeholder="Card Number"></input><br/><br/>
                    <input id="pin" type="password" placeholder="Pin Number"></input>
                  </div>
            </Modal.Body>
            <Modal.Footer>
               <Button id="payment" bsStyle="primary" onClick={this.pay.bind(this)}>Pay</Button>
               <Button id="close_checkout" onClick={this.close.bind(this)}>Cancel</Button>
            </Modal.Footer>
          </Modal>
        </div>);
    }
    }

export default Items;

