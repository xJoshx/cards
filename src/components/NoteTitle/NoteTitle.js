import React, {Component} from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './NoteTitle.scss'

class NoteTitle extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: props.title
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    var text = event.target.value
    this.props.onChange(text)
  }

  render () {
    var styles = {
      background: 'url(' + this.props.backgroundImage + ') center / cover',
      position: 'relative'
    }
    // <div className='mdl-textfield mdl-js-textfield mdl-text-editable'>
    return <form action='#' className={s.background} style={styles}>
             <div className={s.title}>
               <input
                 className={s.input}
                 type='text'
                 id='sample1'
                 placeholder='Escribe el título de la nota...'
                 maxLength='10'
                 defaultValue={this.state.title}
                 onChange={this.handleChange} />
             </div>
           </form>
  }
}

export default withStyles(NoteTitle, s)
