import React, { useContext } from 'react'
import { Dashboard } from '@uppy/react'
import PropTypes from 'prop-types'
import { useSpring, animated } from 'react-spring'
import { withTranslation } from 'react-i18next'
import { ModalContext } from '../../../context'
import './InteractiveFile.scss'

const InteractiveFile = ({ name, picture, uppy, removePicture, t }) => {
    let content
    const context = useContext(ModalContext)
    const [props, set] = useSpring(() => ({
        from: {
            left: '-275%',
        },
        config: {
            precision: 0.9,
            duration: 700,
        },
        reset: true,
    }))

    if (picture) {
        content = (
            <span
                className="icon remove"
                onClick={() => {
                    set({
                        to: [{ left: '150%' }],
                        from: { left: '-275%' },
                    })
                    setTimeout(() => {
                        removePicture(name)
                    }, 220)
                }}
            >
                <i className="far fa-trash-alt" />
            </span>
        )
    } else {
        content = (
            <>
                <div
                    className="click-zone"
                    onClick={() => {
                        context.openModalWith(
                            <Dashboard
                                uppy={uppy}
                                plugins={['Instagram', 'Webcam', 'Url']}
                                proudlyDisplayPoweredByUppy={false}
                                metaFields={[
                                    {
                                        id: 'name',
                                        name: 'Name',
                                        placeholder: 'File name',
                                    },
                                ]}
                                browserBackButtonClose
                            />
                        )
                    }}
                />
                <div className="click-bg">
                    <div className="bg" />
                    <span className="picture">
                        <i className="fas fa-camera-retro" />
                        <i className="fas fa-camera-retro" />
                    </span>
                </div>
            </>
        )
    }

    return (
        <div className="InteractiveFile" title={t('importPicture')}>
            <animated.div className="overlay-remove" style={props} />
            {content}
        </div>
    )
}

InteractiveFile.defaultProps = {
    picture: false,
}

InteractiveFile.propTypes = {
    name: PropTypes.string.isRequired,
    uppy: PropTypes.object.isRequired,
    picture: PropTypes.oneOfType([
        PropTypes.shape({
            src: PropTypes.string,
            name: PropTypes.string,
        }),
        PropTypes.bool,
    ]),
    removePicture: PropTypes.func.isRequired,
}

export default withTranslation('generator')(InteractiveFile)
