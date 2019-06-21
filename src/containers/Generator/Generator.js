import React, { Component } from 'react';
import { Stage } from 'react-konva';
import isEqual from 'lodash.isequal';
import CardRenderer from '../../components/CardRenderer';
import FileInput from '../../components/FileInput';
import SelectInput from '../../components/SelectInput/SelectInput';
import { ELEMENTS } from '../../const';

const DEFAULT_STATE = {
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
        attack1Amount: '1',
    },
    attack2 : {
        attack2Name: '',
        attack2Dammage: '',
        attack2Info: '',
        attack2Type: '',
        attack2Amount: '1',
    },
};

class Generator extends Component {

    constructor(props) {
        super(props)
        this.state = DEFAULT_STATE;
    }

    // componentDidMount() {*
    //     //Je récupère mon stage (ensemble de mon canvas)
    //     this.setState({canvas: this.stageRef.getStage()})
    // }

    handleChange = (event) => {
        const nested = event.target.getAttribute('nested')
        
        if (nested) this.setState({ [nested] : { ...this.state[nested], [event.target.name] : event.target.value }})
        else this.setState( { [event.target.name]  : event.target.value } )
    }

    exportCard = () => {
        const link = document.createElement("a");
        link.download = 'card.png';
        link.href = this.stageRef.getStage().toDataURL();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    printCard() {
        window.print();
    }

    resetCard = () => {
        if (!isEqual(this.state, DEFAULT_STATE) && confirm('Are you sure to want to reset your card ?')) this.setState(DEFAULT_STATE);
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

        return (
            <div className="Generator columns">
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
                                    <input type="text" name="name" className="input" onChange={this.handleChange} value={this.state.name} />
                                </div>
                                <div className="field">
                                    <label className="label">Type</label>
                                    <SelectInput
                                        name="type"
                                        onChange={this.handleChange}
                                        value={this.state.type}
                                        choices={ELEMENTS}
                                        blankLine={false}
                                    />
                                </div>
                                <div className="field">
                                    <label className="label">Picture</label>
                                    <FileInput
                                        name="mainPicture"
                                        onChange={this.fileHandler}
                                        value={this.state.mainPicture}
                                    />
                                </div>
                                <div className="field">
                                    <label className="label">HP</label>
                                    <SelectInput
                                        name="hp"
                                        onChange={this.handleChange}
                                        value={this.state.hp}
                                        choices={['30','40','50','60','70','80','90','100','110','120','130','140','150','160','170','180','190','200','210','220','230','240','250']}
                                        suffix=" HP"
                                        blankLine={false}
                                    />
                                </div>
                                <div className="field">
                                    <label className="label">Species</label>
                                    <input type="text" name="species" className="input" onChange={this.handleChange} value={this.state.species} />
                                </div>
                                <div className="field">
                                    <label className="label">Length</label>
                                    <input type="text" name="length" className="input" placeholder={`0' 0"`} onChange={this.handleChange} value={this.state.length} />
                                </div>
                                <div className="field">
                                    <label className="label">Weight</label>
                                    <input type="text" name="weight" className="input" placeholder="0 lbs" onChange={this.handleChange} value={this.state.weight} />
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
                                        <select name="stage" onChange={this.handleChange} value={this.state.stage}>
                                            <option value="basic">Basic</option>
                                            <option value="stage1">Stage 1</option>
                                            <option value="stage2">Stage 2</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Name</label>
                                    <input type="text" name="nameEvolution" className="input" onChange={this.handleChange} value={this.state.nameEvolution} />
                                </div>
                                <div className="field">
                                    <label className="label">Picture</label>
                                    <FileInput
                                        name="evolvePicture"
                                        onChange={this.fileHandler}
                                        value={this.state.evolvePicture}
                                    />
                                    
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
                                    <SelectInput
                                        name="weaknessType"
                                        onChange={this.handleChange}
                                        value={this.state.weaknessType}
                                        choices={ELEMENTS}
                                    />
                                </div>
                                <div className="field">
                                    <label className="label">Weakness amount</label>
                                    <SelectInput
                                        name="weaknessAmount"
                                        onChange={this.handleChange}
                                        value={this.state.weaknessAmount}
                                        choices={['+10', '+20', '+30', '+40', 'x2']}
                                    />
                                </div>
                                <div className="field">
                                    <label className="label">Resistance type</label>
                                    <SelectInput
                                        name="resistanceType"
                                        onChange={this.handleChange}
                                        value={this.state.resistanceType}
                                        choices={ELEMENTS}
                                    />
                                </div>
                                <div className="field">
                                    <label className="label">Resistance amount</label>
                                    <SelectInput
                                        name="resistanceAmount"
                                        onChange={this.handleChange}
                                        value={this.state.resistanceAmount}
                                        choices={['+10', '+20', '+30', '+40', 'x2']}
                                    />
                                </div>
                                <div className="field">
                                    <label className="label">Retreat</label>
                                    <SelectInput
                                        blankLine={false}
                                        name="retreat"
                                        onChange={this.handleChange}
                                        value={this.state.retreat}
                                        choices={['0', '1', '2', '3', '4']}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="gfields-box">
                        <div className="gfields-header" onClick={this.handleFieldBox}>
                            <div className="gfields-step">04</div>
                            <div>Attack 1</div>
                        </div>
                        <div className="gfields-content-wrapper">
                            <div className="gfields-content">
                                <div className="field">
                                    <label className="label">Name</label>
                                    <input type="text" name="attack1Name" nested="attack1" className="input" onChange={this.handleChange} value={this.state.attack1.attack1Name} />
                                </div>   
                                <div className="field">
                                    <label className="label">Dammage</label>
                                    <SelectInput
                                        name="attack1Dammage"
                                        onChange={this.handleChange}
                                        value={this.state.attack1.attack1Dammage}
                                        nested="attack1"
                                        choices={['10','10+','10x','20','20+','20x','30','30+','30x','40','50','60','70','80','90','100','120','150','200']}
                                    />
                                </div>    
                                <div className="field">
                                    <label className="label">Info</label>
                                    <textarea type="text" name="attack1Info" nested="attack1" className="input" onChange={this.handleChange} value={this.state.attack1.attack1Info} />
                                </div>   
                                <div className="field">
                                    <label className="label">Type</label>
                                    <div className="columns">
                                        <div className="column is-two-fifths">
                                            <SelectInput
                                                name="attack1Amount"
                                                onChange={this.handleChange}
                                                value={this.state.attack1.attack1Amount}
                                                nested="attack1"
                                                choices={['1', '2', '3', '4']}
                                                blankLine={false}
                                            />
                                        </div>
                                        <div className="column is-three-fifths"> 
                                            <SelectInput
                                                name="attack1Type"
                                                onChange={this.handleChange}
                                                value={this.state.attack1.attack1Type}
                                                choices={ELEMENTS}
                                                nested="attack1"
                                            />
                                        </div>
                                    </div>
                                </div>                                                        
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column is-half has-text-centered">
                    <div className="shape-wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" width="839" height="783" viewBox="0 0 839 783" id='shape-1' className="shape">
                            <path d="M417,9C581.813,25.749,841,231.508,839,361S745,609.688,669,678,467,857.556,237,708,3,523.361,1,403-11,235.147,125,107,299-2.992,417,9Z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="632" height="669" viewBox="0 0 632 669" id='shape-2' className="shape">
                            <path d="M386,2c96.9,36.313,196,224.529,212,265s54,103.656,20,162S508,564.756,468,597s-86,93.757-168,64S106,584.7,76,569,0,494.583,0,439,22,270.44,30,226s10-89.626,32-114S188,52.32,254,32,370-4,386,2Z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="839" height="783" viewBox="0 0 839 783" id='shape-3' className="shape">
                            <path d="M386,2c96.9,36.313,196,224.529,212,265s54,103.656,20,162S508,564.756,468,597s-86,93.757-168,64S106,584.7,76,569,0,494.583,0,439,22,270.44,30,226s10-89.626,32-114S188,52.32,254,32,370-4,386,2Z"/>
                        </svg>
                        <div id='circle-1' className='circle' />
                        <div id='circle-2' className='circle' />
                        <div id='circle-3' className='circle' />
                        <div id='circle-4' className='circle' />
                        <div id='circle-5' className='circle' />
                        <div id='shadow-card' />
                    </div>
                    <Stage width={360} height={506} ref={ref => { this.stageRef = ref; }}>
                        <CardRenderer {...this.state } />
                    </Stage>
                </div>
                <div className="column is-one-quarter">
                    <div className="gfields-box">
                        <div className="gfields-header" onClick={this.handleFieldBox}>
                            <div className="gfields-step">05</div>
                            <div>Attack 2</div>
                        </div>
                        <div className="gfields-content-wrapper">
                            <div className="gfields-content">
                                <div className="field">
                                    <label className="label">Name</label>
                                    <input type="text" name="attack2Name" className="input" onChange={this.handleChange} nested="attack2" value={this.state.attack2.attack2Name} />
                                </div>   
                                <div className="field">
                                    <label className="label">Dammage</label>
                                    <SelectInput
                                        name="attack2Dammage"
                                        onChange={this.handleChange}
                                        value={this.state.attack2.attack2Dammage}
                                        nested="attack2"
                                        choices={['10','10+','10x','20','20+','20x','30','30+','30x','40','50','60','70','80','90','100','120','150','200']}
                                    />
                                </div>    
                                <div className="field">
                                    <label className="label">Info</label>
                                    <textarea type="text" name="attack2Info" className="input" onChange={this.handleChange} nested="attack2" value={this.state.attack2.attack2Info} />
                                </div>   
                                <div className="field">
                                    <label className="label">Type</label>
                                    <div className="columns">
                                        <div className="column is-two-fifths">
                                            <SelectInput
                                                name="attack2Amount"
                                                onChange={this.handleChange}
                                                value={this.state.attack2.attack2Amount}
                                                nested="attack2"
                                                choices={['1', '2', '3', '4']}
                                                blankLine={false}
                                            /> 
                                        </div>
                                        <div className="column is-three-fifths">
                                            <SelectInput
                                                name="attack2Type"
                                                onChange={this.handleChange}
                                                value={this.state.attack2.attack2Type}
                                                choices={ELEMENTS}
                                                nested="attack2"
                                            />
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
                                    <textarea type="text" name="description" className="input" onChange={this.handleChange} value={this.state.description} />
                                </div>
                                <div className="field">
                                    <label className="label">Illustrator</label>
                                    <input type="text" name="illustrator" className="input" onChange={this.handleChange} value={this.state.illustrator} />
                                </div>
                                <div className="field">
                                    <label className="label">Collection number</label>
                                    <input type="text" name="cardNumber" className="input small" onChange={this.handleChange} maxLength={3} value={this.state.cardNumber} /> / 
                                    <input type="text" name="totalCollection" className="input small" onChange={this.handleChange} maxLength={3} value={this.state.totalCollection} />
                                </div>
                                <div className="field">
                                    <label className="label">Rarity</label>
                                    <SelectInput
                                        name="rarity"
                                        onChange={this.handleChange}
                                        value={this.state.rarity}
                                        choices={['Common', 'Uncommon', 'Rare']}
                                        blankLine={false}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='panel-actions'>
                        <button onClick={this.exportCard} className="gradient-btn" title="Download your creation">
                            <i className="fas fa-download" />
                        </button>
                        <button onClick={this.printCard} className="gradient-btn" title="Print your creation">
                            <i className="fas fa-print" />
                        </button>
                        <button className="gradient-btn" title="Save it">
                            <i className="fas fa-hdd" />
                        </button>
                        <button onClick={this.resetCard} className="gradient-btn" title="Try again">
                            <i className="fas fa-sync-alt" />
                        </button>
                        <button className="gradient-btn" title="Share to your friends">
                            <i className="fas fa-share-alt" />
                        </button>
                    </div>
                    <div className="signature">
                        <div className="version">
                            <b>Version 1.0</b>
                            <div>Pokemon Generator © { (new Date()).getFullYear() }</div>
                        </div>
                        <div className="signature-desc">
                        Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Generator;