import React, { useCallback, useMemo } from "react"
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row
} from "material-react-table"
import { Box, Chip, IconButton, Tooltip } from "@mui/material"
import { Delete, Edit } from "@mui/icons-material"
import { Category, Media, Product } from "@models/models"
import { useRouter } from "next/router"
import Image from "next/image"

interface Props {
  productData: Product[]
  deleteProduct(value: {
    variables: {
      _id: string
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }): any
}

const ProductList = ({ productData, deleteProduct }: Props) => {
  const router = useRouter()

  const handleDeleteRow = useCallback(
    (row: MRT_Row<Product>) => {
      // eslint-disable-next-line no-alert, no-restricted-globals
      if (!confirm(`Are you sure you want to delete ${row.getValue("name")}`)) {
        return
      }
      deleteProduct({
        variables: {
          _id: row.getValue("_id")
        }
      }).then(() => {
        router.reload()
      })
    },
    [productData]
  )

  const columns = useMemo<MRT_ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: "_id",
        header: "ID",
        enableColumnOrdering: false,
        enableEditing: false,
        enableSorting: false,
        size: 80
      },
      {
        id: "images",
        header: "Image",
        size: 250,
        accessorFn: (row) => row.images,
        // eslint-disable-next-line react/no-unstable-nested-components
        Cell: ({ cell }) => {
          const categoriesArray = cell.getValue<[Media]>()
          return (
            <Image
              alt="product image"
              height={40}
              src={categoriesArray[0].url ? categoriesArray[0].url : ""}
              loading="lazy"
            />
          )
        }
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 140
      },
      {
        accessorKey: "price",
        header: "Price",
        size: 140
      },
      {
        accessorKey: "stock",
        header: "Stock",
        size: 140
      },
      {
        id: "categories",

        header: "Categories",
        size: 250,
        accessorFn: (row) => row.categories,
        Cell: ({ cell }) => {
          const categoriesArray = cell.getValue<[Category]>()
          return categoriesArray.map((element: Category) => (
            // eslint-disable-next-line no-underscore-dangle
            <Chip key={String(element._id)} label={element.name} />
          ))
        }
      }
    ],
    []
  )

  return (
    <MaterialReactTable
      displayColumnDefOptions={{
        "mrt-row-actions": {
          muiTableHeadCellProps: {
            align: "center"
          },
          size: 120
        }
      }}
      columns={columns}
      data={productData}
      enableColumnOrdering
      enableEditing
      renderRowActions={({ row }) => (
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Tooltip arrow placement="left" title="Edit">
            <IconButton
              onClick={() => {
                // eslint-disable-next-line no-underscore-dangle
                router.push(`/products/${row.original._id}`)
              }}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip arrow placement="right" title="Delete">
            <IconButton color="error" onClick={() => handleDeleteRow(row)}>
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    />
  )
}

export default ProductList
