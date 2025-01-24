import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Placeholder, Button, Form } from 'react-bootstrap';
import { Edit, Trash2, ChevronLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import CarouselMovieCardPlaceholder from './cards/CarouselMovieCardPlaceholder';

const MovieDetails = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(`http://localhost:5037/api/movies/${id}`);
                const data = await response.json();
                setMovie(data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchGenres = async () => {
            try {
                const response = await fetch('http://localhost:5037/api/genres');
                const data = await response.json();
                setGenres(data.genres);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };

        fetchMovie();
        fetchGenres();
    }, [id]);

    const handleEdit = (id) => {
        setIsEditing(true);
        console.log("Edit movie with id:", id);
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:5037/api/movies/${movie.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(movie),
            });

            if (response.ok) {
                console.log(response);
                toast.success(`Movie updated successfully!`);
                setIsEditing(false);
            } else {
                toast.error(response.statusText);
                // toast.error('Failed to update movie');
            }
        } catch (error) {
            toast.error('Error updating movie');
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setMovie((prevMovie) => ({ ...prevMovie }));
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleDeleteClick = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete(id);
            }
        });
    };
  
    const handleDelete = async (movieId) => {
        try {
        const response = await fetch(`http://localhost:5037/api/movies/${movieId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            toast.success('Movie deleted successfully!');
            navigate('/');
        } else {
            toast.error('Failed to delete movie');
        }
        } catch (error) {
            toast.error('Error deleting movie');
        }
    };

    return (
        <Container className="mt-2">
            <Button variant="secondary mb-2" onClick={handleGoBack}>
                <ChevronLeft size={20} /> Back
            </Button>

            { loading ? (
                <Row xs={1} sm={2} md={12} className="gy-4">
                    <Col md={4}>
                        <Card.Img
                            variant="top"
                            src="https://placehold.co/100x150?text=Movie\nImage"
                            alt="Placeholder"
                            animation="wave"
                            // width="400"
                            // height="550"
                            width="100%"
                            height="100%"
                            className="rounded-3 border border-1"
                        />
                        {/* <CarouselMovieCardPlaceholder width={'500px'} height={'1000px'} /> */}
                    </Col>
                    <Col md={8}>
                        <Card.Body>
                            <Placeholder className="fs-3 fw-bold" as={Card.Title} animation="glow">
                                <Placeholder xs={6} />
                            </Placeholder>
                            <Placeholder as={Card.Title} animation="glow" >
                                <Placeholder xs={3} /> <br/>
                                <Placeholder xs={4} /> <br/>
                                <Placeholder xs={3} /> <br/>
                                <Placeholder xs={12} /> <br/>
                                <Placeholder xs={12} /> <br/>
                                <Placeholder xs={12} /> <br/>
                                <Placeholder xs={12} /> <br/>
                                <Placeholder xs={12} /> <br/>
                                <Placeholder xs={12} /> <br/>
                                <Placeholder xs={12} /> <br/>
                                <Placeholder xs={12} /> 
                                <Placeholder xs={12} /> 
                                <Placeholder xs={12} />{' '}
                                <Placeholder xs={12} /> 
                                <Placeholder xs={12} />
                            </Placeholder>
                        </Card.Body>
                        <Placeholder.Button variant="primary" xs={1}/>
                        <Placeholder.Button variant="danger" xs={1} />
                    </Col>
                </Row>
            )   : isEditing ? (
                <Row xs={1} sm={2} md={12} className="gy-4">
                    <Col md={4}>
                        <Card.Img
                            variant="top"
                            src={movie.posterPath}
                            alt={movie.title}
                            // width="400"
                            // height="550"
                            width="100%"
                            height="100%"
                            //style={{ objectFit: 'cover' }}
                            rounded="true"
                            className="rounded-3 border border-1"
                        />
                    </Col>
                    <Col md={8}>
                        {/* <Card.Body className="p-4 border rounded h-100"> */}
                        <Card.Body className="p-4 border rounded h-100 d-flex flex-column justify-content-between">
                            <h4 className="mb-4">Edit Movie</h4>
                            <Form>
                                <Form.Group controlId="formTitle" className="mb-3">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={movie.title}
                                        onChange={(e) => setMovie({ ...movie, title: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formGenre" className="mb-3">
                                    <Form.Label>Genre</Form.Label>
                                    <Form.Select 
                                        name="genreId"
                                        aria-label={`Genre`}
                                        value={movie.genre?.name || ''}
                                        onChange={(e) => setMovie({ ...movie, genre: { ...movie.genre, name: e.target.value } })}
                                        required
                                    >
                                        <option>Genre</option>
                                        {genres.map((genre) => (
                                            <option key={genre.id} value={genre.name}>{genre.name}</option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        Please add a genre
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formReleaseDate" className="mb-3">
                                    <Form.Label>Release Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        // value={movie.releaseDate}
                                        // onChange={(e) => {
                                        //     const selectedDate = new Date(e.target.value).toLocaleDateString('en-US', {
                                        //         month: 'short',
                                        //         day: '2-digit',
                                        //         year: 'numeric',
                                        //     });
                                        //     setMovie({ ...movie, releaseDate: selectedDate });
                                        // }}
                                        value={new Date(movie.releaseDate).toISOString().slice(0, 10)}
                                        // onChange={(e) => setMovie({ ...movie, releaseDate: e.target.value })}
                                        // onChange={(e) => {
                                        //     const date = new Date(e.target.value);
                                        //     console.log('on change release date', date);

                                        //     const formattedDate = date.toLocaleDateString('en-US', {
                                        //         month: 'short',
                                        //         day: '2-digit',
                                        //         year: 'numeric',
                                        //     });
                                        //     setMovie({ ...movie, releaseDate: formattedDate });
                                        // }}
                                        onChange={(e) => {
                                            const inputDate = new Date(e.target.value);
                                            const formattedDate = inputDate.toDateString().split(' ');
                                            const customFormattedDate = `${formattedDate[1]} ${formattedDate[2]}, ${formattedDate[3]}`;
                                            console.log('on change release date', customFormattedDate);
                                            setMovie({ ...movie, releaseDate: customFormattedDate });
                                        }}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formDuration" className="mb-3">
                                    <Form.Label>Duration (minutes)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter duration"
                                        value={movie.duration}
                                        onChange={(e) => setMovie({ ...movie, duration: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formDuration" className="mb-3">
                                    <Form.Label>Poster Link</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter poster URL"
                                        value={movie.posterPath}
                                        onChange={(e) => setMovie({ ...movie, posterPath: e.target.value })}
                                    />
                                </Form.Group>
                            </Form>
                            
                            <Card.Footer className="bg-transparent border-0 mt-4 d-flex justify-content-end">
                                <Button variant="primary" onClick={handleSave}>Save</Button>
                                <Button variant="secondary" onClick={handleCancel} className="ms-2">Cancel</Button>
                            </Card.Footer>
                        </Card.Body>
                    </Col>
                </Row>
            ) : (
                <Row xs={1} sm={2} md={12} className="gy-4">
                    <Col md={4}>
                        <Card.Img
                            variant="top"
                            src={movie.posterPath}
                            alt={movie.title}
                            // width="400"
                            // height="550"
                            width="100%"
                            height="100%"
                            // style={{ objectFit: 'cover' }}
                            rounded="true"
                            className="rounded-3 border border-1"
                        />
                    </Col>
                    <Col md={8}>
                        <Card.Body>
                            <Card.Title className="fs-1 fw-bold">{movie.title}</Card.Title>
                            <Card.Text className="fs-4 fw-lighter">
                                Genre: <span class="fs-5 fw-lighter">{ movie.genre?.name }</span> <br/>
                                Release On: <span class="fs-5 fw-lighter">{ movie.releaseDate}</span> <br/>
                                Duration: <span class="fs-5 fw-lighter">{ movie.duration}  Mins</span> <br/>
                                Description: <span class="fs-5 fw-lighter">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis reprehenderit, sed dolorum soluta adipisci quod doloremque delectus eum asperiores, illum ea ab cupiditate dolore vitae voluptatibus quae neque. Ipsam, deserunt. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis reprehenderit, sed dolorum soluta adipisci quod doloremque delectus eum asperiores, illum ea ab cupiditate dolore vitae voluptatibus quae neque. Ipsam, deserunt. Officiis reprehenderit, sed dolorum soluta adipisci quod doloremque delectus eum asperiores, illum ea ab cupiditate dolore vitae voluptatibus quae neque. Ipsam, deserunt.</span>
                            </Card.Text>
                            {user && (
                                <>
                                    <Button variant="primary" onClick={() => handleEdit(movie.id)}>
                                        <Edit size={16} className="me-2" /> Edit
                                    </Button>
                                    <Button variant="danger" className="ms-2" onClick={() => handleDeleteClick(movie.id)}>
                                        <Trash2 size={16} className="me-2" /> Delete
                                    </Button>
                                </>
                            )}
                        </Card.Body>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default MovieDetails;