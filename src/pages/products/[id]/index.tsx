import React, {
  FormEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { InputText } from "@components/forms/inputs/Text";

import { useLazyQuery, useMutation, useQuery } from "@apollo/react-hooks";
import { Pagination } from "@components/Pagination";
import Multiselect from "multiselect-react-dropdown";
import withApollo from "../../../../server/apollo";
import {
  GET_CATEGORIES,
  GET_PRODUCT,
  GET_PRODUCTS3,
} from "../../../../server/queries";
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
import { useRouter } from "next/router";
import { InputTextArea } from "@components/forms/inputs/TextArea";
import { InputPrice } from "@components/forms/inputs/Price";
import { InputMultSelect } from "@components/forms/inputs/Multiselect";
import { InputImages } from "@components/forms/inputs/Image";

function Products() {
  const router = useRouter();

  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { id: router.query.id },
  });

  const [product, setProduct] = useState<Product>();


  console.log("products");
  console.log(product);

  const [insertProduct] = useMutation(INSERT_PRODUCT);
  const { data: categories_data } = useQuery(GET_CATEGORIES);

  const [validated, setValidated] = useState(false);
  const [categories, setCategories] = useState([""]);

  const [show, setShow] = useState(false);
  

  const resetSelectedValues = useRef<Multiselect>(null);

  const [nameInputField, setNameInputField] = useState();
  const [descriptionInputField, setDescriptionInpuntField] = useState();
  const [priceInputField, setPriceInputField] = useState();
  const [dealPriceInputField, setDealPriceInputField] = useState();
  const [stockInputField, setStockInputField] = useState();
  const [categoriesInputField, setCategoriesInputField] = useState();
  const [imageInputField, setImageInputField] = useState();



  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  useEffect(() => {
    if (data) {
      console.log("aaaa");
      console.log(data);
      setNameInputField(data.product.name);
      setPriceInputField(data.product.price);
      setDescriptionInpuntField(data.product.short_desc);
      setProduct(data.product);
      //setImagetURL(product?.sm_pictures)
    }
  }, [data]);

  useEffect(() => {
    if (categories_data && categories_data.categories) {

      let aux = [""];
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

      const imagesUrl = await uploadImgToServer(formData);


      insertProduct({
        variables: {
          name: formData.get("NameInput"),
          short_desc: formData.get("DescriptionInput"),
          price: formData.get("PriceInput"),
          stock: formData.get("StockInput"),
          categories: categoriesInputField,
          images: imagesUrl.uploads,
        },
      }).then((result) => {

        setValidated(false);
        form.reset();

      });

      console.log("formData");
      console.log(formData);

      //  event.stopPropagation();
    }
    setValidated(true);
  }

  const uploadImgToServer = async (formData: FormData) => {

    const response = await fetch("../../api/upload", {
      method: "POST",
      body: formData,
    });

    return response.json();
  };


  return (
    <>
      <Form noValidate validated={validated} onSubmit={onSubmit}>
        <InputText
          label="Name"
          value={nameInputField}
          onChange={setNameInputField}
        />

        <InputTextArea
          label="Description"
          value={descriptionInputField}
          onChange={setDescriptionInpuntField}
        />

        <InputPrice
          princeValue={priceInputField}
          salePriceValue={dealPriceInputField}
          onSalePrinceChange={setDealPriceInputField}
          onPrinceChange={setPriceInputField}
        />

        <InputText
          label="Stock"
          value={stockInputField}
          onChange={setStockInputField}
        />

        <InputMultSelect
          label="Categories"
          list={categories}
          onChange={setCategoriesInputField}
          showModal={handleShow}
        />

        <InputImages label="Images" setFileList={setImageInputField}/>

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
    </>
  );
}
const aux = () => {};

export default withApollo({ ssr: typeof window == "undefined" })(Products);
