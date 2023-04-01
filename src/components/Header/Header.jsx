import React, {useRef, useEffect} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import './header.css'

import logo from '../../assets/images/logo.png'
import { Container, Row } from 'reactstrap';
//import { useSelector } from 'react-redux';

const nav__links = [
  {
    path:'home' ,
    display: 'Home'
  },
  {
    path: 'shop',
    display: 'Shop'
  },
  {
    path: 'cart',
    display: 'Cart'
  },
  {
    path: 'purchased',
    display: 'Purchased'
  },
]



const Header = () => {

  const headerRef = useRef(null);
  const menuRef = useRef(null)
  const navigate = useNavigate()


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

const menuToggle = () => menuRef.current.classList.toggle('active__menu')
const navigateToCart =()=>{
  navigate('/cart')

}

const navigateToUser = () =>{
  navigate('/userdetail')
}

const navigateToPurchased = () => {
  navigate('/purchased')
}
const logout =()=>{
  navigate('/login')
  localStorage.removeItem('token')
  sessionStorage.removeItem('token')
}
  return ( 
  <header className="header" ref={headerRef}>
    <Container>
      <Row>
        <div className="nav__wrapper">
          <div className="logo">
            <img src={logo} alt='logo' />
            <div>
              <h1>Dataset</h1>
              {/* <p>Since 2022</p> */}
            </div>
          </div>

          <div className='navigation' ref={menuRef} onClick={menuToggle}>
            <ul className='menu'>
              {
                nav__links.map((item, index)=>(
                  <li className="nav__item" key={index}>
                    <NavLink 
                    to={item.path} 
                    className={(navClass) => 
                      navClass.isActive ? "nav__active" : ""
                    }>{
                      item.display}
                      </NavLink>
                  </li>
                ))
              }
            </ul>
          </div>

        <div className='nav__icons'>
          <span className='fav__icon' onClick={navigateToPurchased}> 
            <i class="ri-heart-line"></i>
            <span className='badge'></span>
          </span>
          <span className='cart__icon' onClick={navigateToCart}>
            <i class="ri-shopping-bag-line"></i>
            <span className='badge'></span>
          </span>
         
          <span className='cart__icon' onClick={navigateToUser}>
          <i class="ri-user-settings-fill"></i>
          </span>
          <div className='mobile__menu'>
          <span onClick={menuToggle}>
            <i class="ri-menu-line"></i>
          </span>
        </div>
        <span className='fav__icon' onClick={logout}> 
          <i class="ri-logout-circle-r-line"></i>
            <span className='badge'></span>
          </span>
        </div>

        
      </div>
      </Row>
    </Container>
  </header>
  );
};
export default Header