// React packages
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
// Redux packages
import {useDispatch, useSelector} from 'react-redux'
// Components
import { Col, Row, Button, Form } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
// Actions
import { login } from '../actions/usersActions'



const LoginScreen = ({location,history}) => {




        // Data from the state
        const userLogin = useSelector(state => state.userLogin)
        const {loading, error, userInfo} = userLogin

        // Variables
        const dispatch = useDispatch()
        const [email,setEmail] = useState('')
        const [password,setPassword] = useState('')
        const redirect = location.search ? location.search.split('=')[1] : '/'


        // Listen to data variables
        useEffect(() => {
            if(userInfo){
                history.push(redirect)
            }
        }, [history, redirect, userInfo])


        // Handlers
        const submitHandler = (e)=>{
            e.preventDefault()
            dispatch(login(email,password))

        }

    return (
        <FormContainer>
            <h1>Sing in</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}


            <Form onSubmit={submitHandler}>

            <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>Sing In</Button>

            </Form>

            <Row className='py-3'>
                <Col>
                        New Customer ? {' '} <Link to={redirect ? '/register?redirect='+redirect : '/register'}>Sing up</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
