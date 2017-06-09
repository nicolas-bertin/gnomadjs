import React, { PropTypes } from 'react'
import LensTest from 'lens-test'
// import TranscriptDemo from 'lens-track-transcript/example/TranscriptTrack.example'
import css from './styles.css'

const Demo = () => {
  return (
    <div className={css.demo}>
      {'harcoded!'}
      <LensTest message={'Yeaaa'} />
    </div>
  )
}

export default Demo
