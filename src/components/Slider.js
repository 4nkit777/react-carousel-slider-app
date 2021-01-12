import React, { useState, useEffect } from 'react';
import data from '../data';
import { IoChevronForwardCircle, IoChevronBackCircle } from 'react-icons/io5'

export default function Slider() {

    const [index, setIndex] = useState(0);
    // eslint-disable-next-line
    const [pics, setPics] = React.useState(data);

    useEffect(() => {
        const lastIndex = pics.length - 1;
        if(index < 0) {
            setIndex(lastIndex);
        }
        if(index > lastIndex) {
            setIndex(0);
        }
    }, [index, pics]);

    useEffect(() => {
        let sliderInterval = setInterval(() => {
            setIndex(index + 1);
        }, 3000);

        return () => clearInterval(sliderInterval);
    }, [index]);

    return (
        <div className='mt-5 container overflow-hidden d-flex position-relative' style={{ height: '950px' }}>
            
            {data.map(({ id, image, desc }, posIndex) => {
                let position = 'nextSlide';
                if( posIndex === index ) {
                    position = 'activeSlide';
                }

                if( posIndex === index - 1 || (index === 0 && posIndex === pics.length - 1)) {
                    position = 'lastSlide';
                }

                return (
                    <section key={id} className={position} >
                        <h3 className='position-absolute'>{desc}</h3>
                        <img src={image} style={{ width: '100%', height: '80%', borderRadius: '3px' }} alt={desc} />
                    </section>
                );
            })}

            <button className='prev' onClick={() => setIndex(index - 1)} >
                <IoChevronBackCircle style={{ width: '40px', height: '40px', color: 'yellow'}} />
            </button>
            
            <button className='next' onClick={() => setIndex(index + 1)} >
                <IoChevronForwardCircle style={{ width: '40px', height: '40px', color: 'yellow'}} />
            </button>
        </div>
    );
}