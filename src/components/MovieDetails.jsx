import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Placeholder, Button, Form } from 'react-bootstrap';
import { Edit, Trash2, ChevronLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const MovieDetails = () => {
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
                toast.success(`Movie updated successfully!`);
                setIsEditing(false);
            } else {
                toast.error('Failed to update movie');
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
                            src="https://placehold.co/100x150"
                            alt="Placeholder"
                            animation="wave"
                            // width="400"
                            // height="550"
                            width="100%"
                            height="100%"
                            className="border border-1"
                        />
                    </Col>
                    <Col md={8}>
                        <Card.Body>
                            <Placeholder className="fs-3 fw-bold" as={Card.Title} animation="glow">
                                <Placeholder xs={6} />
                            </Placeholder>
                            <Placeholder as={Card.Text} animation="glow">
                                <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                                <Placeholder xs={6} /> <Placeholder xs={8} />
                            </Placeholder>
                        </Card.Body>
                        <Placeholder.Button variant="primary" xs={1} />
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
                            style={{ objectFit: 'cover' }}
                            className="border border-1"
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
                                        value={movie.releaseDate}
                                        onChange={(e) => setMovie({ ...movie, releaseDate: e.target.value })}
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
                            className="border border-1"
                        />
                    </Col>
                    <Col md={8}>
                        <Card.Body>
                            <Card.Title className="fs-1 fw-bold">{movie.title}</Card.Title>
                            <Card.Text className="fs-4 fw-lighter">
                                Genre: { movie.genre?.name } <br/>
                                Release On: { movie.releaseDate} <br/>
                                Duration: { movie.duration } Mins
                            </Card.Text>
                            <Button variant="primary" onClick={ () => handleEdit(movie.id) }>
                                <Edit size={16} className="me-2" />Edit
                            </Button>
                            <Button variant="danger" className="ms-2" onClick={ () => handleDeleteClick(movie.id) }>
                                <Trash2 size={16} className="me-2" /> Delete
                            </Button>
                        </Card.Body>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default MovieDetails;