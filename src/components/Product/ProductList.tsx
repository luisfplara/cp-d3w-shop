import { Dropdown, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import Image from 'next/image'
import { Product, ProductSchema } from '@models/models';
import { THSort } from '@components/TableSort'

const typeColorMap: Record<string, string> = {
  normal: '#aa9',
  fighting: '#b54',
  flying: '#89f',
  poison: '#a59',
  ground: '#db5',
  rock: '#ba6',
  bug: '#ab2',
  ghost: '#66b',
  steel: '#aab',
  fire: '#f42',
  water: '#39f',
  grass: '#7c5',
  electric: '#fc3',
  psychic: '#f59',
  ice: '#6cf',
  dragon: '#76e',
  dark: '#754',
  fairy: '#e9e',
  unknown: '#aa9',
  shadow: '#aa9',
}

type TypeLabelProps = {
  type: string;
}

const TypeLabel = ({ type }: TypeLabelProps) => (
  <span
    className="text-white d-inline-block text-uppercase text-center rounded-1 shadow-sm me-2"
    style={{
      backgroundColor: typeColorMap[type],
      textShadow: '1px 1px 2px rgb(0 0 0 / 70%)',
      fontSize: '.7rem',
      width: '70px',
    }}
  >
    {type}
  </span>
)

type Props = {
  products: Product[];
} & Pick<Parameters<typeof THSort>[0], 'setSort' | 'setOrder'>

export default function ProductList(props: Props) {
  const { products, setSort, setOrder } = props
  console.log("props")
  console.log(products)
  return (
    <Table responsive bordered hover>
      <thead className="bg-light">
        <tr>
          <th><THSort name="_id" setSort={setSort} setOrder={setOrder}>id</THSort></th>
          <th><THSort name="name" setSort={setSort} setOrder={setOrder}>Name</THSort></th>
          <th><THSort name="name" setSort={setSort} setOrder={setOrder}>Price</THSort></th>
    


        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
 
          <tr key={String(product._id)}>
            <td>{String(product._id)}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{String(product.categories)}</td>
         
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
