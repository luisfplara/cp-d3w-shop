import { CButton } from "@coreui/react"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { Card } from "react-bootstrap"

import { ProductList } from "@components/Product"
import { Product } from "@models/models"
import { DELETE_PRODUCT, GET_PRODUCTS } from "../../../server/queries"

function Products() {
  const { data, error } = useQuery(GET_PRODUCTS, {
    errorPolicy: "all"
  })
  const [deleteProduct] = useMutation(DELETE_PRODUCT)
  const [products, setProducts] = useState<Product[]>()

  useEffect(() => {
    console.log("data", data)

    if (data) {
      setProducts(data.products)
    }
  }, [data])
  const router = useRouter()
  console.log("error", error)

  return (
    <Card>
      <Card.Header>
        <CButton
          color="primary"
          size="lg"
          onClick={() => router.push("/products/new")}
        >
          New
        </CButton>
      </Card.Header>

      {products ? (
        <Card.Body>
          <ProductList productData={products} deleteProduct={deleteProduct} />
        </Card.Body>
      ) : (
        "loading"
      )}
    </Card>
  )
}

export default Products
