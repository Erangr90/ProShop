// React packages
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
// Redux packages
import {useDispatch,useSelector} from 'react-redux'
// Components
import { Button, Form } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
// Actions
import { getProduct,updateProduct } from '../actions/productsActions'
// Constants
import {  PRODUCT_UPDATE_RESET } from '../constants/productsConstants'



const ProductEditScreen = ({match,history}) => {


        // Data from the state
        const productDetails = useSelector(state => state.productDetails )
        const {loading,error,product} =  productDetails
        const productUpdate = useSelector(state => state.productUpdate )
        const {loading:loadingUpdate,error:errorUpdate,success:successUpdate} =  productUpdate

        // Variables
        const dispatch = useDispatch()

        const productId = match.params.id

        console.log(productId)

        const [name, setName] = useState('')
        const [price,setPrice] = useState(0)
        const [image, setImage] = useState('')
        const [brand, setBrand] = useState('')
        const [category, setCategory] = useState('')
        const [countInStock, setIsCountInStock] = useState(0)
        const [description , setDescription] = useState('')




        // Listen to data variables
        useEffect(() => {

            if(successUpdate){
                dispatch({type:PRODUCT_UPDATE_RESET})
                dispatch(getProduct(productId))
                history.push('/admin/products')
            }else{

                if(!product || !product._id || product._id !== productId){
                    dispatch(getProduct(productId))
                }else {
                    setName(product.name)
                    setPrice(product.price)
                    setImage(product.image)
                    setBrand(product.brand)
                    setCategory(product.category)
                    setIsCountInStock(product.countInStock)
                    setDescription(product.description)
                }

            }


        }, [dispatch, history, product, productId, successUpdate])


        // Handlers
        const submitHandler = (e)=>{
            e.preventDefault()
            dispatch(updateProduct({
                _id:productId,
                name,
                price,
                image,
                brand,
                category,
                countInStock,
                description
            }))
        }

    return (
        <>
            <Link to='/admin/products' className='btn btn-light my-3'>Go Back</Link>

            <FormContainer>

                <h1>Edit Product</h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ?  <Loader/> : error ? <Message variant='danger'>{error}</Message> : (

                <Form onSubmit={submitHandler}>

                    <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' placeholder='Enter name' value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='price'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control type='number' placeholder='Enter price' value={price} onChange={(e)=>setPrice(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='image'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control type='text' placeholder='Enter image' value={image} onChange={(e)=>setImage(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='brand'>
                    <Form.Label>Brand</Form.Label>
                    <Form.Control type='text' placeholder='Enter brand' value={brand} onChange={(e)=>setBrand(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='category'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control type='text' placeholder='Enter category' value={category} onChange={(e)=>setCategory(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='countInStock'>
                    <Form.Label>Count In Stock</Form.Label>
                    <Form.Control type='number' placeholder='Enter countInStock' value={countInStock} onChange={(e)=>setIsCountInStock(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type='text' placeholder='Enter description' value={description} onChange={(e)=>setDescription(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>Update</Button>

            </Form>

            ) }
        </FormContainer>

        </>

    )
}

export default ProductEditScreen
