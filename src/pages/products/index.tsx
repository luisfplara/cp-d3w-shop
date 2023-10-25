import { CButton } from "@coreui/react"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { Card } from "react-bootstrap"

import { ProductList } from "@components/Product"
import { Product } from "@models/models"
import { DELETE_PRODUCT, GET_PRODUCTS } from "../../../server/queries"

import withApollo from "../../../server/apollo"

function Products() {
  const { data } = useQuery(GET_PRODUCTS)
  const [deleteProduct] = useMutation(DELETE_PRODUCT)
  const [products, setProducts] = useState<Product[]>()

  useEffect(() => {
    if (data) {
      setProducts(data.products)
    }
  }, [data])
  const router = useRouter()

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

export default withApollo({ ssr: typeof window === "undefined" })(Products)
