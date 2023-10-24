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
  GET_PRODUCTS,
  UPDATE_PRODUCT,
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
import { Category, Media, Product } from "@models/models";
import { useRouter } from "next/router";
import { InputTextArea } from "@components/forms/inputs/TextArea";
import { InputPrice } from "@components/forms/inputs/Price";
import { InputMultSelect } from "@components/forms/inputs/Multiselect";
import { InputImages } from "@components/forms/inputs/Image";
import CreateCategoryModal from "@components/Modal/createCategory";

function Products() {
  const router = useRouter();
  const id = router.query.id;

  const { data } = useQuery(GET_PRODUCT, {
    variables: { id: id },
  });

  const [product, setProduct] = useState<Product>();

  console.log("products");
  console.log(product);

  const [insertProduct] = useMutation(INSERT_PRODUCT);
  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  const { data: categories_data } = useQuery(GET_CATEGORIES);

  const [productCategories, setProductCategories] = useState<[Category]>();

  const [images, setImages] = useState<(Media | undefined)[]>();
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [categories, setCategories] = useState<[Category]>();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (data) {
      setProduct(data.product);
    }
  }, [data]);

  useEffect(() => {
    if (categories_data && categories_data.categories) {
      setCategories(categories_data.categories);
    }
  }, [categories_data]);

  async function onSubmitCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (form.checkValidity() === true) {
      const imagesUrl = await uploadImgToServer();

      insertProduct({
        variables: {
          name: formData.get("NameInput"),
          description: formData.get("DescriptionInput"),
          price: formData.get("PriceInput"),
          stock: formData.get("StockInput"),
          categories: productCategories?.map((obj) => obj._id),
          images: imagesUrl.uploads,
        },
      }).then((result) => {
        console.log("result");
        console.log(result);
        setValidated(false);
        form.reset();
      });
    }
    setValidated(true);
  }

  async function onSubmitUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (form.checkValidity() === true) {
      const imagesUrl = await uploadImgToServer();

      updateProduct({
        variables: {
          _id: id,
          name: formData.get("NameInput"),
          description: formData.get("DescriptionInput"),
          price: formData.get("PriceInput"),
          stock: formData.get("StockInput"),
          categories: productCategories?.map((obj) => obj._id),
          images: imagesUrl.uploads ? imagesUrl.uploads : product?.images,
        },
      })
        .then((result) => {
          console.log("result");
          console.log(result);
          setValidated(false);
          form.reset();
        })
        .catch((err) => {
          console.log(" console.log(err)console.log(err)");
          console.log(err);
        });
    }
    setValidated(true);
  }

  const uploadImgToServer = async () => {
    const fileFormDataOrdened = new FormData();

    images?.forEach((file, index) => {
      if (file) if (file.file) fileFormDataOrdened.append("image", file.file);
    });

    const response = await fetch("../../api/upload", {
      method: "POST",
      body: fileFormDataOrdened,
    });
    return response.json();
  };

  return (
    <>
      <Form
        noValidate
        validated={validated}
        onSubmit={product ? onSubmitUpdate : onSubmitCreate}
      >
        <InputText label="Name" defaultValue={product?.name} />

        <InputTextArea
          label="Description"
          defaultValue={product?.description}
        />

        <InputPrice
          defaultValuePrice={product?.price}
          defaultValueSalePrice={product?.sale_price}
        />

        <InputText label="Stock" defaultValue={product?.stock} />

        <InputMultSelect
          label="Categories"
          list={categories}
          setCategories={setProductCategories}
          showModal={handleShow}
          defaultValue={product?.categories}
        />

        <InputImages
          required={product ? false : true}
          label="Images"
          defaultValue={product?.images}
          onChangeImage={setImages}
          imagesList={images}
        />

        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Button variant="primary" type="submit">
            {product ? "Edit" : "Create"}
          </Button>
        </Form.Group>
      </Form>
      <CreateCategoryModal show={show} setShow={setShow} />
    </>
  );
}
const aux = () => {};

export default withApollo({ ssr: typeof window == "undefined" })(Products);
