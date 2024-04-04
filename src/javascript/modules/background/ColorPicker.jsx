import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

export default class AllColorPicker extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    displayColorPicker: false,
    color: this.props.color
    // color: this.props.getColorPickerStore(object)
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    const {object} = this.props
    this.props.setColorPickerStore(object, color.hex)
    this.setState({ color: color.hex })
  };

  // updateColor = () => {
  //   const { object, color } = this.props
  //   if (object === 'gradient1') {
  //     this.setState({ color: color})
  //   }
  //   if (object === 'gradient2') {
  //     this.setState({ color: color})
  //   }
  // }

  render() {

    const { title } = this.props

    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: this.state.color,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return <div className="PlainColor">
      <div>{title}</div>
      <div style={ styles.swatch } onClick={ this.handleClick }>
        <div style={ styles.color } />
      </div>
      { this.state.displayColorPicker
        ? <div style={ styles.popover }>
            <div style={ styles.cover } onClick={ this.handleClose }/>
            <SketchPicker color={this.state.color} onChange={ this.handleChange } />
          </div>
        : null
      }
    </div>
  }
}