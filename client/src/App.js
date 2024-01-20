import React, { useEffect } from 'react'
import { Routes, Route, useNavigate} from "react-router-dom";
import Login from './features/login/Login';
import Signup from './features/signup/Signup';
import { useDispatch, useSelector } from 'react-redux';
import Home from './features/home/Home';
import Profile from './features/profile/Profile.js';
import Shop from './features/shop/Shop.js';
import ProductPage from './features/shop/ProductPage.js';
import Bag from './features/bag/Bag.js';
import Checkout from './features/checkout/Checkout.js';
import ThankYou from './features/checkout/ThankYou.js';
import product_images from './images/images.js';
import ShowOrder from './features/profile/ShowOrder.js';
import NoUser from './NoUserError.js';

function App() {
  const currentUser = useSelector(state => state.currentUser.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/auth')
    .then(r => {
      if (r.ok){
        r.json().then(data => {
          if (data){
            navigate('/home')
            dispatch({type:'currentUser/login', payload:data})
          } 
        })
      }
    })
    
    fetch('/products')
    .then(r => r.json())
    .then(data => {
      data.map(product => {
        return product_images.map(image => {
          if (image.includes(product.image_path)){
            product.image = image
            return product
          }
          return null
        })
      })
      dispatch({type:'products/addProduct', payload:data})
    })
    
    //eslint claims navigate needs to be in dependancy array - this will cause useEffect() to run each time useNavigate() changes and routes to '/home' when any component uses useNavigate()
  
    // eslint-disable-next-line
  },[dispatch])

if (!currentUser){
  return (
    <Routes>
      <Route path='/' element={<Login />}/>
      <Route path='/signup' element={<Signup />}/>
      <Route path='/home' element={<NoUser/>}/>
      <Route path='/profile' element={<NoUser/>} />
      <Route path='/shop' element={<NoUser/>} />
      <Route path='/shop/:id' element={<NoUser/>} /> 
      <Route path='/bag' element={<NoUser/>} />
      <Route path='/bag/checkout' element={<NoUser/>} />
      <Route path='/bag/thankYou' element={<NoUser/>} />
      <Route path='/orders/:order_number' element={<NoUser/>} />
    </Routes>
  )
} else {
  return (
    <Routes>
      <Route path='/home' element={<Home />}/>
      <Route path='/profile' element={<Profile />} />
      <Route path='/shop' element={<Shop/>} />
      <Route path='/shop/:id' element={<ProductPage/>} /> 
      <Route path='/bag' element={<Bag />} />
      <Route path='/bag/checkout' element={<Checkout/>} />
      <Route path='/bag/thankYou' element={<ThankYou />} />
      <Route path='/orders/:order_number' element={<ShowOrder />} />
    </Routes>
  )
}

}

export default App;
