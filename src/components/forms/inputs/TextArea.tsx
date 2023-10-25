import { Form } from "react-bootstrap"

interface InputTextAreaProps {
  label: string
  defaultValue?: string
}

const InputTextArea = ({ label = "", defaultValue }: InputTextAreaProps) => (
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
      <span>This field can`&apos;`t be empty</span>
    </Form.Control.Feedback>
  </Form.Group>
)

export default InputTextArea
