import React from 'react';
import { useState } from 'react';
import "../Header/Header.css"
import Logo from "../../Images/logo-light.svg"
import { Link } from 'react-router-dom';

const Header = () => {

    const [ExtendNavbar,setExtendNavbar ] = useState(false)

return (
    <div className='Header'>
        <article>
            <section>
                <Link Link to="/" className='Link'  >
                    <img src={Logo} alt="" />
                </Link>
            </section>
            <section>
                <nav className={ExtendNavbar ? "CloseNavigation" : "OpenNavigation" } onClick={() => setExtendNavbar(false)}>
                    <Link Link to="/" className='Link Navigate'  >
                        <p>Home</p> 
                    </Link>
                    <Link Link to="Explore" className='Link Navigate'  >
                        <p>Explore</p>
                    </Link>
                    <Link Link to="Categories" className='Link Navigate'  >
                        <p>Categories</p>
                    </Link>
                    <Link Link to="Nationality" className='Link Navigate'  >
                        <p>Nationality</p>
                    </Link>
                    <Link Link to="Favourites" className='Link Navigate' id='Favourites' > 
                        <p>Favourites</p>
                    </Link>
                </nav>
            </section>
            <section>
                <figure onClick={()=> {setExtendNavbar((curr) => !curr)}}>
                    {ExtendNavbar ? <i id="Bars" class="fa-solid fa-bars"></i> : <i id='Bars' class="fa-solid fa-xmark"></i> }
                </figure>
                <Link Link to="/Favourites" className='Link'  >
                    <button>
                    <i class="fa-solid fa-bookmark"></i>Favourites</button>
                </Link>
            </section>
        </article>
    </div>
)
}

export default Header