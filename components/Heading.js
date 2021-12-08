import React from 'react'
import items_image from "./assets/lamp.jpg" 

const Heading = () => {
    return (
        <section className='heading'>
            <img className='heading__image' src={items_image} alt='items'/>
            <div className='heading__info'>
                <h2>Lamp:</h2>
                <p>
                a device for giving light, either one consisting of an electric bulb together with 
                    its holder and shade or cover, or one burning gas or oil and consisting of a wick or mantle and a glass shade.
                </p>
            </div>    
        </section>
    )
}

export default Heading
