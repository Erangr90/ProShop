// React packages
import React, { useEffect } from 'react'
// Redux packages
import { useDispatch, useSelector } from 'react-redux'
// Components
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
// Actions
import { getOrders } from '../actions/ordersActions'

const OrderListScreen = ({history}) => {


    // Data from the state
    const userLogin = useSelector(state => state.userLogin)
    const{userInfo} = userLogin

    const ordersList = useSelector(state => state.ordersList)
    const {loading,error,orders} = ordersList

    // const orderDelete = useSelector(state => state.orderDelete)
    // const {success:successDelete} = orderDelete


    // Variables
    const dispatch = useDispatch()


    // Listen to data variables
    useEffect(() => {

        if(userInfo && userInfo.isAdmin){
            dispatch(getOrders())
        }else{
            history.push('/login')
        }



    }, [dispatch, history, userInfo])



    // Handlers
    // const deleteHandler = (id)=>{

    //     if(window.confirm('Are you sure?')){

    //         // dispatch(deleteOrder(id))

    //     }



    // }

    return (
        <>
        <h1>Orders</h1>
        {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>USER</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user.name}</td>
                            <td>{order.createdAt.substring(0,10)}</td>
                            <td>${order.totalPrice}</td>
                            <td>{order.isPaid ? order.paidAt.substring(0,10) : <i className='fas fa-times' style={{color:'red'}}></i>}</td>
                            <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : <i className='fas fa-times' style={{color:'red'}}></i>}</td>
                            <td>
                                <LinkContainer to={'/order/'+order._id}>
                                <Button className='btn-sm' variant='light'>
                                 Details
                                </Button>
                                </LinkContainer>
                                {/* <Button className='btn-sm' variant='danger' onClick={()=>deleteHandler(order._id)}>
                                 <i className='fas fa-trash'></i>
                                </Button> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}

        </>
    )
}

export default OrderListScreen
