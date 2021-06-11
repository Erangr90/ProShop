// React packages
import React, { useEffect } from 'react'
// Redux packages
import { useDispatch, useSelector } from 'react-redux'
// Components
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button,Row,Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
// Actions
import { ProductsList } from '../actions/productsActions'

const ProductsListScreen = ({history, match}) => {


    // Data from the state
    const productsList = useSelector(state => state.productsList)
    const {loading,error,products} = productsList

    const userLogin = useSelector(state => state.userLogin)
    const{userInfo} = userLogin




    // Variables
    const dispatch = useDispatch()


    // Listen to data variables
    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(ProductsList())
        }else{
            history.push('/login')
        }


    }, [dispatch, history, userInfo])



    // Handlers
    const deleteHandler = (id)=>{

        // if(window.confirm('Are you sure?')){

        //     dispatch(deleteUser(id))

        // }



    }
    const createProductHandler = ()=>{

    }

    return (
        <>
        <Row className='align-items-center'>
            <Col><h1>Products</h1></Col>
            <Col className='text-right'>
                <Button className='my-3' onClick={createProductHandler}><i className='fas fa-plus'></i>Create Product</Button>
            </Col>
        </Row>
        {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <LinkContainer to={'/admin/product/'+product._id+'/edit'}>
                                <Button className='btn-sm' variant='light'>
                                 <i className='fas fa-edit'></i>
                                </Button>
                                </LinkContainer>
                                <Button className='btn-sm' variant='danger' onClick={()=>deleteHandler(product._id)}>
                                 <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}

        </>
    )
}

export default ProductsListScreen
