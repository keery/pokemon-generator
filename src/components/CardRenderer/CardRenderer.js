import React, { Component, Fragment } from 'react'
import { Stage, Layer, Text, Group, Image as ImageCanvas, Rect } from 'react-konva';
import Attack from '../Attack/Attack';
import TypeAmount from '../TypeAmount/TypeAmount';
import sliceStageImg from '../../assets/1-gen/slice-stage.png'
import '../../containers/App/App.scss';

import { isEmpty } from '../../helper/helper';

class CardRenderer extends Component {
    constructor(props) {
        super(props)
        const { 
            type, stage, name, nameEvolution, mainPicture, evolvePicture, hp, attack1, attack2, weaknessAmount, weaknessType, resistanceAmount, resistanceType, retreat, description, illustrator, cardNumber, totalCollection, rarity, species, length, weight,
        } = props

        this.state = {
            type: type || 'fire',
            stage: stage || 'basic',
            name,
            nameEvolution,
            mainPicture,
            mainPictureX: -2,
            mainPictureY: 0,
            evolvePicture : evolvePicture,
            evolvePictureX: 0,
            evolvePictureY: 0,
            nameX: 35,
            nameY: 34,
            canvas: null,
            hp,
            bg: this.getBackground("bg", type, stage),
            sliceStage: this.generateImg(sliceStageImg),
            attack1,
            attack2,
            weaknessAmount,
            weaknessType,
            resistanceAmount,
            resistanceType,
            retreat,
            description,
            illustrator,
            cardNumber,
            totalCollection,
            rarity,
            rarityLogo : null,
            species,
            length,
            weight,
        }
    }

    componentWillReceiveProps(nextProps) { 
        const { type, stage, weaknessType, resistanceType, retreat, rarity, attack1 : { attack1Type, attack1Amount }, attack2 : { attack2Type, attack2Amount }} = nextProps        
        const newState = {...nextProps}

        //Je décale le nom si c'est une évolution
        newState.nameX = (stage !== "basic" ? 95 : 35)
        
        if(stage !== "" && type !== "") {
            const bg = new Image()
            bg.src = require("../../assets/1-gen/"+type+"-"+stage+".png")
            bg.onload = () => {
                newState.bg = bg
                this.setState(newState)            
            }
        }

        if(attack1Type !== "" && attack1Amount !== "") {
            const img = new Image()
            img.src = require("../../assets/1-gen/"+attack1Amount+"-"+attack1Type+".png")
            img.onload = () => {
                newState.attack1.attack1Img = img
                this.setState(newState)            
            }
        }
        else newState.attack1.attack1Img = null 

        if(attack2Type !== "" && attack2Amount !== "") {
            const img = new Image()
            img.src = require("../../assets/1-gen/"+attack2Amount+"-"+attack2Type+".png")
            img.onload = () => {
                newState.attack2.attack2Img = img
                this.setState(newState)            
            }
        }
        else newState.attack2.attack2Img = null 

        if(weaknessType !== "") {
            const img = new Image()
            img.src = require("../../assets/1-gen/1-"+weaknessType+".png")
            img.onload = () => {
                newState.weaknessImg = img
                this.setState(newState)            
            }
        }
        else newState.weaknessImg = null 

        if(resistanceType !== "") {
            const img = new Image()
            img.src = require("../../assets/1-gen/1-"+resistanceType+".png")
            img.onload = () => {
                newState.resistanceImg = img
                this.setState(newState)            
            }
        }
        else newState.resistanceImg = null 

        if(retreat > 0 && retreat <= 4) {
            const img = new Image()
            img.src = require("../../assets/1-gen/retreat-"+retreat+".png")
            img.onload = () => {
                newState.retreatImg = img
                this.setState(newState)            
            }
        }
        else newState.retreatImg = null

        if(rarity != '') {
            const img = new Image()
            img.src = require("../../assets/1-gen/rarity-"+rarity+".png")
            img.onload = () => {
                newState.rarityLogo = img
                this.setState(newState)            
            }
        }
        else newState.rarityLogo = null 
    }

