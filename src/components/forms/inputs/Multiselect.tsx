import Multiselect from "multiselect-react-dropdown";
import { Button, Col, Form, Row } from "react-bootstrap";
import { List } from "realm";

interface inputMultSelectProps {
  label: string;
  list: string[];
  showModal?(): any;
  onChange(value: any): any;
}

export const InputMultSelect = ({
  label = "",
  list = [],
  showModal = () => {},
  onChange = () => {},
}: inputMultSelectProps) => {
  return (
    <Form.Group controlId="formFileMultiple" className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Row>
        <Col>
          <Multiselect
            placeholder={"Select"}
            options={list}
            isObject={false}
            onSelect={(selectedList) => {
              onChange(selectedList);
            }}
            onRemove={(selectedList) => {
              onChange(selectedList);
            }}
          />
        </Col>
        <Col md="auto">
          <Button
            onClick={showModal}
            variant="outline-secondary"
            id="button-addon2"
          >
            Create
          </Button>
        </Col>
      </Row>
    </Form.Group>
  );
};
