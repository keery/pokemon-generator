import React, { Component } from 'react'
import '../../containers/App/App.scss';
import { Stage, Layer, Text, Group, Image as ImageCanvas } from 'react-konva';
// import Konva from 'konva';
import sliceStageImg from '../../assets/1-gen/slice-stage.png'

class CardRenderer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: props.type || 'fire',
            stage: props.stage || 'basic',
            name: props.name,
            nameEvolution: props.nameEvolution,
            mainPicture : props.mainPicture,
            mainPictureX: -2,
            mainPictureY: 0,
            evolvePicture : props.evolvePicture,
            evolvePictureX: 0,
            evolvePictureY: 0,
            nameX: 35,
            nameY: 34,
            canvas: null,
            bg: this.getBackground(),
            sliceStage: this.generateImg(sliceStageImg)
        }
    }

    componentWillReceiveProps(nextProps) { 
        const { type, stage } =  nextProps        
        const newState = {...nextProps}

        //Je décale le nom si c'est une évolution
        newState.nameX = (stage !== "basic" ? 95 : 35)
        
        const bg = new Image()
        bg.src = require("../../assets/1-gen/"+type+"-"+stage+".png")
        bg.onload = () => {
            newState.bg = bg
            this.setState(newState)            
        }
    }

    componentDidMount() {
        //Je récupère mon stage (ensemble de mon canvas)
        this.setState({canvas: this.stageRef.getStage()})
    }

    generateImg(src) {
        const img = new Image()
        img.src = require("../../assets/1-gen/slice-stage.png")
        
        img.onload = () => {
            // return <Image />
            console.log(img)
            this.setState({sliceStage: img})
        }
        
        return img
    }

    getBackground = () => {
        const {type, stage} = this.props
        const bg = new Image()
        bg.src = require("../../assets/1-gen/"+type+"-"+stage+".png")
        bg.onload = () => {
            this.setState({bg: bg})
        }
    }
    updateImgPos = (event) => {
        const attrs = event.target.attrs        
        this.setState({[attrs.name+"X"]: attrs.x, [attrs.name+"Y"]: attrs.y })
    }
    
    render() {
        const { sliceStage, name, nameY, nameX, bg, nameEvolution, stage, evolvePicture, evolvePictureX, evolvePictureY, mainPicture, mainPictureX, mainPictureY } = this.state

        console.log(mainPicture)
        console.log(sliceStage)
        return (
            <Stage width={360} height={506} ref={ref => { this.stageRef = ref; }}>
                <Layer>
                    <ImageCanvas image={bg} width={360} height={506} />
                    <Text text={name} fontFamily="pokename" fontSize={23} y={nameY} x={nameX} />

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
                                <ImageCanvas image={sliceStage} x={42} y={63} width={45} height={31}  />                
                                <Group width={44} height={40} y={40} x={31} clipWidth={44} clipHeight={38} clipY={0} clipX={0}>
                                    <ImageCanvas image={evolvePicture} y={evolvePictureY} x={evolvePictureX} name="evolvePicture" onDragEnd={this.updateImgPos} draggable={true} />
                                </Group>
                                { nameEvolution !== "" && <Text text={"Evolves from "+nameEvolution} fontFamily="pokevolution" fontSize={9} y={21} x={77} /> }
                            </Group>
                        
                    }
           
                    
{/*                     
                    {
                        stage !== "basic" && (
                            // <ImageCanvas image={evolvePicture} y={evolvePictureY} x={evolvePictureX} name="evolvePicture" onDragEnd={this.updateImgPos} draggable={true} />
                            // <Text text={"Evolves from "+nameEvolution} fontFamily="pokevolution" fontSize={9} y={21} x={77} />
                        )
                    } */}
                    {/* {
                        nameEvolution !== "" && stage !== "basic" && (
                            <Text text={"Evolves from "+nameEvolution} fontFamily="pokevolution" fontSize={9} y={21} x={77} />
                        )
                    } */}
                </Layer>
            </Stage>
        )
    }
}

export default CardRenderer