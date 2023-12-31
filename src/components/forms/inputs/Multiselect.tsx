import { Category } from "@models/models"
import Multiselect from "multiselect-react-dropdown"
import { RefObject } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"

interface InputMultSelectProps {
  label: string
  list?: [Category]
  showModal?(): void
  setCategories(prevState: (Category | undefined)[]): void
  defaultValue?: [Category]
  ref: RefObject<Multiselect>
}

const InputMultSelect = ({
  label = "",
  list,
  showModal = () => {},
  setCategories,
  defaultValue,
  ref
}: InputMultSelectProps) => {
  const handleCategories = (selectedList: (Category | undefined)[]) =>
    setCategories(selectedList)

  return (
    <Form.Group controlId="formFileMultiple" className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Row>
        <Col>
          <Multiselect
            ref={ref}
            placeholder="Select"
            selectedValues={defaultValue}
            displayValue="name"
            options={list}
            isObject
            onSelect={(selectedList) => handleCategories(selectedList)}
            onRemove={(selectedList) => handleCategories(selectedList)}
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
  )
}

export default InputMultSelect
