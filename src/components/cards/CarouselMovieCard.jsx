import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const formatReleaseDate = (releaseDate) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  const date = new Date(releaseDate);
  return date.toLocaleDateString("en-GB", options).replace(",", "");
};

const CarouselMovieCard = ({ movie, width, height }) => {
  return (
    // <div>
    <Link
      to={`/movies/${movie.id}`}
      style={{
        textDecoration: "none",
        color: "inherit",
        display: "block",
      }}
    >
      <Image
        src={movie.posterPath}
        alt={movie.title}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          objectFit: "cover",
          borderRadius: "10px",
          marginBottom: "0px",
        //   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      />
      <div className="movie-info" style={{ marginTop: "0px", lineHeight: "1.3rem" }}>
        <p
          className="movie-title"
          style={{
            fontSize: "1rem",
            fontWeight: "bold",
            marginBottom: "0px",
            color: "#343a40",
          }}
        >
          {movie.title}
        </p>
        <p
          className="movie-release-date"
          style={{
            fontSize: "0.850rem",
            fontWeight: "normal",
            color: "#6c757d",
          }}
        >
          {formatReleaseDate(movie.releaseDate)}
        </p>
      </div>
      {/* </div> */}
    </Link>
  );
};

export default CarouselMovieCard;