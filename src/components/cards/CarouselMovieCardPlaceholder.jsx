import React from "react";
import { Card, Placeholder } from "react-bootstrap";

const CarouselMovieCardPlaceholder = ({ width, height }) => {
  return (
    <div className="mx-2">
      <Card style={{ width: `${width}px` }} className="rounded rounded-2 border border-0">
        <Placeholder animation="wave" className="rounded">
          <Placeholder
            style={{
                width: `${width}px`,
                height: `${height}px`,
                objectFit: "cover",
                borderRadius: "10px",
                marginBottom: "0px",
            }}
            // className="p-1"
          />
          <Placeholder xs={10} className="rounded border border-0" />
          <Placeholder xs={10} className="rounded border border-0" />
        </Placeholder>
      </Card>
    </div>
  );
};

export default CarouselMovieCardPlaceholder;