import React, { Component } from 'react';
import CardRenderer from '../../components/CardRenderer/CardRenderer'
import { remove } from '../../helper/helper';

const ELEMENTS = [
    'Fire',
    'Grass',
    'Water',
    'Electric',
    'Psychic',
    'Fighting',
    'Normal',
    'Steel',
    'Dark',
];

const ElementsOptions = ELEMENTS.map(element => <option key={element} value={element.toLowerCase()}>{element}</option>);

class Generator extends Component {

    constructor(props) {
        super(props)
        this.state = {
            type: 'fire',
            stage: 'basic',
            name: '',
            nameEvolution: '',
            mainPicture: null,
            evolvePicture: null,
            hp: 30,
            weaknessType : '',
            weaknessAmount : '',
            resistanceType : '',
            resistanceAmount : '',
            retreat : '',
            description : '',
            illustrator : '',
            cardNumber : '',
            totalCollection : '',
            rarity : '',
            species : '',
            length : '',
            weight : '',
            attack1 : {
                attack1Name: '',
                attack1Dammage: '',
                attack1Info: '',
                attack1Type: '',
                attack1Amount: '',
            },
            attack2 : {
                attack2Name: '',
                attack2Dammage: '',
                attack2Info: '',
                attack2Type: '',
                attack2Amount: '',
            },
        }
    }

