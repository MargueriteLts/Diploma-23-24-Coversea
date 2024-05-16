import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import html2canvas from "html2canvas";
import { generateHash } from './utilities.js'

///////////////MODULES
//Background
import Background from './modules/Background.jsx'
import BackgroundImage from './modules/BackgroundImage.jsx'
//Graphics
import Image from './modules/Image.jsx'
import Lines from './modules/Lines.jsx'
import Module3D from './modules/Module3D.jsx'
import Particles from './modules/Particles.jsx'
import Shapes from './modules/Shapes.jsx'
import Vinyl from './modules/Vinyl.jsx'
//Text
import BasicTypo from './modules/BasicTypo.jsx'
//Overlay
import Overlay from './modules/Overlay.jsx'


///////////////VAR
let size



export default class GeneratorContainer extends Component {
  constructor(props) {
    super(props)
    this.sketchContainerRef = React.createRef();
  }

  ///////

  componentDidMount() {
    const sketchContainer = this.sketchContainerRef.current;
    const { clientWidth, clientHeight } = sketchContainer;
    // const size = parseInt(Math.min(clientWidth, clientHeight))
    size = parseInt(Math.min(clientWidth, clientHeight))

    // this.saveCanvasSize(size)

    this.props.initSketch('sketch', size);


  }


////////////////////////////////////// MODULE BACKGROUND

  // Tab -OK
  handleTabClickBackground = (type) => {
    this.props.setBackgroundStore('CurrentTabChange', type)
    this.setState({})
  }

  // SolidColor -OK
  handleChangeBackgroundSolidColor = (object, value) => {
    this.props.setBackgroundStore(object, value)
    this.setState({})
  }

  // Gradient
  // -OK
  handleBackgroundRandomizeGradient = () => {
    this.props.setBackgroundStore('Gradient')
    this.setState({})
  }
  // -OK
  handleChangeBackgroundGradientColor = (object, value) => {
    this.props.setBackgroundStore(object, value)
    this.setState({})
  }
  // -OK (no state update here)
  handleChangeBackgroundGradientAngle = () => {
    this.props.setBackgroundStore('AngleGradient')
  }

  // Noise -OK
   handleTabClickNoise = (type) => {
    this.props.setBackgroundStore('currentTabImageChange', type)
    this.setState({})
  }

////////////////////////////////////// MODULE BACKGROUND IMAGE

  // Tab -OK
  handleTabClickBackgroundImage = (type) => {
    this.props.setBackgroundImageStore('CurrentTabChange', type)
    this.setState({})
  }

  // Opacity -OK
  handleBackgroundImageOpacity = (e) => {
    this.props.setBackgroundImageStore('opacity', e.target.value)
    this.setState({})
  }

////////////////////////////////////// MODULE LINES

  // Colors -OK
  handleLinesColor = (object, value) => {
    this.props.setLinesStore(object, value)
    this.setState({})
  }
  // Stroke -OK
  handleLinesSize = (e) => {
    this.props.setLinesStore('strokeWeight', e.target.value)
    this.setState({})
  }

////////////////////////////////////// MODULE 3D

  // DropDown -OK
  handleDropDownClickModule3D = (type) => {
    this.props.set3DStore('CurrentTabChange', type)
    this.setState({})
  }

  ////////////////////////////////////// MODULE PARTICLES
  
  // DropDown -OK
  handleDropDownClickParticles = (type) => {
    this.props.setParticlesStore('CurrentTabChange', type)
    this.setState({})
  }

  // Quantity -OK
  handleParticlesQuantity = (e) => {
    this.props.setParticlesStore('quantity', e.target.value)
    this.setState({})
  }

  // Color -OK
  handleParticlesColor = (object, value) => {
    this.props.setParticlesStore(object, value)
    this.setState({})
  }

  ////////////////////////////////////// MODULE SHAPES

  // DropDown -OK
  handleDropDownClickShapes = (type) => {
    this.props.setShapesStore('CurrentTabChange', type)
    this.setState({})
  }

  // Size -OK
  handleShapesSize = (e) => {
    this.props.setShapesStore('Size', e.target.value)
    this.setState({})
  }

  // Color -OK
  handleShapesColor = (object, value) => {
    this.props.setShapesStore(object, value)
    this.setState({})
  }

  ////////////////////////////////////// MODULE VINYL

  // Tab -OK
  handleTabClickVinyl = (type) => {
    this.props.setVinylStore('CurrentTabChange', type)
    this.setState({})
  }

  // Size -OK
  handleVinylSize = (e) => {
    this.props.setVinylStore('size', e.target.value)
    this.setState({})
  }

  // Opacity -OK
  handleVinylOpacity = (e) => {
    this.props.setVinylStore('opacity', e.target.value)
    this.setState({})
  }

  ////////////////////////////////////// MODULE OVERLAY

  // Tab -OK
  handleTabClickOverlay = (type) => {
    this.props.setOverlayStore('CurrentTabChange', type)
    this.setState({})
  }

  // Opacity -OK
  handleOverlayOpacity = (e) => {
    this.props.setOverlayStore('opacity', e.target.value)
    this.setState({})
  }


  ////////////////////////////////////////////////////////////////////////////


  /////////////////////////// RANDOMIZE MODULE ///////////////////////////
  //ji kompran pas.... sans this.setState ca effectivement n'update pas le state, le soucis... c'est quon a aucun state ici ni dans les modules... et en plus les newValues c'est juste des values, sans aucune keys.... alors comment il comprend ce quil doit updater...????
  // -OK
  handleRandomizeModule = (moduleName) => {
    this.props.randomizeModuleStore(moduleName)
    this.setState({})
  }

