import React, { Component } from 'react'
import Note from '../Note'
// import s from './NotesList.scss'

class NotesList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      notesList: props.notesList
    }

    this.addNoteToList = this.addNoteToList.bind(this)
  }

  addNoteToList (element) {
    this.state.notesList.push(element)
    this.setState(this.state)
    console.log(this.state.notes)
  }

  render () {
    return <ul className='notes-list'>
             {this.state.notesList.map((note) => {
                return <Note
                         title={note.title}
                         buttonText={note.buttonText}
                         text={note.text}
                         backgroundImage={note.backgroundImage}
                         addNoteToList={this.addNoteToList} />
              }, this)}
             < /ul>
  }
}

export default NotesList
