import React, {useRef, useEffect, useState} from 'react'
import { NavLink, useNavigate, Routes, Route } from 'react-router-dom';
import { Base } from '../../functionHelper/APIFunction';
import logo from '../../assets/images/logo.png'
import { Container, Row } from 'reactstrap';





const Header = () => {

  const headerRef = useRef(null);
  const menuRef = useRef(null)
  const navigate = useNavigate()
  const [show1, setShow1] = useState()
  const [show2, setShow2] = useState()

const stickyHeaderFunc = () => {
  window.addEventListener('scroll', ()=>{
    if(
      document.body.scrollTop > 80 || 
      document.documentElement.scrollTop > 80 
      ) {
    headerRef.current.classList.add('sticky__header')
    } else{
     headerRef.current.classList.remove('sticky__header')
    }
  });
}
useEffect(() => {
  stickyHeaderFunc();
  
  return () => window.removeEventListener("scroll", stickyHeaderFunc);
  
});
const token = JSON.stringify(Base.getCookie("token"));
useEffect(() => {
  if (token !== "null"){
    setShow1(false)
    setShow2(true)

    
  }
  if (token === "null"){

    setShow1(true)
    setShow2(false)

  }
  
}, [token]);


const menuToggle = () => menuRef.current.classList.toggle('active__menu')

const navigateToUser = () =>{
  navigate('/userdetail')
}




const logout =()=>{
  Base.setCookie("token", null, 0);
  window.location.href = "/login"
}
const login =()=>{
  navigate('/login')
}

  return ( 
  <header className="header" ref={headerRef}>
    <Container>
      <Row>
        <div className="nav__wrapper">
          <div className="logo">
            <img src={logo} alt='logo' />
            <div>
              <h1>DATA EVERYWHERE</h1>
              <p>Since 2023</p>
            </div>
          </div>

          <div className='navigation' ref={menuRef} onClick={menuToggle}>
            <ul className='menu'>
              
                  <li className="nav__item" >
                    <NavLink 
                    to="/home" 
                    className={(navClass) => 
                      navClass.isActive ? "nav__active" : ""
                    }>HOME
                      </NavLink>
                  </li>
                  <li className="nav__item" >
                    <NavLink 
                    to="/shop" 
                    className={(navClass) => 
                      navClass.isActive ? "nav__active" : ""
                    }>SHOP
                      </NavLink>
                  </li>

                  {show2&&<li className="nav__item" >
                    <NavLink 
                    to="/cart" 
                    className={(navClass) => 
                      navClass.isActive ? "nav__active" : ""
                    }>CART
                      </NavLink>
                  </li>}

                 {show2 && <li className="nav__item" >
                    <NavLink 
                    to="/purchased" 
                    className={(navClass) => 
                      navClass.isActive ? "nav__active" : ""
                    }>PURCHASED
                      </NavLink>
                  </li>}
            </ul>
          </div>

        <div className='nav__icons'>
          {show2 && <span className='cart__icon' onClick={navigateToUser}>
          <i class="ri-user-settings-fill"></i>
          <span className='profile__actions'>Profile</span>
          </span>}
          
          <div className='mobile__menu'>
          <span onClick={menuToggle}>
            <i class="ri-menu-line"></i>
          </span>
        </div>

        {show2 && <span className='fav__icon' onClick={logout}> 
          <i class="ri-logout-circle-r-line"></i>
          <span className='logout__actions'>Logout</span>
          </span>}
          
          {show1 &&<span className='fav__icon' onClick={login}> 
            <span className='login__header'>LOGIN</span>
          </span>}
          
        </div>

        
      </div>
      </Row>
    </Container>
  </header>
  );
};
export default Header