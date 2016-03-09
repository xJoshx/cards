import React, { Component } from 'react'
import NotePlainButton from '../ConfirmButton/ConfirmButton'
class NoteFooter extends Component {
  render () {
    return <div className='mdl-card__actions mdl-card--border'>
      <NotePlainButton text={this.props.buttonText} saveNote={this.props.handleClick} />
    </div>
  }
}

export default NoteFooter