  /////////////////////////// GENERATE COVER ///////////////////////////

  generateCover = () => {
    const container = document.getElementById('reactComponentRoot')
    const generatorName = container.dataset.generator

    this.props.generateAllStore(generatorName, this.props.moduleList)
    this.setState({})
  }

/////////////////////////// DOWNLOAD COVER ///////////////////////////

  downloadImage = () => {
    html2canvas(document.getElementById("defaultCanvas0")).then(function (canvas) {
      let a = document.createElement("a");
      a.href = canvas.toDataURL("image/jpeg");
      a.download = `cover-${generateHash()}.jpeg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  };


/////////////////////////// RENDER MODULES ///////////////////////////

  renderModules() {
    const {
      moduleList,
      background,
      shapes,
      particles,
      setImageStore,
      backgroundImage,
      vinyl,
      lines,
      module3D,
      basictypo,
      setBasicTypoStore,
      overlay,
      randomizeModuleStore
      // setCanvasSizeStore
    } = this.props

    const modules = []

    moduleList.forEach((moduleName, index) => {

      // Background
      if (moduleName == 'Background') {
        modules.push(
          <Background
            key={index}
            handleRandomizeModule={this.handleRandomizeModule}
            background={background}
            handleTabClickBackground={this.handleTabClickBackground}
            handleChangeBackgroundSolidColor={this.handleChangeBackgroundSolidColor}
            handleChangeBackgroundGradientColor={this.handleChangeBackgroundGradientColor}
            handleBackgroundRandomizeGradient={this.handleBackgroundRandomizeGradient}
            handleChangeBackgroundAngleGradient={this.handleChangeBackgroundGradientAngle}
            handleTabClickNoise={this.handleTabClickNoise}
          />
        )
      }
      if (moduleName == 'BackgroundImage') {
        modules.push(
          <BackgroundImage
            key={index}
            handleRandomizeModule={this.handleRandomizeModule}
            backgroundImage={backgroundImage}
            handleTabClickBackgroundImage={this.handleTabClickBackgroundImage}
            handleBackgroundImageOpacity={this.handleBackgroundImageOpacity}
          />
        )
      }

      // Graphics
      if (moduleName == 'Image') {
        modules.push(
          <Image
            setImageValue={setImageStore}
            key={index}
            randomizeModuleStore={randomizeModuleStore}
          />
        )
      }
      if (moduleName == 'Lines') {
        modules.push(
          <Lines
            key={index}
            handleRandomizeModule={this.handleRandomizeModule}
            lines={lines}
            handleLinesColor={this.handleLinesColor}
            handleLinesSize={this.handleLinesSize}
          />
        )
      }
      if (moduleName == 'Module3D') {
        modules.push(
          <Module3D
            key={index}
            handleRandomizeModule={this.handleRandomizeModule}
            module3D={module3D}
            handleDropDownClickModule3D={this.handleDropDownClickModule3D}
          />
        )
      }
      if (moduleName == 'Particles') {
        modules.push(
          <Particles
            key={index}
            handleRandomizeModule={this.handleRandomizeModule}
            particles={particles}
            handleDropDownClickParticles={this.handleDropDownClickParticles}
            handleParticlesQuantity={this.handleParticlesQuantity}
            handleParticlesColor={this.handleParticlesColor}
          />
        )
      }
      if (moduleName == 'Shapes') {
        modules.push(
          <Shapes
            key={index}
            handleRandomizeModule={this.handleRandomizeModule}
            shapes={shapes}
            handleDropDownClickShapes={this.handleDropDownClickShapes}
            handleShapesColor={this.handleShapesColor}
            handleShapesSize={this.handleShapesSize}
          />
        )
      }
      if (moduleName == 'Vinyl') {
        modules.push(
          <Vinyl
            key={index}
            handleRandomizeModule={this.handleRandomizeModule}
            vinyl={vinyl}
            handleTabClickVinyl={this.handleTabClickVinyl}
            handleChangeVinylSize={this.handleVinylSize}
            handleVinylOpacity={this.handleVinylOpacity}
          />
        )
      }

      // Typography
      if (moduleName == 'BasicTypo') {
        modules.push(
          <BasicTypo
            key={index}
          // randomizeModuleStore={randomizeModuleStore}
            basictypo={basictypo}
            setBasicTypoStore={setBasicTypoStore}
          />
        )
      }

      // Overlay
      if (moduleName == 'Overlay') {
        modules.push(
          <Overlay
            key={index}
            handleRandomizeModule={this.handleRandomizeModule}
            overlay={overlay}
            handleTabClickOverlay={this.handleTabClickOverlay}
            handleOverlayOpacity={this.handleOverlayOpacity}
          />
        )
      }

    })

    return modules
  }


  ////////////////////////////////////////////////////////////////////////////

  render() {

    return <div className="generator__content">
      <div className='generator__modules-wrap'>
      {this.renderModules()}
      </div>
      <div className="generator__sketch-wrap">
        <div className="sketch" id="sketch" ref={this.sketchContainerRef}>
        </div>
        <div className="generator__sketch-controls">
          <div className="btn--big" onClick={this.generateCover}>GENERATE</div>
          <div className="btn--primary" onClick={this.downloadImage}>Download image</div>
        </div>
      </div>
    </div>
  }
}
