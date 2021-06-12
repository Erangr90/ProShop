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
import { getProduct, reviewProduct } from '../actions/productsActions'
// Constants
import { PRODUCT_REVIEW_RESET } from '../constants/productsConstants'

const ProductScreen = ({history ,match}) => {
    // Data from the state
    const productDetails = useSelector(state => state.productDetails)
    const {loading,error,product} = productDetails
    const productReview = useSelector(state => state.productReview)
    const {loading:loadingReview,error:errorReview,success:successReview} = productReview
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    // Variables
    const dispatch = useDispatch()
    const [qty,setQty] = useState(1)
    const [rating,setRating] = useState(0)
    const [comment,setComment] = useState('')

    // Listen to data variables
    useEffect(()=>{

        if(successReview){
            alert('Review submitted')
            setRating(0)
            setComment('')
            dispatch({type:PRODUCT_REVIEW_RESET})
            dispatch(getProduct(match.params.id))

        }

        if(!product || !product._id || product._id !== match.params.id){

            dispatch(getProduct(match.params.id))

        }


    },[dispatch, match.params.id, product, successReview])

    // Handlers
    const addToCartHandler = ()=> {
        history.push('/cart/' + match.params.id +'?qty=' + qty)
    }

    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(reviewProduct(match.params.id,{rating,comment}))

    }




    return (
        <>

        <Link className='btn btn-light my-3' to='/'>Go back</Link>

            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :
            (
                <>
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
                            <Rating value={Number(product.rating)} text={product.numReviews + ' reviews'}/>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: ${Number(product.price)}
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
                                        <strong>${Number(product.price)}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Status:
                                    </Col>
                                    <Col>
                                        {Number(product.countInStock)> 0 ? 'In stock' : 'Out of stock' }
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            {Number(product.countInStock) > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty:</Col>
                                        <Col>
                                            <Form.Control as='select' value={qty} onChange={(e)=> setQty(e.target.value)}  >
                                                {
                                                    [...Array(Number(product.countInStock)).keys()].map( x => <option key={x+1} value={x+1}>{x+1}</option>)
                                                }
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )
                            }

                            <ListGroup.Item>
                                <Row>
                                <Button className='btn-block' type='button' disabled={Number(product.countInStock )=== 0 } onClick={addToCartHandler} >Add to Cart</Button>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <h2>Reviews</h2>
                    {product && product.reviews && product.reviews.length === 0 && <Message>No reviews</Message>}
                    <ListGroup variant='flush'>
                            {product && product.reviews && product.reviews.map(r=><ListGroup.Item key={r._id}>
                                <strong>{r.name}</strong>
                                <Rating value={r.rating}/>
                                <p>{r.createdAt.substring(0,10)}</p>
                                 <p>{r.comment}</p>
                            </ListGroup.Item>)}
                        <ListGroup.Item>
                            <h2>Write a review</h2>
                            {loadingReview && <Loader/>}
                            {errorReview && <Message variant='danger'>{errorReview}</Message>}
                            {userInfo ? (
                                <Form onSubmit={submitHandler}>
                                    <Form.Group controlId='rating'>
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control as='select' value={rating} onChange={(e)=>setRating(e.target.value)}>
                                            <option value=''>Select...</option>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                            <option value={5}>5</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='comment'>
                                    <Form.Label>Comment</Form.Label>
                                    <Form.Control as='textarea' row={3} value={comment} onChange={(e)=>setComment(e.target.value)}></Form.Control>
                                    </Form.Group>
                                    <Button type='submit' variant='primary'>Submit</Button>
                                </Form>
                            ) : <Message>Please <Link to='/login'>Sing In</Link> to write a review</Message>}
                        </ListGroup.Item>


                    </ListGroup>
                </Col>
            </Row>
            </>



            )}
        </>
    )
}

export default ProductScreen
