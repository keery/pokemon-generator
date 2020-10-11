import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GroupTitle } from '..'

class GroupBox extends Component {
    constructor(props) {
        super(props)
        this.contentRef = React.createRef()
        this.state = {
            maxHeight: 0,
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ maxHeight: this.contentRef.current.clientHeight })
        }, 1)
    }

    render() {
        const { children, open, onClick, stepNumber, title } = this.props
        const { maxHeight } = this.state

        return (
            <div className={`gfields-box ${open ? 'open' : ''}`}>
                <GroupTitle
                    onClick={() => {
                        onClick(stepNumber)
                    }}
                    stepNumber={stepNumber}
                    title={title}
                />
                <div
                    className="gfields-content-wrapper"
                    style={{ maxHeight: open ? maxHeight : 0 }}
                >
                    <div className="gfields-content" ref={this.contentRef}>
                        {children}
                    </div>
                </div>
            </div>
        )
    }
}

GroupBox.propTypes = {}

export default GroupBox
