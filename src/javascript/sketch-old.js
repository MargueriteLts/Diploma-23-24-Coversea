import p5 from 'p5'
import { sample, getRandomArbitrary } from './utilities'
import { getBackgroundValue, getParticlesValue, getConfig } from './store'

let config = {}

let canvasContainerId = ''

let canvasSize = 600

let r = 0
let g = 0
let b = 0

let bgTypes

/////////////////////////////////////////////////////

function drawShapes(p) {
  const xCenter = canvasSize / 2
  const yCenter = canvasSize / 2
  const w = getRandomArbitrary(10, 60) * canvasSize / 100
  
  const paddingW = 3 * canvasSize / 100
  const paddingH = 5 * canvasSize / 100
  
  const wCircle = w - paddingW
  
  const xCenterER1 = xCenter + (w / 2) + (6,5 * canvasSize / 100)
  const xCenterEL1 = xCenter - (w / 2) - (6,5 * canvasSize / 100)
  const wEV1 = (13 * canvasSize / 100) - paddingW
  const hEV1 = w + (26 * canvasSize / 100) - paddingH
  
  const xCenterER2 = xCenterER1 + ((canvasSize - w) / 4)
  const xCenterEL2 = canvasSize - xCenterER2
  const wEV2 = ((canvasSize - w) / 2) - (13 * canvasSize / 100) - paddingW
  const hEV2 = canvasSize - paddingH
  
  p.ellipse(xCenter, yCenter, wCircle)
  
  p.ellipse(xCenterER1, yCenter, wEV1, hEV1)
  p.ellipse(xCenterEL1, yCenter, wEV1, hEV1)
  p.ellipse(xCenterER2, yCenter, wEV2, hEV2)
  p.ellipse(xCenterEL2, yCenter, wEV2, hEV2)
  
  p.ellipse(yCenter, xCenterER1, wCircle, wEV1)
  p.ellipse(yCenter, xCenterEL1, wCircle, wEV1)
  p.ellipse(yCenter, xCenterER2, hEV1, wEV2)
  p.ellipse(yCenter, xCenterEL2, hEV1, wEV2)
}

////////////////////////////////////////////////////////////////

function drawAll(p) {
  p.background(0)

  const sliderValue = getSliderValue()

  if (config.modules.includes('PlainColorBackground')) {
    r = parseInt(sliderValue)
    g = parseInt(sliderValue)
  }
  
  b = getRandomArbitrary(0, 255)

  const xCenter = canvasSize / 2
  const yCenter = canvasSize / 2

  const bgCircleWidth = getRandomArbitrary((canvasSize - 250), (canvasSize - 30))
  
  p.fill(r, g, b)
  
  bgTypes = ['color', 'shapes', 'circle']
  const bg = sample(bgTypes)
  switch (bg) {
    case 'color':
      p.background(r, g, b)
      break;
    case 'shapes':
      drawShapes(p)
      break;
    case 'circle':
      p.ellipse(xCenter, yCenter, bgCircleWidth)
      break;

    default:
      break;
  }
}

//////////////////////////////////////////////////

function sketch(p) {

  p.setup = () => {
    const canvas = p.createCanvas(canvasSize, canvasSize)
    canvas.parent(canvasContainerId)
    p.frameRate(2)
  }
  
  p.draw = () => {
    drawAll(p)
  }

  // p.noLoop()
}

///////////////////////////////////////////////////

function initSketch(id) {
  canvasContainerId = id

  config = getConfig()

  new p5(sketch)
}

export { initSketch }