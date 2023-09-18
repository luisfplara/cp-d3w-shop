import React, {
  FormEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { AdminLayout } from "@layout";
import { useLazyQuery, useMutation, useQuery } from "@apollo/react-hooks";
import { Pagination } from "@components/Pagination";
import Multiselect from "multiselect-react-dropdown";
import withApollo from "../../../../server/apollo";
import { GET_CATEGORIES, GET_PRODUCTS3 } from "../../../../server/queries";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Modal,
  Row,
  Image,
  Table,
} from "react-bootstrap";
import { INSERT_PRODUCT } from "../../../../server/queries";
import { Product } from "@models/models";

function Products() {
  let [setProduc] = useMutation(INSERT_PRODUCT);
  const [validated, setValidated] = useState(false);
  const [categories, setCategories] = useState([""]);
  const [selectedCategories, setSelectedCategories] = useState([""]);
  const [images, setImages] = useState<FileList>();
  const [show, setShow] = useState(false);
  const { data: categories_data } = useQuery(GET_CATEGORIES);

  const [imagetURL, setImagetURL] = useState(Array<string>());
  const resetSelectedValues = useRef<Multiselect>(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const formValue = Array();

  useEffect(() => {
    if (categories_data.categories) {
      console.log("categoriescategories");
      let aux = [""];
      console.log(categories_data.categories);
      categories_data.categories.map((item: { name: string }) => {
        aux.push(item.name);
      });
      setCategories(aux);
    }
  }, [categories_data]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(event.currentTarget);

    if (form.checkValidity() === true) {
      // const imagesUrl = uploadImgToServer();
      const imagesUrl = await uploadImgToServer();
      console.log("selectedCategories");
      console.log(selectedCategories);

      setProduc({
        variables: {
          name: formData.get("name"),
          short_desc: formData.get("short_desc"),
          price: formData.get("price"),
          stock: formData.get("stock"),
          categories: selectedCategories,
          images: imagesUrl.file,
        },
      }).then((result) => {
        console.log("resultresultresultresult");
        console.log(result);
        setValidated(false);
        form.reset();
        setImagetURL([]);
        resetSelectedValues.current?.resetSelectedValues();
      });

      console.log("formData");
      console.log(formData);

      //  event.stopPropagation();
    }
    setValidated(true);
  }

  const uploadImgToServer = async () => {
    const body = new FormData();
    console.log("file", images);
    //s

    Array.from(images ? images : []).forEach((file) => {
      body.append("file", file);
    });

    const response = await fetch("../../api/upload", {
      method: "POST",
      body,
    });

    return response.json();
  };

  const imagesHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImages(event.target.files);
      let listFiles = Array<string>();
      Array.from(event.target.files).map((item) => {
        listFiles.push(URL.createObjectURL(item));
      });

      setImagetURL(listFiles);
    }
  };

  return (
    <AdminLayout>
      <Form noValidate validated={validated} onSubmit={onSubmit}>
        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control required type="text" name="name" />
          <Form.Control.Feedback type="invalid">
            <span>É necessário inserir um nome para o produto</span>
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control required as="textarea" rows={3} name="short_desc" />
          <Form.Control.Feedback type="invalid">
            <span>É necessário inserir uma descrição para o produto</span>
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label>Preço</Form.Label>
          <Row>
            <Col>
              <InputGroup className="mb-3">
                <InputGroup.Text>Normal</InputGroup.Text>
                <Form.Control required name="price" />
                <Form.Control.Feedback type="invalid">
                  <span>É necessário inserir o valor produto</span>
                </Form.Control.Feedback>
              </InputGroup>
            </Col>
            <Col>
              <InputGroup className="mb-3">
                <InputGroup.Text>Promoção</InputGroup.Text>
                <Form.Control name="sale_price" />
              </InputGroup>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label>Stock</Form.Label>
          <Form.Control required name="stock" />
          <Form.Control.Feedback type="invalid">
            <span>É necessário inserir a quantidade em estoque do produto</span>
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label>Categories</Form.Label>
          <Row>
            <Col>
              <Multiselect
                ref={resetSelectedValues}
                placeholder={"Selecione"}
                options={categories}
                isObject={false}
                displayValue="name"
                onSelect={(selectedList) => {
                  setSelectedCategories(selectedList);
                }}
                onRemove={(selectedList) => {
                  setSelectedCategories(selectedList);
                }}
              />
            </Col>
            <Col md="auto">
              <Button
                onClick={handleShow}
                variant="outline-secondary"
                id="button-addon2"
              >
                Criar
              </Button>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label>Images</Form.Label>
          <Form.Control
            required
            type="file"
            multiple
            name="sm_pictures"
            onChange={imagesHandler}
          />
          <Form.Control.Feedback type="invalid">
            <span>É necessário inserir ao menos uma imagem para o produto</span>
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Row className="align-items-center">
            {imagetURL.length > 1
              ? imagetURL.map((image, index) => (
                  <Col md="auto" key={index}>
                    <Image height="100px" width="100px" src={image} rounded />
                  </Col>
                ))
              : ""}
          </Row>
        </Form.Group>

        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Button variant="primary" type="submit">
            Salvar
          </Button>
        </Form.Group>
      </Form>

      <Modal show={show} onHide={handleClose}>
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
          <Button variant="primary" onClick={handleClose}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </AdminLayout>
  );
}

export default withApollo({ ssr: typeof window == "undefined" })(Products);
