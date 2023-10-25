import React, { FormEvent, useEffect, useState } from "react"

import { useMutation, useQuery } from "@apollo/react-hooks"
import { Button, Form } from "react-bootstrap"
import { Category, Media, Product } from "@models/models"
import { useRouter } from "next/router"

import InputText from "@components/forms/inputs/Text"
import InputTextArea from "@components/forms/inputs/TextArea"
import InputPrice from "@components/forms/inputs/Price"
import InputMultSelect from "@components/forms/inputs/Multiselect"
import InputImages from "@components/forms/inputs/Image"
import CreateCategoryModal from "@components/Modal/createCategory"

import {
  GET_CATEGORIES,
  GET_PRODUCT,
  UPDATE_PRODUCT,
  INSERT_PRODUCT
} from "../../../../server/queries"

import withApollo from "../../../../server/apollo"

function Products() {
  const router = useRouter()
  const { id } = router.query

  const { data: categoriesData } = useQuery(GET_CATEGORIES)
  const { data } = useQuery(GET_PRODUCT, {
    variables: { id }
  })
  const [insertProduct] = useMutation(INSERT_PRODUCT)
  const [updateProduct] = useMutation(UPDATE_PRODUCT)

  const [productCategories, setProductCategories] = useState<
    (Category | undefined)[]
  >([])
  const [images, setImages] = useState<(Media | undefined)[]>([])
  const [show, setShow] = useState(false)
  const [validated, setValidated] = useState(false)
  const [categories, setCategories] = useState<[Category]>()
  const [product, setProduct] = useState<Product>()

  const handleShow = () => setShow(true)

  useEffect(() => {
    if (data) {
      setProduct(data.product)
    }
  }, [data])

  useEffect(() => {
    if (categoriesData && categoriesData.categories) {
      setCategories(categoriesData.categories)
    }
  }, [categoriesData])

  const uploadImgToServer = async () => {
    const fileFormDataOrdened = new FormData()

    images?.forEach((file) => {
      if (file) if (file.file) fileFormDataOrdened.append("image", file.file)
    })

    const response = await fetch("../../api/upload", {
      method: "POST",
      body: fileFormDataOrdened
    })
    return response.json()
  }

  async function onSubmitCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    if (form.checkValidity() === true) {
      const imagesUrl = await uploadImgToServer()

      insertProduct({
        variables: {
          name: formData.get("NameInput"),
          description: formData.get("DescriptionInput"),
          price: formData.get("PriceInput"),
          stock: formData.get("StockInput"),
          // eslint-disable-next-line no-underscore-dangle
          categories: productCategories?.map((obj) => obj?._id),
          images: imagesUrl.uploads
        }
      }).then(() => {
        setValidated(false)
        form.reset()
      })
    }
    setValidated(true)
  }

  async function onSubmitUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    if (form.checkValidity() === true) {
      const imagesUrl = await uploadImgToServer()

      updateProduct({
        variables: {
          _id: id,
          name: formData.get("NameInput"),
          description: formData.get("DescriptionInput"),
          price: formData.get("PriceInput"),
          stock: formData.get("StockInput"),
          // eslint-disable-next-line no-underscore-dangle
          categories: productCategories?.map((obj) => obj?._id),
          images: imagesUrl.uploads ? imagesUrl.uploads : product?.images
        }
      })
        .then((result) => {
          console.log("result")
          console.log(result)
          setValidated(false)
          form.reset()
        })
        .catch((err) => {
          console.log(" console.log(err)console.log(err)")
          console.log(err)
        })
    }
    setValidated(true)
  }

  console.log("images", images)
  console.log(typeof window === "undefined")

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
          required={!product}
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
  )
}

export default withApollo({ ssr: typeof window === "undefined" })(Products)
