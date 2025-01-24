import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Plus } from 'lucide-react';
import ModalForm from './../components/ModalForm';

const AddMovie = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <Plus size={20} /> Movie
      </Button>
      <ModalForm show={show} handleClose={handleClose} />
    </>
  );
};

export default AddMovie;