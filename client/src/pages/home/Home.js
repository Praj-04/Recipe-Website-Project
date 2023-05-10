import React, { useEffect } from 'react'
import './Home.scss'
import NavBar from '../../components/navBar/NavBar'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getAllRecipes } from '../../redux/slices/recipeSlice'
import UserNavBar from '../../components/userNavBar/UserNavBar'


function Home() {


  const dispatch =  useDispatch()

  useEffect(()=>{
    dispatch(getAllRecipes())
  },[])

  return (
    <>
      <NavBar />
      {/* <UserNavBar /> */}
      <Outlet />


    </>
  )
}

export default Home