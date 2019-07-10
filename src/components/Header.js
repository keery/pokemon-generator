import React from 'react'
import LogoPokeball from '../assets/img/pokeball.png'

const Header = () => (
    <header>
        <nav>
            <div className="container is-fluid">
                <div className="logo-container">
                <div>
                    
                    <a id='logo'>
                        <img src={LogoPokeball} alt="Logo Pokemon Generator" />
                    </a>
                </div>
                    <div id="logo-title">POKEMON GENERATOR</div>
                </div>
                <div className="menu-left">
                    <a title="Sign up">Sign up</a>
                    <a className="gradient-btn tiny" title="Sign in">
                        <i className="fas fa-user"/>Sign in
                    </a>
                </div>
            </div>
        </nav>
    </header>
)

export default Header