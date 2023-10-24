import { Button, Form, Modal } from "react-bootstrap";
interface inputMultSelectProps {
  show: boolean;
  setShow(value: any): any;
}

const CreateCategoryModal = ({show, setShow}:inputMultSelectProps) => {

  const handleClose = () => setShow(false);
 
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Criar nova categoria</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label>Nome</Form.Label>
        <Form.Control required type="text" name="name" />
        <Form.Control.Feedback type="invalid">
          <span>É necessário inserir um nome para o produto</span>
        </Form.Control.Feedback>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateCategoryModal;
