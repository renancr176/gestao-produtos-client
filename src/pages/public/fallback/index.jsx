import React from 'react'
import Spinner from '../../../components/elements/spinner'
import css from './index.module.css'

export default function Fallback() {

  return (
    <div className={css.wrapper}>
        <Spinner size="5vw"/>
    </div>
  )
}
