import React, { useRef, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import logo from "../../assets/public/minilogo.svg"
import "./HeaderNew.css"
import { Base } from '../../functionHelper/APIFunction';
import { BiMenuAltRight } from 'react-icons/bi'
import OutsideClickHandler from 'react-outside-click-handler'
const HeaderNew = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null)
  const [show1, setShow1] = useState()
  const [show2, setShow2] = useState()

  const navigate = useNavigate()

  const stickyHeaderFunc = () => {
    window.addEventListener('scroll', () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add('sticky__header')
      } else {
        headerRef.current.classList.remove('sticky__header')
      }
    });
  }
  const token = JSON.stringify(Base.getCookie("token"));
  useEffect(() => {
    if (token !== "null") {
      setShow1(false)
      setShow2(true)


    }
    if (token === "null") {

      setShow1(true)
      setShow2(false)

    }

  }, [token]);
  useEffect(() => {
    try {
      stickyHeaderFunc();
      return () => window.removeEventListener("scroll", stickyHeaderFunc);

    } catch (e) {
      console.log(e)
    }


  });
  const logout = () => {
    Base.setCookie("token", null, 0);
    window.location.href = "/homenew"
  }
  const navigateToUser = () => {
    navigate('/userdetail')
  }
  const navigateToLogin = () => {
    navigate('/login')
  }
  const [menuOpened, setMenuOpened] = useState(false)
  const getMenuStyles = (menuOpened) => {
    if (document.documentElement.clientWidth <= 800) {
      return { right: !menuOpened && "-100%" }
    }
  }
  //const menuToggle = () => menuRef.current.classList.toggle('active__menu')

  return (
    <section className="h-wrapper" ref={headerRef} >
      <div className="flexCenter paddings innerWidth h-container">
        <h3 className=''><img src={logo} alt="logo" width={30} /> DATA EVERYWHERE  </h3>
        <OutsideClickHandler
          onOutsideClick={() => {
            setMenuOpened(false)
          }}
        >
          <div className='flexCenter h-menu' style={getMenuStyles(menuOpened)}>
            <p>
              <NavLink
                to="/homenew"
                className={(navClass) =>
                  navClass.isActive ? "nav__activee" : ""
                }>HOME
              </NavLink>
            </p>
            <p>
              <NavLink
                to="/shop"
                className={(navClass) =>
                  navClass.isActive ? "nav__activee" : ""
                }>SHOP
              </NavLink>
            </p>
            {show2 && <p>
              <NavLink
                to="/cart"
                className={(navClass) =>
                  navClass.isActive ? "nav__activee" : ""
                }>CART
              </NavLink>
            </p>}
            {show2 && <p>
              <NavLink
                to="/purchased"
                className={(navClass) =>
                  navClass.isActive ? "nav__activee" : ""
                }>PURCHASED
              </NavLink>
            </p>}

            {show2 && <div >

              <div className='nav'> <i class="ri-shield-user-fill" style={{ fontSize: "2rem" }}></i>
                <ul className="navclass " >
                  <li className='glow-on-hover2' onClick={navigateToUser}>PROFILE</li>
                  <li className='glow-on-hover2' onClick={logout}>LOGOUT</li>
                </ul>
              </div>

            </div>}
            {show1 &&
              <button className='button-hl' onClick={navigateToLogin}><span>LOGIN</span><i></i></button>
            }
            {/* {show2 && <button className='button' onClick={logout}>
                <BiLogOutCircle/>
                </button>} */}
          </div>
        </OutsideClickHandler>
        <div className="menu-icon" onClick={() => setMenuOpened((prev) => !prev)}>
          <BiMenuAltRight size={30} />
        </div>
      </div>

    </section>
  )
}

export default HeaderNew