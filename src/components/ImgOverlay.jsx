import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { Form, InputGroup, Button } from 'react-bootstrap';
import img from './../assets/img/overlayimage.png';

const ImgOverlay = () => {
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchText.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchText)}`);
        }
    };

    return (
        <Card className="bg-dark text-white border-0 position-relative">
            <Card.Img 
                src={img} 
                alt="Card image" 
                className="rounded-0"
                // style={{ objectFit: 'cover', height: '100%' }}
                style={{ objectFit: 'cover', height: '350px' }}
            />
            <div 
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    //   backgroundColor: 'rgba(0, 0, 255, 0.4)',
                    // backgroundColor: 'rgba(59, 130, 246, 0.5)',
                    backgroundColor: 'rgba(11, 49, 79, 0.8)',
                }}
            />
            <Card.ImgOverlay className="container d-flex flex-column justify-content-center align-items-start">
                <div className="lh-base">
                    <Card.Title className="fs-1 fw-bold" style={{ lineHeight: '0.7' }}>
                        Welcome.
                    </Card.Title>
                    <Card.Text className="fs-3 fw-normal" style={{ lineHeight: '1.3' }}>
                        Millions of movies, TV shows, and people to discover. Explore now.
                    </Card.Text>
                </div>
                
                <InputGroup variant="info" className="w-100 rounded-pill mt-4" size="lg">
                    <Form.Control
                        placeholder="Search for a movie, tv show, person......"
                        aria-label="Search"
                        aria-describedby="basic-addon2"
                        className="border border-0"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()} 
                    />
                    <Button 
                        variant="primary" 
                        id="button-addon2" 
                        // className="bg-info border border-0"
                        className="border border-0"
                        style={{
                            // backgroundColor: 'rgba(43, 48, 54, 1)',
                            backgroundColor: 'rgba(11, 49, 79, 1)',
                        }}
                        onClick={handleSearch}
                    >
                        Search
                    </Button>
                </InputGroup>
            </Card.ImgOverlay>
        </Card>
    );
};

export default ImgOverlay;
