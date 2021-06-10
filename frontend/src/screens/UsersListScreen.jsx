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
import { getAllUsers, deleteUser } from '../actions/usersActions'

const UsersListScreen = ({history}) => {


    // Data from the state
    const allUsers = useSelector(state => state.allUsers)
    const {loading,error,users} = allUsers

    const userLogin = useSelector(state => state.userLogin)
    const{userInfo} = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const {success:successDelete} = userDelete


    // Variables
    const dispatch = useDispatch()


    // Listen to data variables
    useEffect(() => {

        if(userInfo && userInfo.isAdmin){

            dispatch(getAllUsers())


        }else{

            history.push('/login')

        }

    }, [dispatch, history, userInfo,successDelete])



    // Handlers
    const deleteHandler = (id)=>{

        if(window.confirm('Are you sure?')){

            dispatch(deleteUser(id))

        }



    }

    return (
        <>
        <h1>Users</h1>
        {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>IS_ADMIN</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td><a href={'mailto:'+user.email}>{user.email}</a></td>
                            <td>{user.isAdmin ? <i className='fas fa-check' style={{color:'green'}}></i> : <i className='fas fa-times' style={{color:'red'}}></i>}</td>
                            <td>
                                <LinkContainer to={'/user/'+user._id+'/edit'}>
                                <Button className='btn-sm' variant='light'>
                                 <i className='fas fa-edit'></i>
                                </Button>
                                </LinkContainer>
                                <Button className='btn-sm' variant='danger' onClick={()=>deleteHandler(user._id)}>
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

export default UsersListScreen
