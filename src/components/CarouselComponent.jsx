import React from 'react';
import { Carousel, Image } from 'react-bootstrap';
import img1 from '../assets/img/carousel/img1.jpg';
import img2 from '../assets/img/carousel/img2.jpg';
import img3 from '../assets/img/carousel/img3.jpg';
import img4 from '../assets/img/carousel/img4.jpg';
import img5 from '../assets/img/carousel/img5.jpg';

const images = [
    { src: img4, title: "Avatar (2010)", description: "Their world. A new home" },
    { src: img2, title: "Inception (2009)", description: "Your mind is the scene of the crime." },
    { src: img3, title: "Assassin's Creed (2016)", description: "We work in the Dark, to serve the Light" },
    { src: img5, title: "Stalker (1979)", description: "When a man thinks of the past, he becomes kinder." },
    { src: img1, title: "Taxi Driver (1976)", description: "You talkin' to me?" },
];

const CarouselComponent = () => {
    return (
        <Carousel interval={2000}>
            {images.map((image, index) => (
                <Carousel.Item key={index}>
                    <img
                        className="d-block w-100"
                        src={image.src}
                        alt={image.title}
                        // width="1500"
                        // height="600"
                        style={{ height: "500px", objectFit: "cover" }}
                    />
                    <Carousel.Caption>
                        <h3>{image.title}</h3>
                        <p>{image.description}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

// const CarouselComponent = ({ imageSrc }) => {
//     return (
//         <Carousel>
//             {[1, 2, 3].map((_, index) => (
//                 <Carousel.Item key={index}>
//                     <Image src={imageSrc} fluid />
//                     <Carousel.Caption>
//                     <h3>{`Slide ${index + 1}`}</h3>
//                     <p>Description for Slide {index + 1}</p>
//                     </Carousel.Caption>
//                 </Carousel.Item>
//             ))}
//         </Carousel>
//     );
// };

export default CarouselComponent;