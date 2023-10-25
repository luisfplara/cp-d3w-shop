import { Form } from "react-bootstrap"

interface InputTextProps {
  label: string
  defaultValue?: string | number
}

const InputText = ({ label = "", defaultValue }: InputTextProps) => (
  <Form.Group controlId="formFileMultiple" className="mb-3">
    <Form.Label>{label}</Form.Label>
    <Form.Control
      required
      type="text"
      name={`${label}Input`}
      defaultValue={defaultValue}
    />
    <Form.Control.Feedback type="invalid">
      <span>This field can;`&apos;`t be empty</span>
    </Form.Control.Feedback>
  </Form.Group>
)

export default InputText
