import React from 'react'
import { NavLink } from 'react-router-dom'
import item_image from "./assets/lamp2.jpg"

const CatalogItem = ({id, name, price, type, power, diodes, producer}) => {
    return (
        <div className='catalog-item'>
            <img className="item-image" src={item_image} alt="Item"/>
            <div className="item-description">
                <h3 className="item-name">{name}</h3>
                <label className="item-price">Price: {price} hrn.</label>
                <label className="item-type">Type: {type}</label>
                <label className="item-type">Power: {power}</label>
                <label className="item-type">Number of diodes: {diodes}</label>
                <label className="item-type">Producer: {producer}</label>
            </div>
            <NavLink to={`/item/${id}`}>View more</NavLink>
        </div>
    )
}

export default CatalogItem
