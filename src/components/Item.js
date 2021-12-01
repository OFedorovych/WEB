import React from 'react'
import { useState } from 'react'
import item_image from "./assets/lamp2.jpg"

const Item = ({ allItems, id }) => {

    const [item] = useState(allItems.find(item => item.id == id))

    return (
        <div className='item'>
            <img className="item__item-image" src={item_image} alt="Item"/>
            <div className="item-info">
                <h1 className="item-name">{item.name}</h1>
                <label className="item-price">Price: {item.price} hrn.</label>
                <label className="item-type">Type: {item.type}</label>
                <label className="item-type">Power: {item.power}</label>
                <label className="item-type">Number of diodes: {item.diodes}</label>
                <label className="item-type">Producer: {item.producer}</label>
                <p>
                    Very very good lamp. My son has the same one. He is very glad that he is my son. 
                    Pineapple, aerodynamic, mosquitoes, react
                </p>
            </div>
        </div>
    )
}

export default Item
