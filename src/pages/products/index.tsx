import { CButton } from "@coreui/react";
import React, { useEffect, useLayoutEffect, useState } from "react";

import { useQuery } from "@apollo/react-hooks";
import { Pagination } from "@components/Pagination";
import { ProductList } from "@components/Product";
import withApollo from "../../../server/apollo";
import { GET_PRODUCTS3 } from "../../../server/queries";
import { Card } from "react-bootstrap";

import { INSERT_PRODUCT } from "../../../server/queries";
import { Product, ProductSchema } from "@models/models";

import * as Realm from "realm-web";
import Link from "next/link";
import { useRouter } from "next/router";

function Products() {
  let { data, loading, error } = useQuery(GET_PRODUCTS3);
  //const [ products, setProducts ] = useState([]);

  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    if (data) {
      console.log("aaaa");
      console.log(data);
      setProducts(data.products);
    }
  }, [data]);
  const router = useRouter();
  console.log("products");
  console.log(products);
  return (
    <>
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
            <ProductList productData={products} />
          </Card.Body>
        ) : (
          "loading"
        )}
      </Card>
    </>
  );
}
//  <PokemonList products={products} />
export default withApollo({ ssr: typeof window == "undefined" })(Products);

/*
export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const pokemonListURL = `${process.env.NEXT_PUBLIC_POKEMON_LIST_API_BASE_URL}pokemons` || ''
  let page = 1
  if (context.query?.page && typeof context.query.page === 'string') {
    page = parseInt(context.query.page, 10)
  }

  let perPage = 20
  if (context.query?.per_page && typeof context.query.per_page === 'string') {
    perPage = parseInt(context.query.per_page.toString(), 10)
  }

  let sort = 'id'
  if (context.query?.sort && typeof context.query.sort === 'string') {
    sort = context.query.sort
  }

  let order = 'asc'
  if (context.query?.order && typeof context.query.order === 'string') {
    order = context.query.order
  }

  const { data: pokemons, headers } = await axios.get<Pokemon[]>(pokemonListURL, {
    params: {
      _page: page,
      _limit: perPage,
      _sort: sort,
      _order: order,
    },
  })

  const total = parseInt(headers['x-total-count'], 10)
  const pokemonResource: Resource<Pokemon> = newResource(pokemons, total, page, perPage)

  return {
    props: {
      pokemonResource,
      page,
      perPage,
      sort,
      order,
    }, // will be passed to the page component as props
  }
}
*/
