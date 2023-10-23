import { Form } from "react-bootstrap";

interface inputTextProps {
  label: string;
  value: string|number | undefined;
  onChange(value: any): any;
}

export const InputText = ({
  label = "",
  value = "",
  onChange = () => {},
}: inputTextProps) => {
  return (
    <Form.Group controlId="formFileMultiple" className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        required
        type="text"
        name={`${label}Input`}
        value={value}
        onChange={(event) => onChange(event.currentTarget.value)}
      />
      <Form.Control.Feedback type="invalid">
        <span>This field can't be empty</span>
      </Form.Control.Feedback>
    </Form.Group>
  );
};
