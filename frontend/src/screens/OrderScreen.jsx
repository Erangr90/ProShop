// React packages
import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
// Redux packages
import { useDispatch, useSelector } from 'react-redux'
// Node packages
import axios from 'axios'
// Components
import { Row, Col, ListGroup, Image, Card,Button } from 'react-bootstrap'
import {PayPalButton} from 'react-paypal-button-v2'
import Message from '../components/Message'
import Loader from '../components/Loader'
// Actions
import { getOrderDetails,payOrder, deliveredOrder} from '../actions/ordersActions'
// Constants
import { ORDER_PAY_RESET, ORDER_DELIVERED_RESET } from '../constants/ordersConstants'

const OrderScreen = ({ match,history }) => {


  // Data from the state
  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { success:successPay, loading:loadingPay } = orderPay

  const orderDelivered = useSelector((state) => state.orderDelivered)
  const { success:successDelivered, loading:loadingDelivered } = orderDelivered

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  // Variables
  const dispatch = useDispatch()
  const [sdkReady, setSdkReady] = useState(false)
  const orderId = match.params.id


  // Calculate prices
  if(!loading){


  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  order.itemsPrice = addDecimals(
    order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  order.shippingPrice = addDecimals(order.shippingPrice)

  order.taxPrice = addDecimals(order.taxPrice )

  order.totalPrice = addDecimals(order.totalPrice )
  }




  // Listen to data variables
  useEffect(() => {

    if(!userInfo){
      history.push('/login')
    }

    const addPaypalScript = async () =>{
      const {data: clientId} = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = 'https://www.paypal.com/sdk/js?client-id=' + clientId
      script.async = true
      script.onload = () => {setSdkReady(true)}
      document.body.appendChild(script)
    }

    if(!order || order._id !== orderId || successPay || successDelivered ) {
        dispatch({type: ORDER_PAY_RESET})
        dispatch({type: ORDER_DELIVERED_RESET})
        dispatch(getOrderDetails(orderId))
    }else if(!order.isPaid){
      if(!window.paypal){

        addPaypalScript()
      }else{
        setSdkReady(true)
      }

    }
}, [dispatch, history, order, orderId, successDelivered, successPay, userInfo, userInfo._id, userInfo.isAdmin])


  // Handlers
  const successHandler = (paymentResult)=>{


    dispatch(payOrder(orderId,paymentResult))

  }

  const deliveredHandler = ()=>{

    dispatch(deliveredOrder(order))

  }


  return (
    <>

    {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :
      <>
        <h1>Order {order._id}</h1>
        <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
              <strong>Name: </strong>{order.user.name+', Email: '}
              <a href={'mailto:'+order.user.email}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>

              {order.isDelivered ? <Message variant='success'>Delivered on: {order.deliveredAt}</Message> : <Message variant='danger'>Not Delivered</Message> }
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
              <strong>Method: </strong>
              {order.paymentMethod}
              </p>
              {order.isPaid ? <Message variant='success'>Paid on: {order.paidAt}</Message> : <Message variant='danger'>Not Paid</Message> }
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={'/product/'+item.product}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader/> }
                  {!sdkReady ? <Loader/> : (
                    <PayPalButton amount={order.totalPrice} onSuccess={successHandler}/>
                  ) }
                </ListGroup.Item>
              ) }
              {loadingDelivered && <Loader/>}
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  <Button type='button' className='btn-block' onClick={deliveredHandler}>Mark as delivered</Button>
                </ListGroup.Item>
              )

              }
            </ListGroup>
          </Card>
        </Col>
      </Row>
      </>

    }

    </>
  )
}

export default OrderScreen
