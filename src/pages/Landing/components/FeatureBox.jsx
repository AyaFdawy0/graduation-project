import React from 'react'

function FeatureBox(props) {
    return (
        <div className="a-box">
            <div className='a-b-img'>
                <img src={props.image} />
            </div>
            <div className="s-b-text">
                <h3>{props.title}</h3>
                <p>
               {props.des}
                </p>
                
            </div>
        </div>
    )
}

export default FeatureBox
