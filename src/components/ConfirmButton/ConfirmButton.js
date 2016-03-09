import React, {Component} from 'react'

class ConfirmButton extends Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.props.saveNote()
  }

  render () {
    return <a className='mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect' onClick={this.handleClick}>
             {this.props.text}
           </a>
  }
}

export default ConfirmButton
