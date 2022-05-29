import React, {useState} from 'react'
import './sider.css'
import BtnSlider from './Btn'
import dataSlider from './data'

export default function About() {

    const [slideIndex, setSlideIndex] = useState(1)

    const nextSlide = () => {
        if(slideIndex !== dataSlider.length){
            setSlideIndex(slideIndex + 1)
        } 
        else if (slideIndex === dataSlider.length){
            setSlideIndex(1)
        }
    }

    const prevSlide = () => {
        if(slideIndex !== 1){
            setSlideIndex(slideIndex - 1)
        }
        else if (slideIndex === 1){
            setSlideIndex(dataSlider.length)
        }
    }

    const moveDot = index => {
        setSlideIndex(index)
    }

    return (
        <div className="container-slider" id="about">
            {dataSlider.map((obj, index) => {
                return (
                    <div
                    className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
                    
                   >
                       <h1>{obj.title}<br/> {obj.subTitle}</h1>
                   
                        <img 
                         
                        src={process.env.PUBLIC_URL + `/Img/img${index + 1}.png`} 
                        />
                        
                       
                    </div>
                )
            })}
            
            <BtnSlider moveSlide={nextSlide} direction={"next"} />
            <BtnSlider moveSlide={prevSlide} direction={"prev"}/>

            <div className="container-dots">
                {Array.from({length: 5}).map((item, index) => (
                    <div 
                    onClick={() => moveDot(index + 1)}
                    className={slideIndex === index + 1 ? "dot active" : "dot"}
                    ></div>
                ))}
            </div>
        </div>
    )
}