import { Col, Form, InputGroup, Row } from "react-bootstrap"

interface InputPriceProps {
  defaultValueSalePrice?: number
  defaultValuePrice?: number
}
const InputPrice = ({
  defaultValueSalePrice,
  defaultValuePrice
}: InputPriceProps) => (
  <Form.Group controlId="formFileMultiple" className="mb-3">
    <Form.Label>Price</Form.Label>
    <Row>
      <Col>
        <InputGroup className="mb-3">
          <InputGroup.Text>Regular</InputGroup.Text>
          <Form.Control
            required
            name="PriceInput"
            defaultValue={defaultValuePrice}
          />
          <Form.Control.Feedback type="invalid">
            <span>É necessário inserir o valor produto</span>
          </Form.Control.Feedback>
        </InputGroup>
      </Col>
      <Col>
        <InputGroup className="mb-3">
          <InputGroup.Text>Sale</InputGroup.Text>
          <Form.Control
            name="SalePriceInput"
            defaultValue={defaultValueSalePrice}
          />
        </InputGroup>
      </Col>
    </Row>
  </Form.Group>
)

export default InputPrice
