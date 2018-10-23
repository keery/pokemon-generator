import React, { Component } from 'react'
import { Stage, Layer, Text, Group, Image as ImageCanvas } from 'react-konva';
import Attack from '../Attack/Attack';
import '../../containers/App/App.scss';
import sliceStageImg from '../../assets/1-gen/slice-stage.png'

import { isEmpty } from '../../helper/helper';

class CardRenderer extends Component {
    constructor(props) {
        super(props)
        const { 
            type, stage, name, nameEvolution, mainPicture, evolvePicture, hp, attack1, attack2,
            // type, stage, name, nameEvolution, mainPicture, evolvePicture, hp, attack1Amount, attack1Dammage, attack1Name, attack1Info, attack1Type, attack2Amount, attack2Dammage, attack2Name, attack2Info, attack2Type
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
        }
    }

    componentWillReceiveProps(nextProps) { 
        const { type, stage, attack1 : { attack1Type, attack1Amount }, attack2 : { attack2Type, attack2Amount }} = nextProps        
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

        if(attack2Type !== "" && attack2Amount !== "") {
            const img = new Image()
            img.src = require("../../assets/1-gen/"+attack2Amount+"-"+attack2Type+".png")
            img.onload = () => {
                newState.attack2.attack2Img = img
                this.setState(newState)            
            }
        }
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
        } = this.state

        const { attack1Name, attack1Dammage, attack1Info, attack1Type, attack1Amount, attack1Img } = attack1;
        const { attack2Name, attack2Dammage, attack2Info, attack2Type, attack2Amount, attack2Img } = attack2;

        let tiny = false;
        if(!isEmpty(attack1) && !isEmpty(attack2)) tiny = true;

        return (
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
                    <Attack 
                        x={26}
                        y={295}
                        tiny={tiny}
                        name={attack2Name}
                        damage={attack2Dammage}
                        type={attack2Type}
                        amount={attack2Amount}
                        desc={attack2Info}
                        imgTypeAmount={attack2Img}
                    />                    
                </Layer>
            </Stage>
        )
    }
}

export default CardRenderer