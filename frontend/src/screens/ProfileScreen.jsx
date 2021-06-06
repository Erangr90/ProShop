// React packages
import React, {useEffect, useState} from 'react'
// Redux packages
import {useDispatch,useSelector} from 'react-redux'
// Components
import { Col, Row, Button, Form } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
// Actions
import { getUserProfile ,updateUserProfile, resetUserProfile } from '../actions/usersActions'



const ProfileScreen = ({location,history}) => {

        const [email,setEmail] = useState('')
        const [password,setPassword] = useState('')
        const [confirmPassword,setConfirmPassword] = useState('')
        const [name, setName] = useState('')
        const [message, setMessage] = useState(null)

        const userProfile = useSelector(state => state.userProfile)
        const {loading, error, user} = userProfile

        const userLogin = useSelector(state => state.userLogin)
        const {userInfo} = userLogin

        const updateProfile = useSelector(state => state.updateProfile)
        const{success} = updateProfile

        const dispatch = useDispatch()



        useEffect(() => {
            if(!userInfo){
                history.push('/login')

            }else{
                if(!user || !user.name || success){
                    dispatch(resetUserProfile())
                    dispatch(getUserProfile('profile'))
                }else {
                    setName(user.name)
                    setEmail(user.email)
                }
            }

        }, [dispatch, history, success, user, userInfo])


        const submitHandler = (e)=>{
            e.preventDefault()
            if(password !== confirmPassword){
                setMessage('Passwords do not match')
            }else{
                dispatch(updateUserProfile({id:user._id,name,email,password}))


            }

        }

    return (
        <Row>
            <Col md={3}>

            <h2>User Profile</h2>
            {message && <Message variant='danger'>{message}</Message>}
            {success && <Message variant='success'>Profile updated !</Message>}
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

            <Button type='submit' variant='primary'>Update</Button>

            </Form>

            </Col>
            <Col md={9}>

            <h2>My Orders</h2>

            </Col>
        </Row>
    )
}

export default ProfileScreen
