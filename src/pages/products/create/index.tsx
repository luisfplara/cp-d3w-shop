import React, { FormEvent, useEffect, useLayoutEffect, useState } from 'react'
import { AdminLayout } from '@layout'
import { useQuery } from '@apollo/react-hooks';
import { Pagination } from '@components/Pagination'

import withApollo from '../../../../server/apollo';
import { GET_PRODUCTS3 } from '../../../../server/queries';
import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap'

import { Product } from '@models/models';


function Products() {

  const [validated, setValidated] = useState(false);
  type inputs = {
    key: '',
    value: ''
  }
  const formValue = Array()

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget;
    const formData = new FormData(event.currentTarget)
    console.log('formData')
    console.log(formData.entries())

    formData.forEach((value, key) => {

      formValue.push(
        {
          key: key,
          value: value
        }
      );


    });
    console.log('formValue')
    console.log(formValue)
    if (form.checkValidity() === false) {

      event.stopPropagation();
    }

    setValidated(true);
    /*
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: formData,
    })
 
    // Handle response if necessary
    const data = await response.json()
    console.log('datadatadatadata')
    console.log(data)
    setValidated(true);
    // ...*/
  }


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
          <Form.Control required as="textarea" rows={3} name='short_desc' />
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
                <Form.Control required name='price' />
                <Form.Control.Feedback type="invalid">
                  <span>É necessário inserir o valor produto</span>
                </Form.Control.Feedback>

              </InputGroup>
            </Col>
            <Col>
              <InputGroup className="mb-3">

                <InputGroup.Text>Promoção</InputGroup.Text>
                <Form.Control name='sale_price' />

              </InputGroup>
            </Col>

          </Row>
        </Form.Group>

        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label>Stock</Form.Label>
          <Form.Control required name='stock' />
          <Form.Control.Feedback type="invalid">
            <span>É necessário inserir a quantidade em estoque do produto</span>
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label>Categories</Form.Label>
          <Form.Select defaultValue="Choose..." name='categories'>
            <option>Choose...</option>
            <option>a</option>
            <option>b</option>
            <option>c</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label>Images</Form.Label>
          <Form.Control required type="file" multiple name='sm_pictures' />
          <Form.Control.Feedback type="invalid">
            <span>É necessário inserir ao menos uma imagem para o produto</span>
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Button variant="primary" type="submit">
            Salvar
          </Button>
        </Form.Group>
      </Form>
    </AdminLayout>

  )
}
function submitProduct() {

}

//  <PokemonList products={products} />
export default withApollo({ ssr: typeof window == 'undefined' })(Products);
/*

    <AdminLayout>

      <CForm >
        <div className="mb-3">
          <CFormLabel >Name</CFormLabel>
          <CFormInput type="text" />
        </div>
        <div className="mb-3">
          <CFormLabel >Description</CFormLabel>
          <CFormTextarea id="exampleFormControlTextarea1" rows={2}></CFormTextarea>
        </div>

        <CRow xs={{ gutter: 2 }}>
          <CFormLabel >Price</CFormLabel>
          <CCol md>
            <CInputGroup className="mb-3">
              <CInputGroupText>Regular</CInputGroupText>
              <CFormInput type="text" />
            </CInputGroup>
          </CCol>
          <CCol md>
            <CInputGroup className="mb-3">
              <CInputGroupText>Sale</CInputGroupText>
              <CFormInput type="text" />
            </CInputGroup>
          </CCol>
        </CRow>
        <div className="mb-3">
          <CFormLabel >Stock</CFormLabel>
          <CFormInput type="text" />
        </div>
        <CInputGroup className="mb-3">
          <CInputGroupText component="label" htmlFor="inputGroupSelect01">Options</CInputGroupText>
          <CFormSelect id="inputGroupSelect01">
            <option>Choose...</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </CFormSelect>
        </CInputGroup>
        <div className="mb-3">
          <CFormInput type="file" id="formFileMultiple" label="Images" multiple />
        </div>

      </CForm>
    </AdminLayout>
    


*/


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