import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer'
import Header from '../../components/Header'



function HeadFootOutlate() {
  return (
    <div>
         
    <Outlet/>
    <Footer />
   
    </div>
  )
}

export default HeadFootOutlate;