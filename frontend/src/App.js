// React packages
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// Components
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
// Screens
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UsersScreen from './screens/UsersListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductsListScreen from './screens/ProductsListScreen'
import ProductEditScreen from './screens/ProductEditScreen'

function App() {
  return (
    <Router>
    <Header/>
    <main className='py-3'>
    <Container>

      <Route path='/admin/products' component={ProductsListScreen} />
      <Route path='/admin/users' component={UsersScreen} />
      <Route path='/placeorder' component={PlaceOrderScreen} />
      <Route path='/payment' component={PaymentScreen} />
      <Route path='/shipping' component={ShippingScreen} />
      <Route path='/profile' component={ProfileScreen} />
      <Route path='/register' component={RegisterScreen} />
      <Route path='/login' component={LoginScreen} />
      <Route path='/cart/:id?' component={CartScreen} />
      <Route path='/products/:id?' component={ProductScreen} />
      <Route path='/order/:id' component={OrderScreen} />
      <Route path='/admin/user/:id/edit' component={UserEditScreen} />
      <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
      <Route path='/' component={HomeScreen} exact />
    </Container>
    </main>
    <Footer/>
    </Router>
  );
}

export default App;