    handleChange = (event) => {
        const nested = event.target.getAttribute('nested')
        
        if (nested) {
            this.setState({ [nested] : { ...this.state[nested], [event.target.name] : event.target.value }})
        }
        else this.setState( { [event.target.name]  : event.target.value } )
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

    handleFieldBox(event) {
        const _this = event.currentTarget
        const parent = _this.parentNode

        if (!parent.classList.contains('open')) {
            const boxes = document.getElementsByClassName('gfields-box');
            
            if (boxes.length > 0) {
                for (let i = 0; i < boxes.length; i++) {
                    boxes[i].classList.remove('open')
                    boxes[i].querySelector('.gfields-content-wrapper').style.maxHeight = "0px"
                }
            }
        }

        const height = parent.classList.toggle('open') ? parent.querySelector('.gfields-content').clientHeight : 0

        _this.nextSibling.style.maxHeight = `${height}px`
    }

    render() {
        const { type, stage, name, nameEvolution, mainPicture, evolvePicture, hp, attack1, attack2, weaknessAmount, weaknessType, resistanceAmount, resistanceType, retreat, description, illustrator, cardNumber, totalCollection, rarity, species, length, weight } = this.state
        
        return (
            <div className="columns is-centered">
                <div className="column is-one-quarter">
                    <div className="gfields-box">
                        <div className="gfields-header" onClick={this.handleFieldBox}>
                            <div className="gfields-step">01</div>
                            <div>Pokémon info</div>
                        </div>
                        <div className="gfields-content-wrapper">
                            <div className="gfields-content">
                                <div className="field">
                                    <label className="label">Name</label>
                                    <input type="text" name="name" className="input" onChange={this.handleChange} />
                                </div>
                                <div className="field">
                                    <label className="label">Type</label>
                                    <div className="select">
                                        <select name="type" onChange={this.handleChange}>
                                            { ElementsOptions }
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
                                <div className="field">
                                    <label className="label">HP</label>
                                    <div className="select">
                                        <select name="hp" onChange={this.handleChange}>
                                            <option value="30">30 HP</option>
                                            <option value="40">40 HP</option>
                                            <option value="50">50 HP</option>
                                            <option value="60">60 HP</option>
                                            <option value="70">70 HP</option>
                                            <option value="80">80 HP</option>
                                            <option value="90">90 HP</option>
                                            <option value="100">100 HP</option>
                                            <option value="110">110 HP</option>
                                            <option value="120">120 HP</option>
                                            <option value="130">130 HP</option>
                                            <option value="140">140 HP</option>
                                            <option value="150">150 HP</option>
                                            <option value="160">160 HP</option>
                                            <option value="170">170 HP</option>
                                            <option value="180">180 HP</option>
                                            <option value="190">190 HP</option>
                                            <option value="200">200 HP</option>
                                            <option value="210">210 HP</option>
                                            <option value="220">220 HP</option>
                                            <option value="230">230 HP</option>
                                            <option value="240">240 HP</option>
                                            <option value="250">250 HP</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Species</label>
                                    <input type="text" name="species" className="input" onChange={this.handleChange} />
                                </div>
                                <div className="field">
                                    <label className="label">Length</label>
                                    <input type="text" name="length" className="input" placeholder={`0' 0"`} onChange={this.handleChange} />
                                </div>
                                <div className="field">
                                    <label className="label">Weight</label>
                                    <input type="text" name="weight" className="input" placeholder="0 lbs" onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="gfields-box">
                        <div className="gfields-header" onClick={this.handleFieldBox}>
                            <div className="gfields-step">02</div>
                            <div>Evolution</div>
                        </div>
                        <div className="gfields-content-wrapper">
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
                                                        <span className="file-icon"><i className="fas fa-cloud-upload-alt" /></span>
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
                    <div className="gfields-box">
                        <div className="gfields-header" onClick={this.handleFieldBox}>
                            <div className="gfields-step">03</div>
                            <div>Weakness, resistance and retreat cost</div>
                        </div>
                        <div className="gfields-content-wrapper">
                            <div className="gfields-content">
                                <div className="field">
                                    <label className="label">Weakness type</label>
                                    <div className="select">
                                        <select name="weaknessType" onChange={this.handleChange}>
                                            <option value=""></option>
                                            { ElementsOptions }
                                        </select>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Weakness amount</label>
                                    <div className="select">
                                        <select name="weaknessAmount" onChange={this.handleChange}>
                                            <option value=""> </option>
                                            <option value="+10">+10</option>
                                            <option value="+20">+20</option>
                                            <option value="+30">+30</option>
                                            <option value="+40">+40</option>
                                            <option value="x2">x2</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Resistance type</label>
                                    <div className="select">
                                        <select name="resistanceType" onChange={this.handleChange}>
                                            <option value=""></option>
                                            { ElementsOptions }
                                        </select>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Resistance amount</label>
                                    <div className="select">
                                        <select name="resistanceAmount" onChange={this.handleChange}>
                                            <option value=""> </option>
                                            <option value="+10">+10</option>
                                            <option value="+20">+20</option>
                                            <option value="+30">+30</option>
                                            <option value="+40">+40</option>
                                            <option value="x2">x2</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Retreat</label>
                                    <div className="select">
                                        <select name="retreat" onChange={this.handleChange}>
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                        </select>
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
                        hp={hp}
                        attack1={attack1}
                        attack2={attack2}
                        weaknessType={weaknessType}
                        weaknessAmount={weaknessAmount}
                        resistanceType={resistanceType}
                        resistanceAmount={resistanceAmount}
                        retreat={retreat}
                        description={description}
                        illustrator={illustrator}
                        cardNumber={cardNumber}
                        totalCollection={totalCollection}
                        rarity={rarity}
                        species={species}
                        length={length}
                        weight={weight}
                    />
                </div>
                <div className="column is-one-quarter">
                    <div className="gfields-box">
                        <div className="gfields-header" onClick={this.handleFieldBox}>
                            <div className="gfields-step">04</div>
                            <div>Attack 1</div>
                        </div>
                        <div className="gfields-content-wrapper">
                            <div className="gfields-content">
                                <div className="field">
                                    <label className="label">Name</label>
                                    <input type="text" name="attack1Name" nested="attack1" className="input" onChange={this.handleChange} />
                                </div>   
                                <div className="field">
                                    <label className="label">Dammage</label>
                                    <div className="select">
                                        <select name="attack1Dammage" onChange={this.handleChange} nested="attack1">
                                            <option value=" "></option>
                                            <option value="10">10</option>
                                            <option value="10+">10+</option>
                                            <option value="10x">10x</option>
                                            <option value="20">20</option>
                                            <option value="20+">20+</option>
                                            <option value="20x">20x</option>
                                            <option value="30">30</option>
                                            <option value="30+">30+</option>
                                            <option value="30x">30x</option>
                                            <option value="40">40</option>
                                            <option value="50">50</option>
                                            <option value="60">60</option>
                                            <option value="70">70</option>
                                            <option value="80">80</option>
                                            <option value="90">90</option>
                                            <option value="100">100</option>
                                            <option value="120">120</option>
                                            <option value="150">150</option>
                                            <option value="200">200</option>
                                        </select>
                                    </div>
                                </div>    
                                <div className="field">
                                    <label className="label">Info</label>
                                    <textarea type="text" name="attack1Info" nested="attack1" className="input" onChange={this.handleChange}></textarea>
                                </div>   
                                <div className="field">
                                    <label className="label">Type</label>
                                    <div className="columns">
                                        <div className="column is-two-fifths"> 
                                            <div className="select">
                                                <select name="attack1Amount" nested="attack1" onChange={this.handleChange}>
                                                    <option value=""></option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="column is-three-fifths"> 
                                            <div className="select">                                    
                                                <select name="attack1Type" nested="attack1" onChange={this.handleChange}>
                                                    <option value=""></option>
                                                    { ElementsOptions }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>                                                        
                            </div>
                        </div>
                    </div>
                    <div className="gfields-box">
                        <div className="gfields-header" onClick={this.handleFieldBox}>
                            <div className="gfields-step">05</div>
                            <div>Attack 2</div>
                        </div>
                        <div className="gfields-content-wrapper">
                            <div className="gfields-content">
                                <div className="field">
                                    <label className="label">Name</label>
                                    <input type="text" name="attack2Name" className="input" onChange={this.handleChange} nested="attack2" />
                                </div>   
                                <div className="field">
                                    <label className="label">Dammage</label>
                                    <div className="select">
                                        <select name="attack2Dammage" onChange={this.handleChange} nested="attack2">
                                            <option value=" "></option>
                                            <option value="10">10</option>
                                            <option value="10+">10+</option>
                                            <option value="10x">10x</option>
                                            <option value="20">20</option>
                                            <option value="20+">20+</option>
                                            <option value="20x">20x</option>
                                            <option value="30">30</option>
                                            <option value="30+">30+</option>
                                            <option value="30x">30x</option>
                                            <option value="40">40</option>
                                            <option value="50">50</option>
                                            <option value="60">60</option>
                                            <option value="70">70</option>
                                            <option value="80">80</option>
                                            <option value="90">90</option>
                                            <option value="100">100</option>
                                            <option value="120">120</option>
                                            <option value="150">150</option>
                                            <option value="200">200</option>
                                        </select>
                                    </div>
                                </div>    
                                <div className="field">
                                    <label className="label">Info</label>
                                    <textarea type="text" name="attack2Info" className="input" onChange={this.handleChange} nested="attack2"></textarea>
                                </div>   
                                <div className="field">
                                    <label className="label">Type</label>
                                    <div className="columns">
                                        <div className="column is-two-fifths"> 
                                            <div className="select">
                                                <select name="attack2Amount" onChange={this.handleChange} nested="attack2">
                                                    <option value=""></option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="column is-three-fifths"> 
                                            <div className="select">                                    
                                                <select name="attack2Type" onChange={this.handleChange} nested="attack2">
                                                    <option value=""></option>
                                                    { ElementsOptions }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>                                                        
                            </div>
                        </div>
                    </div>
                    <div className="gfields-box">
                        <div className="gfields-header" onClick={this.handleFieldBox}>
                            <div className="gfields-step">06</div>
                            <div>Additional information</div>
                        </div>
                        <div className="gfields-content-wrapper">
                            <div className="gfields-content">
                                <div className="field">
                                    <label className="label">Description</label>
                                    <textarea type="text" name="description" className="input" onChange={this.handleChange} />
                                </div>
                                <div className="field">
                                    <label className="label">Illustrator</label>
                                    <input type="text" name="illustrator" className="input" onChange={this.handleChange} />
                                </div>
                                <div className="field">
                                    <label className="label">Collection number</label>
                                    <input type="text" name="cardNumber" className="input small" onChange={this.handleChange} maxLength={3} /> / 
                                    <input type="text" name="totalCollection" className="input small" onChange={this.handleChange} maxLength={3} />
                                </div>
                                <div className="field">
                                    <label className="label">Rarity</label>
                                    <div className="select">
                                        <select name="rarity" onChange={this.handleChange}>
                                            <option value=""></option>
                                            <option value="common">Common</option>
                                            <option value="uncommon">Uncommon</option>
                                            <option value="rare">Rare</option>
                                        </select>
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