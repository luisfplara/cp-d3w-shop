import { Form } from "react-bootstrap";


interface inputTextProps {
 label: string
 defaultValue?: string|number
}

export const InputText = ({label = "", defaultValue}:inputTextProps) => {
  return (
    <Form.Group controlId="formFileMultiple" className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        required
        type="text"
        name={`${label}Input`}
        defaultValue={defaultValue}
      />
      <Form.Control.Feedback type="invalid">
        <span>This field can't be empty</span>
      </Form.Control.Feedback>
    </Form.Group>
  );
};
