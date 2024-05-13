import React from 'react'

const Spotify = () => {
  return (
    <aside className='spotify__wrapper'>
        <iframe 
        style={{
            borderRadius:"12px",
            // border: "1px solid var(--ra-red)",
            // width: "30vw"
         }}
        src="https://open.spotify.com/embed/artist/1JcefSOP7bcWEluL0iEIaN?utm_source=generator" 
        width="100%" 
        height="152" 
        frameBorder="0" 
        allowFullScreen="" 
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
        loading="lazy"></iframe>
    </aside>
  )
}

export default Spotify