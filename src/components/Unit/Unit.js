import PropTypes from 'prop-types'
import React, { Component } from 'react'


class Button extends Component {
    state = { 
        value: '',
        link: '',
        title: '',
        callback: '',
        class: ''
    }

    render() {
        return (
            <div></div>
        )
    }
}

Button.propTypes = {
  guesses: PropTypes.number.isRequired,
}

export default Button