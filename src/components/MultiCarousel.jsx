import React, { useEffect, useState, useCallback } from 'react';
import { debounce } from 'lodash';
import Slider from "react-slick";
import { useMediaQuery } from "react-responsive";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card, Placeholder } from 'react-bootstrap';
import CarouselMovieCard from './cards/CarouselMovieCard';
import PeriodSlider from './filters/PeriodSlider';
import CarouselMovieCardPlaceholder from './cards/CarouselMovieCardPlaceholder';

const MultiCarousel = ({
    // size="medium", width, height, slidesToShow, slidesToScroll, speed = 800, autoPlay = true, autoPlaySpeed = 2500, cssEase = "ease-in-out"
    size="medium", 
    slideType="medium", 
    speed = 800, 
    autoplay = true, 
    autoplaySpeed = 2500, 
    cssEase = "ease-in-out"
}) => {
    const [carouselMovies, setCarouselMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState("today");
    
    // Define breakpoints
    const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
    const isTablet = useMediaQuery({ query: "(min-width: 600px) and (max-width: 1023px)" });
    const isMobile = useMediaQuery({ query: "(max-width: 599px)" });

    // Map size prop to dimensions
    const sizeMap = {
        small: { width: isDesktop ? 100 : isTablet ? 80 : 70, height: isDesktop ? 166 : isTablet ? 140 : 100 },
        medium: { width: isDesktop ? 150 : isTablet ? 150 : 200, height: isDesktop ? 226 : isTablet ? 250 : 280 },
        large: { width: isDesktop ? 200 : isTablet ? 160 : 220, height: isDesktop ? 326 : isTablet ? 280 : 326 },
    };

    // Map slide prop to dimensions
    const slideMap = {
        small: { slidesToShow: isDesktop ? 12 : isTablet ? 8 : 3, slidesToScroll: isDesktop ? 6 : isTablet ? 6 : 2 },
        medium: { slidesToShow: isDesktop ? 8 : isTablet ? 4 : 1, slidesToScroll: isDesktop ? 4 : isTablet ? 4 : 1 },
        large: { slidesToShow: isDesktop ? 6 : isTablet ? 4 : 1, slidesToScroll: isDesktop ? 5 : isTablet ? 5 : 1 },
    };

    // Set default to medium if size is not defined in sizeMap
    const { width, height } = sizeMap[size] || sizeMap["medium"];
    const { slidesToShow, slidesToScroll } = slideMap[slideType] || slideMap["medium"];

    // const NextArrow = (props) => {
    //     const { className, style, onClick } = props;
    //     return (
    //         <div
    //             className={className}
    //             style={{ ...style, display: "block", background: "" }}
    //             onClick={onClick}
    //         />
    //     );
    // };

    // const PrevArrow = (props) => {
    //     const { className, style, onClick } = props;
    //     return (
    //         <div
    //             className={className}
    //             style={{ ...style, display: "block", background: "" }}
    //             onClick={onClick}
    //         />
    //     );
    // };

    const fetchCarouselMovies = async (selectedFilter) => {
        try {
            // const response = await fetch(`http://localhost:5037/api/Movies?title=${selectedFilter}`);
            const response = await fetch(`http://localhost:5037/api/Movies`);
            const data = await response.json();
            return data.movies || [];
        } catch (error) {
            console.error("Error fetching movies:", error);
            return [];
        }
    };

    // Fetch movie data on component mount
    // useEffect(() => {
    //     const fetchData = async () => {
    //         setLoading(true);
    //         const movieData = await fetchCarouselMovies(filter);
    //         setCarouselMovies(movieData);
    //         setLoading(false);
    //     };

    //     fetchData();
    // }, [filter]);

    const debouncedFetchData = useCallback(
        (selectedFilter) => {
            setLoading(true);
            const handler = setTimeout(async () => {
                const movieData = await fetchCarouselMovies(selectedFilter);
                setCarouselMovies(movieData);
                setLoading(false);
            }, 1000);

            return () => clearTimeout(handler);
        },
        []
    );

    useEffect(() => {
        debouncedFetchData(filter);
    }, [filter, debouncedFetchData]);

    const handleToggle = (selectedFilter) => {
        setFilter(selectedFilter);
        console.log(`Filter changed to: ${selectedFilter}`);
        // Add logic to fetch new data based on the selected filter
    };

    const settings = {
        // slidesToShow: 6,
        // slidesToShow: 8,
        // slidesToScroll: 5,
        // autoplay: true,

        infinite: true,
        //infinite: false;
        speed,
        slidesToShow,
        slidesToScroll,
        autoplay: autoplay,
        autoplaySpeed: autoplaySpeed,
        cssEase,
        // initialSlide: 0,
        arrows: false,
        swipe: true,
        draggable: true,
        touchMove: true,
        responsive: [
            {
                // Tablet
                breakpoint: 1024, 
                settings: {
                    // slidesToShow: 3,
                    // slidesToScroll: 1,
                    slidesToShow: slidesToShow,
                    slidesToScroll: slidesToScroll,
                    infinite: true,
                    swipe: true,
                    draggable: true,
                    arrows: false,
                }
            },
            {
                // Mobile
                breakpoint: 600,
                settings: {
                    // slidesToShow: 3,
                    // slidesToScroll: 1,
                    slidesToShow: slidesToShow,
                    slidesToScroll: slidesToScroll,
                    swipe: true,
                    draggable: true,
                    arrows: false,
                }
            },
            {
                // Smaller mobile
                breakpoint: 480,
                settings: {
                    // slidesToShow: 1,
                    // slidesToScroll: 3,
                    slidesToShow: slidesToShow,
                    slidesToScroll: slidesToScroll,
                    swipe: true,
                    draggable: true,
                    arrows: false,
                    centerMode: true
                }
            }
        ]
    };

    return (
        <div className="">
            <div className="d-flex align-items-center justify-content-between mb-2">
                <h4>Trending</h4>
                <PeriodSlider
                    optionLabels={["Today", "This Week", "This Month", "This Year"]}
                    options={["today", "week", "month", "year"]}
                    activeOption={filter}
                    onChange={handleToggle}
                />
            </div>

            <div className="slider-container">
                <style>
                    {`
                        .slider-container {
                            position: relative;
                            //padding: 10px 0;
                        }

                        .slick-slide {
                            transition: transform 0.3s ease-in-out;
                        }

                        // .slick-slide:hover {
                        //     transform: scale(1.05);
                        //     border-radius: 10px
                        // }
                            
                        .slick-prev:before, 
                        .slick-next:before {
                            color: #db0f0f;
                            font-size: 25px;
                        }

                        .slick-track {
                            display: inline-block;
                        }

                        .slick-slide {
                            display: inline-block;
                        }
                    `}
                </style>

                <Slider {...settings}>
                    {loading ? (
                        [...Array(slidesToShow)].map((_, idx) => (
                            <CarouselMovieCardPlaceholder key={idx} width={width} height={height} />
                        ))
                    ) : (
                        carouselMovies.map((movie, index) => (
                            <CarouselMovieCard
                                key={index}
                                movie={movie}
                                width={width}
                                height={height}
                            />
                        ))
                    )}
                </Slider>
            </div>
        </div>
    );
};

export default MultiCarousel;