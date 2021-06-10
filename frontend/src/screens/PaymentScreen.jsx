// React packages
import React, { useState } from 'react'
// Redux packages
import { useDispatch, useSelector } from 'react-redux'
// Components
import { Form, Button, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
// Actions
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = ({ history }) => {

  // Data from the state
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  // Check if there is shippingAddress
  if (!shippingAddress.address) {
    history.push('/shipping')
  }

  // Variables
  const dispatch = useDispatch()
  const [paymentMethod, setPaymentMethod] = useState('PayPal')


  // Handlers
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            {/* <Form.Check
              type='radio'
              label='Stripe'
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check> */}
          </Col>
        </Form.Group>
        <br/>
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
