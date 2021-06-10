// React packages
import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
// Redux packages
import { useDispatch,useSelector } from 'react-redux'
// Components
import {Row, Col, ListGroup, Image,Form,Button,Card} from 'react-bootstrap'
import Message from '../components/Message'
// Actions
import { addToCart, removeFormCart } from '../actions/cartActions'


const CartScreen = ({match, location, history }) => {


    // Data from the state
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart


    // Variables
    const dispatch = useDispatch()
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1



    // Listen to data variables
    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId,qty))
        }
    }, [dispatch, productId, qty])

    // Handlers
    const removeFormCartHandler = (id)=>{
        dispatch(removeFormCart(id))
    }

    const checkOutHandler = ()=>{

        history.push('/login?redirect=shipping')

    }


    return (
        <Row>
        <Col md={8}>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? <Message>Your cart is empty <Link to='/'>Go back</Link></Message> : (
                <ListGroup variant='flush'>

                {cartItems.map(item => (
                    <ListGroup.Item key={item.product}>
                        <Row>
                            <Col md={2}>

                            <Image className='px-3' width='120%' src={item.image} alt={item.name}/>

                            </Col>

                            <Col md={3}>

                            <Link to={'/products/'+ String(item.product)}>{item.name}</Link>

                            </Col>

                            <Col md={2}>

                            ${item.price}

                            </Col>

                            <Col md={2}>

                                <Form.Control as='select' value={item.qty} onChange={(e)=> dispatch(addToCart(item.product,Number(e.target.value))) }  >
                                    {
                                        [...Array(Number(item.countInStock)).keys()].map( x => <option key={x+1} value={x+1}>{x+1}</option>)
                                    }
                                </Form.Control>

                            </Col>

                            <Col md={2}>

                            <Button type='button' variant='light' onClick={()=> removeFormCartHandler(item.product)} >
                            <i className='fas fa-trash'></i>

                            </Button>

                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}

                </ListGroup>
            ) }
        </Col>

        <Col md={4}>

        <Card>
            <ListGroup variant='flush'>
            <ListGroup.Item>
                <h2>Subtotal ({cartItems.reduce((acc,item)=> acc + item.qty,0)}) items</h2>
                ${cartItems.reduce((acc,item)=> acc + item.qty*item.price,0).toFixed(2)}
            </ListGroup.Item>

            <ListGroup.Item>
            <Row>
                <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkOutHandler}>Proceed to check out</Button>
            </Row>
            </ListGroup.Item>

            </ListGroup>
        </Card>

        </Col>

        </Row>
    )
}

export default CartScreen
