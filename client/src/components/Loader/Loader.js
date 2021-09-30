import React from 'react'
import LogoPokeball from '../../assets/img/pokeball.gif'

const Loader = () => (
    <div className="Loader">
        <div className="loader-container">
            <img src={LogoPokeball} alt="" className="gif-loader" />
        </div>
    </div>
)

export default Loader
