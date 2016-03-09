import React, {Component} from 'react'
import NoteTitle from '../NoteTitle/NoteTitle'
import NoteBody from '../NoteBody/NoteBody'
import NoteFooter from '../NoteFooter/NoteFooter'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Note.scss'

class Note extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: props.title,
      text: props.text,
      backgroundImage: props.backgroundImage,
      buttonText: 'Guardar'
    }

    this.updateTitle = this.updateTitle.bind(this)
    this.updateBody = this.updateBody.bind(this)
    this.updateBackgroundImage = this.updateBackgroundImage.bind(this)
    this.addNote = this.addNote.bind(this)
  }

  updateTitle (value) {
    this.state.title = value
  }

  updateBody (value) {
    this.state.text = value
  }

  updateBackgroundImage (value) {
    this.state.backgroundImage = value
  }

  addNote () {
    var element = {
      title: this.state.title,
      text: this.state.text,
      backgroundImage: this.state.backgroundImage,
      buttonText: this.state.buttonText
    }

    this.props.addNoteToList(element)
  }
// <div className='demo-card-wide mdl-card mdl-shadow--2dp'>
  render () {
    return <div className={s.card}>
             <NoteTitle title={this.state.title} backgroundImage={this.state.backgroundImage} onChange={this.updateTitle} />
             <NoteBody text={this.state.text} onChange={this.updateBody} onChange={this.updateBody} />
             <NoteFooter buttonText={this.props.buttonText} handleClick={this.addNote} />
           </div>
  }
}

export default withStyles(Note, s)
