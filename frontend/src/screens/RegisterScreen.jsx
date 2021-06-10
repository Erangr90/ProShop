// React packages
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
// Redux packages
import {useDispatch,useSelector} from 'react-redux'
// Components
import { Col, Row, Button, Form } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
// Actions
import { register } from '../actions/usersActions'



const RegisterScreen = ({location,history}) => {

        // Data from the state
        const userRegister = useSelector(state => state.userRegister)
        const {loading, error, userInfo} = userRegister

        // Variables
        const dispatch = useDispatch()
        const [email,setEmail] = useState('')
        const [password,setPassword] = useState('')
        const [confirmPassword,setConfirmPassword] = useState('')
        const [name, setName] = useState('')
        const [message, setMessage] = useState(null)
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
            if(password !== confirmPassword){
                setMessage('Passwords do not match')
            }else{

                dispatch(register(name,email,password))

            }

        }

    return (
        <FormContainer>
            <h1>Sing Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}


            <Form onSubmit={submitHandler}>

            <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' placeholder='Enter name' value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm password</Form.Label>
            <Form.Control type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>Sing Up</Button>

            </Form>

            <Row className='py-3'>
                <Col>
                        Have an account ? {' '} <Link to={redirect ? '/login?redirect='+redirect : '/login'}>Login</Link>
                </Col>
            </Row>


        </FormContainer>
    )
}

export default RegisterScreen
