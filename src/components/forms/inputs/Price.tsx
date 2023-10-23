import { Col, Form, InputGroup, Row } from "react-bootstrap";

interface inputPriceProps {
  princeValue?: number;
  onPrinceChange(value: any): any;
  salePriceValue?: number;
  onSalePrinceChange(value: any): any;
}
export const InputPrice = ({
  princeValue = 0.0,
  onPrinceChange = (value: any) => {},
  salePriceValue = 0.0,
  onSalePrinceChange = (value: any) => {},
}: inputPriceProps) => {
  return (
    <Form.Group controlId="formFileMultiple" className="mb-3">
      <Form.Label>Price</Form.Label>
      <Row>
        <Col>
          <InputGroup className="mb-3">
            <InputGroup.Text>Regular</InputGroup.Text>
            <Form.Control
              required
              name="PriceInput"
              value={princeValue}
              onChange={(event) => onPrinceChange(event.currentTarget.value)}
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
              value={salePriceValue}
              onChange={(event) => onSalePrinceChange(event.currentTarget.value)}
            />
          </InputGroup>
        </Col>
      </Row>
    </Form.Group>
  );
};
