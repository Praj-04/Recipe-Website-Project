import React from 'react'
import './About.scss'
import { Link } from 'react-router-dom'

function About() {
  return (
    <div className='About container-width'>
     
      <p className='styleP'>
        <div className='one'>
        RecipeHub is a platform built by and for people that enjoy cooking. 
        The cooks who dedicate their time to perfect recipes! 
        The bakers who labor over a showstopping 9-layer cake but will just as happily doctor boxed brownies for a decadent weeknight dessert. 
        The entertainers who just want a solid quick snack spread, without tons of dirty dishes at the end of the night.
        This is the place if you are looking for a particular recipe or would love to share your favorite recipes with the world!
        </div >
        <div className='one'>Come join us build the Recipe Hub!</div>
        
</p>

<div className="bottom-line">
<p className='two'>If you are new to this page and would like to contribute to Recipe Hub, please <Link to="/signup"> Sign Up  </Link></p>

<p className='two'>If you are already registered! what are you waiting for? Go build your recipes here <Link to="/"> Log In </Link> </p>
    
</div>

      
      </div>
  )
}

export default About