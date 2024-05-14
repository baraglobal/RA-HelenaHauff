import React from 'react'

const StandFirst = (props) => {

    const { data } = props;

  return (
    <section className='stand-first__wrapper'>
       <h2>{data.text}</h2> 
    </section>
  )
}

export default StandFirst