import React from 'react';
import { Carousel, Image } from 'react-bootstrap';

const CarouselComponent = ({ imageSrc }) => {
    return (
        <Carousel>
            {[1, 2, 3].map((_, index) => (
                <Carousel.Item key={index}>
                    <Image src={imageSrc} fluid />
                    <Carousel.Caption>
                    <h3>{`Slide ${index + 1}`}</h3>
                    <p>Description for Slide {index + 1}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default CarouselComponent;