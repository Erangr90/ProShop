// React packages
import React, {useState ,useEffect} from 'react'
import { Link } from 'react-router-dom'
// Redux packages
import {useDispatch, useSelector} from 'react-redux'
// Components
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
// Actions
import { getProduct } from '../actions/productsActions'

const ProductScreen = ({match}) => {

    const [qty,setQty] = useState(0)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)

    const {loading,error,product} = productDetails




    useEffect(()=>{

        dispatch(getProduct(match.params.id))



    },[dispatch, match.params.id] )

    console.log([...Array(product.countInStock).keys()])




    return (
        <>

        <Link className='btn btn-light my-3' to='/'>Go back</Link>

            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :
            (

                <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid/>
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>{product.name}</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={product.numReviews + ' reviews'}/>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Status:
                                    </Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In stock' : 'Out of stock' }
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty</Col>
                                        <Col>
                                            <Form.Control as='select' value={qty} onChange={(event)=> setQty(event.target.value)}>
                                               {

                                                   [...Array(product.countInStock).keys()].map(x=> <option key={x+1} value={x+1}>{x+1}</option>)
                                               }
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}

                            <ListGroup.Item>
                                <Row>
                                <Button className='btn-block' type='button' disabled={product.countInStock === 0 }>Add to Cart</Button>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>

            )}
        </>
    )
}

export default ProductScreen