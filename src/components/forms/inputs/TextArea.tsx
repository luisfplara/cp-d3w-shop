import { Form } from "react-bootstrap";

interface inputTextAreaProps {
  label: string;
  defaultValue?: string
}

export const InputTextArea = ({ label = "",defaultValue }: inputTextAreaProps) => {
  return (
    <Form.Group controlId="formFileMultiple" className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        required
        as="textarea"
        rows={3}
        name={`${label}Input`}
        defaultValue={defaultValue}
      />
      <Form.Control.Feedback type="invalid">
        <span>This field can't be empty</span>
      </Form.Control.Feedback>
    </Form.Group>
  );
};
