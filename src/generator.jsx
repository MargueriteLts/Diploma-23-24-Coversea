// import './generators.css'
// import './teaserGenerator.css'

import React from 'react'
import { createRoot } from 'react-dom/client'

import {
  initStore,
  getModuleList,
  getShapesStore,
  setShapesStore,
  getParticlesStore,
  setParticlesStore,
  getImageStore,
  setImageStore,
  getBackgroundStore,
  setBackgroundStore,
  getBackgroundImageStore,
  setBackgroundImageStore,
  getVinylStore,
  setVinylStore,
  getLinesStore,
  setLinesStore,
  get3DStore,
  set3DStore,
  getBasicTypoStore,
  setBasicTypoStore,
  getBasicTypoV2Store,
  setBasicTypoV2Store,
  getOverlayStore,
  setOverlayStore,
  generateAllStore,
  randomizeModuleStore

  // setCanvasSizeStore
} from './javascript/store.js'

import { initSketch } from './javascript/sketch.js'
import GeneratorContainer from './javascript/GeneratorContainer.jsx'
import TeaserGeneratorContainer from './javascript/TeaserGeneratorContainer.jsx'

import * as generator1 from './generators/generator1.js'
import * as generator2 from './generators/generator2.js'
import * as generator3 from './generators/generator3.js'
import * as generator4 from './generators/generator4.js'
import * as generator5 from './generators/generator5.js'
import * as generator6 from './generators/generator6.js'
import * as generator1p2 from './generators/generator1p2.js'
import * as generator2p2 from './generators/generator2p2.js'
import * as generator4p2 from './generators/generator4p2.js'
import * as generator5p2 from './generators/generator5p2.js'
import * as generator6p2 from './generators/generator6p2.js'
import * as generator7 from './generators/generator7.js'
import * as teaserGenerator from './generators/teaserGenerator.js'

const generators = {
  generator1,
  generator2,
  generator3,
  generator4,
  generator5,
  generator6,
  generator1p2,
  generator2p2,
  generator4p2,
  generator5p2,
  generator6p2,
  generator7,
  teaserGenerator
}

const actions = {
  // initStore,
  setShapesStore,
  setParticlesStore,
  setImageStore,
  setBackgroundStore,
  setBackgroundImageStore,
  setVinylStore,
  setLinesStore,
  set3DStore,
  setBasicTypoStore,
  setBasicTypoV2Store,
  setOverlayStore,
  // setCanvasSizeStore,
  generateAllStore,
  randomizeModuleStore,
  initSketch
}


document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('reactComponentRoot')
  const generatorName = container.dataset.generator
  const config = generators[generatorName]

  initStore(generatorName)

  const props = {
    moduleList: getModuleList()
  }

  config.modules.forEach(moduleName => {
    if (moduleName == 'Shapes') {
      props.shapes = getShapesStore()
    }

    if (moduleName == 'Particles') {
      props.particles = getParticlesStore()
    }

    if (moduleName == 'Image') {
      props.objects = getImageStore()
    }

    if (moduleName == 'Background') {
      props.background = getBackgroundStore()
    }

    if (moduleName == 'BackgroundImage') {
      props.backgroundImage = getBackgroundImageStore()
    }

    if (moduleName == 'Vinyl') {
      props.vinyl = getVinylStore()
    }

    if (moduleName == 'Text1') {
      props.text1 = getText1Store()
    }

    if (moduleName == 'BasicTypo') {
      props.basictypo = getBasicTypoStore()
    }

    if (moduleName == 'BasicTypoV2') {
      props.basictypoV2 = getBasicTypoV2Store()
    }

    if (moduleName == 'Lines') {
      props.lines = getLinesStore()
    }
    if (moduleName == 'Module3D') {
      props.module3D = get3DStore()
    }
    if (moduleName == 'Overlay') {
      props.overlay = getOverlayStore()
    }
  });

  const root = createRoot(container)
  if (generatorName == 'teaserGenerator') {
    root.render(<TeaserGeneratorContainer {...props} {...actions} />)
  } else {
    root.render(<GeneratorContainer {...props} {...actions} />)
  }
  // root.render(<GeneratorContainer {...props} {...actions} />)
})
