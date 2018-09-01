import React, { Component } from 'react';
import CardRenderer from '../../components/CardRenderer/CardRenderer'

class Generator extends Component {

    constructor(props) {
        super(props)
        this.state = {
            type: 'fire',
            stage: 'stage1',
            name: '',
            nameEvolution: '',
            mainPicture: null,
            evolvePicture: null
        }
    }

    handleChange = (event) => {
        this.setState( { [event.target.name]  : event.target.value } )
    }

    fileHandler = (event) => {
        const files = event.target.files
        
        if(files.length > 0) {
            const file = files[0]
            const reader = new FileReader()
            const eventName = event.currentTarget.name

            reader.onloadend = () => {
                const img = new Image()
                img.src = reader.result
                
                img.onload = () => {
                    let imgResized = null
                    if(eventName === 'mainPicture') imgResized = this.resizeImg(img, 275, 196)
                    else if(eventName === 'evolvePicture') imgResized = this.resizeImg(img, 44, 40)

                    this.setState( { [eventName]  : imgResized } )
                }
            }

            reader.readAsDataURL(file)
        }
    }

    calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {

        if(srcWidth > maxWidth || srcHeight > maxHeight) {
            let height = 0
            let width = 0

            if(srcWidth > srcHeight) {
                height = maxHeight + 4
                width = (srcWidth / srcHeight) * height
            }
            else {
                width = maxWidth + 4
                height = (srcHeight / srcWidth) * width
            }

            return { width: width, height: height };

        }
        
        return { width: srcWidth, height: srcHeight };
    }

    resizeImg(img, maxWidth, maxHeight) {
        const ratio = this.calculateAspectRatioFit(img.width, img.height, maxWidth, maxHeight)

        img.width = ratio.width
        img.height = ratio.height
        return img
    }

    render() {
        const { type, stage, name, nameEvolution, mainPicture, evolvePicture } = this.state
        
        return (
            <div className="columns is-centered">
                <div className="column is-one-quarter">
                    <div className="gfields box">
                        <div className="gfields-header">
                            <div></div>
                            <div>Pokémon info</div>
                        </div>
                        <div className="gfields-content">
                            <div className="field">
                                <label className="label">Name</label>
                                <input type="text" name="name" className="input" onChange={this.handleChange} />
                            </div>
                            <div className="field">
                                <label className="label">Type</label>
                                <div className="select">
                                    <select name="type" onChange={this.handleChange}>
                                        <option value="fire">Fire</option>
                                        <option value="grass">Grass</option>
                                        <option value="water">Water</option>
                                        <option value="electric">Electric</option>
                                        <option value="psychic">Psychic</option>
                                        <option value="fighting">Fighting</option>
                                        <option value="normal">Normal</option>
                                        <option value="steel">Steel</option>
                                        <option value="dark">Dark</option>
                                    </select>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Picture</label>
                                <div>
                                    <div className="field">
                                        <div className="file is-primary is-boxed">
                                            <label className="file-label">
                                                <input className="file-input" type="file" name="mainPicture" onChange={this.fileHandler} />
                                                <span className="file-cta">
                                                    <span className="file-icon"><i className="fas fa-cloud-upload-alt"></i></span>
                                                    <span className="file-label">Upload picture</span>
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column is-half has-text-centered">
                    <CardRenderer 
                        type={type} 
                        name={name} 
                        stage={stage}
                        nameEvolution={nameEvolution}
                        mainPicture={mainPicture}
                        evolvePicture={evolvePicture}
                    />
                </div>
                <div className="column is-one-quarter">
                    <div className="gfields box">
                        <div className="gfields-header">
                            <div></div>
                            <div>Evolution</div>
                        </div>
                        <div className="gfields-content">
                            <div className="field">
                                <label className="label">Stage</label>
                                <div className="select">
                                    <select name="stage" onChange={this.handleChange}>
                                        <option value="basic">Basic</option>
                                        <option value="stage1">Stage 1</option>
                                        <option value="stage2">Stage 2</option>
                                    </select>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Name</label>
                                <input type="text" name="nameEvolution" className="input" onChange={this.handleChange} />
                            </div>
                            <div className="field">
                                <label className="label">Picture</label>
                                <div>
                                    <div className="field">
                                        <div className="file is-primary is-boxed">
                                            <label className="file-label">
                                                <input className="file-input" type="file" name="evolvePicture" onChange={this.fileHandler} />
                                                <span className="file-cta">
                                                    <span className="file-icon"><i className="fas fa-cloud-upload-alt"></i></span>
                                                    <span className="file-label">Upload picture</span>
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Generator;