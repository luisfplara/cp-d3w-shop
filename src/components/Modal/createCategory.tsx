import { Button, Form, Modal } from "react-bootstrap"
import { INSERT_CATEGORY } from "server/queries"
import { useMutation } from "@apollo/react-hooks"
import { FormEvent, useState } from "react"

interface InputMultSelectProps {
  show: boolean
  setShow(value: boolean): void
}

const CreateCategoryModal = ({ show, setShow }: InputMultSelectProps) => {
  const handleClose = () => setShow(false)
  const [insertCategory] = useMutation(INSERT_CATEGORY)
  const [validated, setValidated] = useState(false)

  const saveCategory = (event: FormEvent<HTMLFormElement>) => {
    console.log(event)
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    const name = formData.get("name")
    if (form.checkValidity() === true) {
      insertCategory({ variables: { name } }).then((data) => {
        setValidated(false)
        setShow(false)
        console.log(data)
      })
    } else {
      setValidated(false)
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form noValidate validated={validated} onSubmit={saveCategory}>
        <Modal.Header closeButton>
          <Modal.Title>Criar nova categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Nome</Form.Label>
          <Form.Control required type="text" name="name" />
          <Form.Control.Feedback type="invalid">
            <span>É necessário inserir um nome para o produto</span>
          </Form.Control.Feedback>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" type="submit">
            Salvar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default CreateCategoryModal