    componentDidMount() {
        //Je récupère mon stage (ensemble de mon canvas)
        this.setState({canvas: this.stageRef.getStage()})
    }

    generateImg(src) {
        const img = new Image()
        img.src = src
        // img.src = require(src)
        
        // img.onload = () => {
        //     // return <Image />
        //     this.setState({sliceStage: img})
        // }
        
        return img
    }

    getBackground = (field, bgPrefix, bgSuffix) => {
        // const {type, stage} = this.props
        if(bgPrefix !== "" && bgSuffix !== "") {
            const img = new Image()
            img.src = require("../../assets/1-gen/"+bgPrefix+"-"+bgSuffix+".png")
            // img.src = require("../../assets/1-gen/"+type+"-"+stage+".png")
            img.onload = () => {
                this.setState({[field]: img})
                // return img
            }
        }
    }

    updateImgPos = (event) => {
        const attrs = event.target.attrs        
        this.setState({[attrs.name+"X"]: attrs.x, [attrs.name+"Y"]: attrs.y })
    }
    
    exportCard = () => {
        const link = document.createElement("a");
        link.download = 'card.png';
        link.href = this.stageRef.getStage().toDataURL();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    render() {
        const {
            attack1,
            attack2,
            sliceStage,
            hp,
            name,
            nameY,
            nameX,
            bg,
            nameEvolution,
            stage,
            evolvePicture,
            evolvePictureX,
            evolvePictureY,
            mainPicture,
            mainPictureX,
            mainPictureY,
            weaknessImg,
            weaknessAmount,
            resistanceImg,
            resistanceAmount,
            retreatImg,
            description,
            illustrator,
            cardNumber,
            totalCollection,
            rarityLogo,
            species,
            length,
            weight,
        } = this.state

        const { attack1Name, attack1Dammage, attack1Info, attack1Type, attack1Amount, attack1Img } = attack1;
        const { attack2Name, attack2Dammage, attack2Info, attack2Type, attack2Amount, attack2Img } = attack2;

        let tiny = false
        let attack2Y = false
        let setNumber = cardNumber
        if (totalCollection !== '') {
            if (cardNumber !== '') setNumber += '/'
            setNumber += totalCollection
        }

        if((attack1Name !== '' || attack1Dammage !== '' || attack1Info !== '' || attack1Img) && (attack2Name !== '' || attack2Dammage !== '' || attack2Info !== '' || attack2Img)) {
            tiny = true;
            attack2Y = 360;
        }

        let pokemonInfo = '';
        if (species != '') pokemonInfo += `${species} Pokémon`
        if (species != '' && (length != '' || weight != '')) pokemonInfo += `. `
        if (length != '') pokemonInfo += `Length: ${length}`
        if ((length != '' && weight != '')) pokemonInfo += `, `
        if (weight != '') pokemonInfo += `Weight: ${weight}`

        return (
            <Fragment>
                <Stage width={360} height={506} ref={ref => { this.stageRef = ref; }}>
                    <Layer>
                        <ImageCanvas image={bg} width={360} height={506} />
                        <Text text={name} fontFamily="pokename" fontSize={23}  y={nameY} x={nameX} />

                        {
                            mainPicture && (
                                <Group width={275} height={194} y={63} x={44} clipWidth={275} clipHeight={197} clipY={0} clipX={-2}>
                                    <ImageCanvas image={mainPicture} y={mainPictureY} x={mainPictureX} draggable={true} name="mainPicture" onDragEnd={this.updateImgPos} />
                                </Group>
                            )
                        }
                        {
                            stage !== "basic" && 
                                <Group>
                                    <ImageCanvas image={sliceStage} x={36} y={57} width={56} height={37} draggable={true}  />                
                                    <Group width={44} height={40} y={40} x={31} clipWidth={44} clipHeight={38} clipY={0} clipX={0}>
                                        <ImageCanvas image={evolvePicture} y={evolvePictureY} x={evolvePictureX} name="evolvePicture" onDragEnd={this.updateImgPos} draggable={true} />
                                    </Group>
                                    { nameEvolution !== "" && <Text text={"Evolves from "+nameEvolution} fontFamily="pokevolution" fontSize={9} y={21} x={77} /> }
                                </Group>
                            
                        }
                        { hp !== "" && (
                                <Text text={hp+" HP"} fontFamily="pokehp" width={100} height={100} fontSize={19} y={36} x={196} align="right" fill="#ff1f00" />                
                            )
                        }
                        { pokemonInfo !== "" && (
                                <Text text={`${pokemonInfo}.`} fontFamily="pokevolution" width={245} fontSize={11} y={274} x={55} wrap="none" align="center" />
                            )
                        }
                        
                        <Attack 
                            x={26}
                            y={295}
                            tiny={tiny}
                            name={attack1Name}
                            damage={attack1Dammage}
                            type={attack1Type}
                            amount={attack1Amount}
                            desc={attack1Info}
                            imgTypeAmount={attack1Img}
                        />
                        <Rect
                            visible={tiny}
                            x={24.5}
                            y={350}
                            width={309}
                            height={1.5}
                            fill="#000000"
                        />
                        <Attack 
                            x={26}
                            y={attack2Y || 295}
                            tiny={tiny}
                            name={attack2Name}
                            damage={attack2Dammage}
                            type={attack2Type}
                            amount={attack2Amount}
                            desc={attack2Info}
                            imgTypeAmount={attack2Img}
                        />
                        <Group x={10} y={418} width={380}>
                            <TypeAmount type={weaknessImg} amount={weaknessAmount} />
                            <TypeAmount type={resistanceImg} amount={resistanceAmount} x={120} />
                            { retreatImg && <ImageCanvas x={246} y={10} image={retreatImg} /> }
                        </Group>
                        { description !== "" && (
                                <Group x={38} y={451} width={282}>
                                    <Text
                                        text={description}
                                        fontFamily="pokevolution"
                                        width={280}
                                        height={25}
                                        fontSize={10}
                                        lineHeight={1.1}
                                        verticalAlign="middle"
                                    />                
                                </Group>
                            )
                        }
                        { illustrator !== "" && (
                                <Text
                                    text={`Illus. ${illustrator}`}
                                    fontFamily="pokename"
                                    width={75}
                                    height={8}
                                    wrap='none'
                                    fontSize={7}
                                    y={479.5}
                                    x={20}
                                />                
                            )
                        }
                        { setNumber !== "" && (
                                <Text
                                    text={setNumber}
                                    fontFamily="pokename"
                                    width={35}
                                    height={8}
                                    wrap='none'
                                    fontSize={8}
                                    align='right'
                                    y={479.5}
                                    x={292}
                                />                
                            )
                        }
                        { rarityLogo && (
                                <ImageCanvas image={rarityLogo} y={479} x={330} width={7} height={7} />
                            )
                        }
                    </Layer>
                </Stage>
                <div className='panel-actions'>
                    <button onClick={this.exportCard} className="gradient-btn" title="Download your creation">
                        <i className="fas fa-download" />Export card
                    </button>
                    <button className="gradient-btn" title="Print your creation">
                        <i className="fas fa-print" />Print
                    </button>
                    <button className="gradient-btn" title="Save it">
                        <i className="fas fa-hdd" />Save
                    </button>
                    <button className="gradient-btn" title="Try again">
                        <i className="fas fa-sync-alt" />Clean
                    </button>
                    <button className="gradient-btn" title="Share to your friends">
                        <i className="fas fa-share-alt" />Share
                    </button>
                </div>
            </Fragment>
        )
    }
}

export default CardRenderer