import { Form } from "react-bootstrap";

interface inputTextAreaProps {
  label: string;
  defaultValue?: string;
  value: string | number | undefined;
  onChange(value: any): any;
}

export const InputTextArea = ({
  label = "",
  value = "",
  onChange = () => {},
}: inputTextAreaProps) => {
  return (
    <Form.Group controlId="formFileMultiple"className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        required
        as="textarea"
        rows={3}
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
