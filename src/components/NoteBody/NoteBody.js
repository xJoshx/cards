import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './NoteBody.scss'

class NoteBody extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: props.text
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    var text = event.target.value
    this.props.onChange(text)
  }

  render () {
    return <form className={s.background} action='#'>
             <div className={s.body}>
               <textarea
                 className={s.input}
                 type='text'
                 rows='3'
                 id='sample5'
                 defaultValue={this.state.text}
                 onChange={this.handleChange}></textarea>
               <label className='mdl-textfield__label' htmlFor='sample5'></label>
             </div>
           </form>
  }
}

export default withStyles(NoteBody, s)
