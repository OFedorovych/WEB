import React from 'react'
import { useState } from 'react'
import item_image from "./assets/lamp2.jpg"

const Item = ({ allItemsMap, id }) => {

    const [item] = useState(() => allItemsMap[id])

    return (
        <div className='item'>
            <img className="item__item-image" src={item_image} alt="Item"/>
            <div className="item-info">
                <h1 className="item-name">{item.name}</h1>
                <label className="item-price">Price: {item.price} hrn.</label>
                <label className="item-price">Total price: {item.item_count * item.price} hrn.</label>
                <label className="item-weight">Power: {Math.round(item.weight_kg * 100) / 100} lm</label>
                <label className="item-type">Type: {item.item_type}</label>
                <label className="item-count">Ammount: {item.item_count}</label>
                <p>
                Very very good lamp. My son has the same one. He is very glad that he is my son. 
                    Pineapple, aerodynamic, mosquitoes, react
                </p>
            </div>
        </div>
    )
}

export default Item
