// React packages
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// Components
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
// Screens
import HomeScreen from './screens/HomeScreen'

function App() {
  return (
    <Router>
    <Header/>
    <main className='py-3'>
    <Container>
      <Route path='/' component={HomeScreen} exact />
    </Container>
    </main>
    <Footer/>
    </Router>
  );
}

export default App;