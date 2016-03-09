import React, {Component, PropTypes} from 'react'
import s from './App.scss'
import NotesList from '../NotesList'
import emptyFunction from 'fbjs/lib/emptyFunction'

class App extends Component {
  static childContextTypes = {
    insertCss: PropTypes.func.isRequired
    // onSetTitle: PropTypes.func.isRequired,
    // onSetMeta: PropTypes.func.isRequired,
    // onPageNotFound: PropTypes.func.isRequired,
  }

  componentWillMount () {
    const { insertCss } = this.props.context
    this.removeCss = insertCss(s)
  }

  componentWillUnmount () {
    this.removeCss()
  }

  getChildContext () {
    const context = this.props.context
    return {
      insertCss: context.insertCss || emptyFunction
      // onSetTitle: context.onSetTitle || emptyFunction,
      // onSetMeta: context.onSetMeta || emptyFunction,
      // onPageNotFound: context.onPageNotFound || emptyFunction
    }
  }

  render () {
    var templates = [{title: 'Hola!! Esto es una plantilla', buttonText: 'Guardar', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauricio Colmenero sagittis pellentesque lacus eleifend lacinia...', backgroundImage: 'http://getmdl.io/assets/demos/welcome_card.jpg'}, {title: 'Otra plantilla de nota', buttonText: 'Guardar', text: 'Comprar huevos', backgroundImage: 'http://getmdl.io/assets/demos/welcome_card.jpg'}]
    return <div>
             <div id='notes-container' className='snippet-demo-container demo-card demo-card__wide'>
               <NotesList notesList={templates} />
             </div>
           </div>
  }
}

export default App
