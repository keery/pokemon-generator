import React from 'react'

const Loader = () => (
  <div className="Loader">
    <div className="loader-container">
      <img
        src={`${process.env.REACT_APP_FRONT_URL}/assets/img/pokeball.gif`}
        alt=""
        className="gif-loader"
      />
    </div>
  </div>
)

export default Loader
