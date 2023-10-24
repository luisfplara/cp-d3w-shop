import React, { useCallback, useMemo, useState } from "react";
import {
  MaterialReactTable,
  type MaterialReactTableProps,
  type MRT_Cell,
  type MRT_ColumnDef,
  type MRT_Row,
} from "material-react-table";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  TextFieldProps,
  Tooltip,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

import { Category, Media, Product } from "@models/models";
import { List } from "realm";
import { useRouter } from "next/router";

type Props = {
  productData: Product[];
  deleteProduct(value:any):any
};

const ProductList = ({ productData, deleteProduct}: Props) => {
  const [tableData, setTableData] = useState<Product[]>(() => productData);

  const router = useRouter();

  const handleDeleteRow = useCallback(
    (row: MRT_Row<Product>) => {
      if (!confirm(`Are you sure you want to delete ${row.getValue("name")}`)) {
        return;
      }
      deleteProduct({
        variables: {
          _id: row.getValue("_id"),
        },
      }).then((result: any) => {
        router.reload();
      });
      //send api delete request here, then refetch or update local table data for re-render
      // setTableData(tableData.splice(row.index, 1));
      //setTableData([...tableData]);
    },
    [tableData]
  );

  const columns = useMemo<MRT_ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: "_id",
        header: "ID",
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
      },
      {
        //accessorFn used to join multiple data into a single cell
        id: "images", //id is still required when using accessorFn instead of accessorKey
        header: "Image",
        size: 250,
        accessorFn: (row) => row.images,
        Cell: ({cell }) => {
          const categoriesArray = cell.getValue<[Media]>();
          return (
            <img
              alt="product image"
              height={40}
              src={categoriesArray[0]?.url}
              loading="lazy"
            />
          );
        },
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 140,
      },
      {
        accessorKey: "price",
        header: "Price",
        size: 140,
      },
      {
        accessorKey: "stock",
        header: "Stock",
        size: 140,
      },
      {
        //accessorFn used to join multiple data into a single cell
        id: "categories", //id is still required when using accessorFn instead of accessorKey

        header: "Categories",
        size: 250,
        accessorFn: (row) => row.categories,
        Cell: ({ renderedCellValue, row, column, cell }) => {
          const categoriesArray = cell.getValue<[Category]>();
          return categoriesArray.map((element: Category, index) => {
            return <Chip key={index} label={element.name} />;
          });
        },
      },
    ],
    []
  );

  return (
    <>
      <MaterialReactTable
        displayColumnDefOptions={{
          "mrt-row-actions": {
            muiTableHeadCellProps: {
              align: "center",
            },
            size: 120,
          },
        }}
        columns={columns}
        data={tableData}
        enableColumnOrdering
        enableEditing
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton
                onClick={() => {
                  router.push(`/products/${row.original._id}`);
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
    </>
  );
};

export default ProductList;
