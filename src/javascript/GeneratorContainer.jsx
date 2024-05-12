import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import html2canvas from "html2canvas";
import { generateHash } from './utilities.js'

import Shapes from './modules/Shapes.jsx'
import Particles from './modules/Particles.jsx'
import Image from './modules/Image.jsx'
import Background from './modules/Background.jsx'
import BackgroundImage from './modules/BackgroundImage.jsx'
import Vinyl from './modules/Vinyl.jsx'
// import Text1 from './modules/Text1.jsx'
import Lines from './modules/Lines.jsx'
import Module3D from './modules/Module3D.jsx'
import BasicTypo from './modules/BasicTypo.jsx'
import Overlay from './modules/Overlay.jsx'

let size
let moduleType



export default class GeneratorContainer extends Component {
  constructor(props) {
    super(props)
    this.sketchContainerRef = React.createRef();

    this.state = {
      currentBgType: this.props.background.currentBgType,
      solidColor: this.props.background.preset.SolidColor.color,
      colorG1: this.props.background.preset.Gradient.color1,
      colorG2: this.props.background.preset.Gradient.color2
    }
  }

  componentDidMount() {
    const sketchContainer = this.sketchContainerRef.current;
    const { clientWidth, clientHeight } = sketchContainer;
    // const size = parseInt(Math.min(clientWidth, clientHeight))
    size = parseInt(Math.min(clientWidth, clientHeight))

    // this.saveCanvasSize(size)

    this.props.initSketch('sketch', size);


  }


/////////////////////////////////////////////////// BACKGROUND MODULE

  handleTabClickBackground = (type) => {
    this.props.setBackgroundStore('CurrentTabChange', type)

    this.setState({
      currentBgType: type
    })
  }

  handleChangeBackgroundSolidColor = (object, value) => {
    this.props.setBackgroundStore(object, value)
    .then((color) => {
      this.setState({
        solidColor: color[0]
      })
    })
  }

  ///////////////////////// GRADIENT

  handleBackgroundRandomizeGradient = () => {
    this.props.setBackgroundStore('Gradient')
      .then((colors) => {
        this.setState({
          colorG1: colors[0],
          colorG2: colors[1]
        })
      }
    )
  }

  handleChangeBackgroundGradientColor = (object, value) => {
    this.props.setBackgroundStore(object, value)
    .then((colors) => {
        this.setState({
          colorG1: colors[0],
          colorG2: colors[1]
        })
      }
    )
  }

  handleChangeBackgroundGradientAngle = () => {
    this.props.setBackgroundStore('AngleGradient')
  }

  ////////////////////////////////////////////////// RANDOMIZE MODULE

  randomizeModule = () => {
    // const { moduleType } = this.props
    console.log(moduleType);
    this.props.randomizeModuleStore(moduleType)
    .then((newValues) => {
        this.setState({
          currentBgType: newValues[0],
          solidColor: newValues[1],
          colorG1: newValues[4],
          colorG2: newValues[5]
        })
      })
  }

// randomizeModule = () => {
//     const { moduleType } = this.props
//     this.props.randomizeModuleStore(moduleType)
//   }


/////////////////////////////////////////////////// RENDER MODULES

  renderModules() {
    const {
      moduleList,
      background,
      setBackgroundStore,
      shapes,
      particles,
      setShapesStore,
      setParticlesStore,
      setImageStore,
      backgroundImage,
      setBackgroundImageStore,
      vinyl,
      setVinylStore,
      lines,
      setLinesStore,
      module3D,
      set3DStore,
      basictypo,
      setBasicTypoStore,
      overlay,
      setOverlayStore,
      randomizeModuleStore
      // setCanvasSizeStore
    } = this.props

    const modules = []

    moduleList.forEach((moduleName, index) => {

      if (moduleName == 'Background') {
        moduleType = 'Background'
        modules.push(
          <Background
            // moduleType='Background'
            background={background}
            setBackgroundStore={setBackgroundStore}
            currentBgType={this.state.currentBgType}
            solidColor={this.state.solidColor}
            colorG1={this.state.colorG1}
            colorG2={this.state.colorG2}
            key={index}
            randomizeModuleStore={randomizeModuleStore}
            handleChangeBackgroundSolidColor={this.handleChangeBackgroundSolidColor}
            handleBackgroundRandomizeGradient={this.handleBackgroundRandomizeGradient}
            handleTabClickBackground={this.handleTabClickBackground}
            handleChangeBackgroundAngleGradient={this.handleChangeBackgroundGradientAngle}
            randomizeModule={this.randomizeModule}
          />
        )
      }

      if (moduleName == 'Shapes') {
        modules.push(
          <Shapes
            shapes={shapes}
            setShapesStore={setShapesStore}
            key={index}
            randomizeModuleStore={randomizeModuleStore}
          />
        )
      }

      if (moduleName == 'Particles') {
        modules.push(
          <Particles
            particles={particles}
            setParticlesStore={setParticlesStore}
            key={index}
            randomizeModuleStore={randomizeModuleStore}
          />
        )
      }

      if (moduleName == 'Image') {
        modules.push(
          <Image
            setImageValue={setImageStore}
            key={index}
            randomizeModuleStore={randomizeModuleStore}
          />
        )
      }

      if (moduleName == 'BackgroundImage') {
        modules.push(
          <BackgroundImage
            backgroundImage={backgroundImage}
            setBackgroundImageStore={setBackgroundImageStore}
            key={index}
            randomizeModuleStore={randomizeModuleStore}
          />
        )
      }

      if (moduleName == 'Vinyl') {
        modules.push(
          <Vinyl
            vinyl={vinyl}
            setVinylStore={setVinylStore}
            // sliderMax={size}
            key={index}
            randomizeModuleStore={randomizeModuleStore}
          />
        )
      }

      if (moduleName == 'BasicTypo') {
        modules.push(
          <BasicTypo
            basictypo={basictypo}
            setBasicTypoStore={setBasicTypoStore}
            key={index}
            randomizeModuleStore={randomizeModuleStore}
          />
        )
      }

      if (moduleName == 'Lines') {
        modules.push(
          <Lines
            lines={lines}
            setLinesStore={setLinesStore}
            key={index}
            randomizeModuleStore={randomizeModuleStore}
          />
        )
      }

      if (moduleName == 'Module3D') {
        modules.push(
          <Module3D
            module3D={module3D}
            set3DStore={set3DStore}
            key={index}
            randomizeModuleStore={randomizeModuleStore}
          />
        )
      }

      if (moduleName == 'Overlay') {
        modules.push(
          <Overlay
            overlay={overlay}
            setOverlayStore={setOverlayStore}
            key={index}
            randomizeModuleStore={randomizeModuleStore}
          />
        )
      }

    })

    return modules
  }

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

  // resolve([bgType, newSolidColor, Gcolor1, Gcolor2, newGradientColor1, newGradientColor2, newAngle ])

  generateCover = () => {
    const container = document.getElementById('reactComponentRoot')
    const generatorName = container.dataset.generator
    window.resetSketch()
    this.props.generateAllStore(generatorName)
      .then((newValues) => {
        this.setState({
          currentBgType: newValues[0],
          solidColor: newValues[1],
          colorG1: newValues[4],
          colorG2: newValues[5]
        })
      })
  }

  // saveCanvasSize(size) {
  //   this.props.setCanvasSizeStore(size)
  // }

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
