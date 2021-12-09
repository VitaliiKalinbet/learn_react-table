import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSortBy, useTable, useGlobalFilter } from "react-table";
import { GlobalFilter } from "./globalFilter";

const Table = styled.table``;

const TableHead = styled.thead``;

const TableRow = styled.tr`
`;

const TableHeader = styled.th``;

const TableBody = styled.tbody``;

const TableData = styled.td`
  border: 1px solid green;
`;

const TableImage = styled.img`
  max-width: 70px;
`;

const Button = styled.button`
  border: none;
  background-color: green;
  padding: 1rem;
  margin: 1rem;
  cursor: pointer;
`;

export function Products(props) {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await axios
      .get("https://fakestoreapi.com/products")
      .catch(console.log);

    if (response) {
      const products = response.data;

      console.log("products :>> ", products);
      setProducts(products);
    }
  };

  // const data = useMemo(
  //   () => [
  //     {
  //       id: 1,
  //       title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  //       price: 109.95,
  //       description:
  //         "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  //       category: "men's clothing",
  //       image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  //       rating: {
  //         rate: 3.9,
  //         count: 120,
  //       },
  //     },
  //     {
  //       id: 1,
  //       title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  //       price: 109.95,
  //       description:
  //         "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  //       category: "men's clothing",
  //       image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  //       rating: {
  //         rate: 3.9,
  //         count: 120,
  //       },
  //     },
  //     {
  //       id: 1,
  //       title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  //       price: 109.95,
  //       description:
  //         "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  //       category: "men's clothing",
  //       image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  //       rating: {
  //         rate: 3.9,
  //         count: 120,
  //       },
  //     },
  //   ],
  //   []
  // );

  // const columns = useMemo(
  //   () => [
  //     {
  //       Header: "Id",
  //       accessor: "id",
  //     },
  //     {
  //       Header: "Price",
  //       accessor: "price",
  //     },
  //     {
  //       Header: "Title",
  //       accessor: "title",
  //     },
  //   ],
  //   []
  // );

  const productsData = useMemo(() => [...products], [products]);
  const productsColumns = useMemo(
    () =>
      products[0]
        ? Object.keys(products[0])
            .filter((key) => key !== "rating")
            .map((key) => {
              if (key === "image")
                return {
                  Header: key,
                  accessor: key,
                  Cell: ({ value }) => <TableImage src={value} />
                };

              return { Header: key, accessor: key };
            })
        : [],
    [products]
  );

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Edit",
        Header: "Edit",
        Cell: ({ row }) => (
          <Button onClick={() => {
            console.log(row);
            alert('Editing: ' + row.values.price)
          }}>
            Edit
          </Button>
        )
      }
    ])
  }

  const tableInstance = useTable({
    columns: productsColumns,
    data: productsData,
  },
  useGlobalFilter,
  tableHooks,
  useSortBy
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, preGlobalFilteredRows, setGlobalFilter, state } =
    tableInstance;

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
    <GlobalFilter
      preGlobalFilteredRows={preGlobalFilteredRows}
      setGlobalFilter={setGlobalFilter}
      globalFilter={state.globalFilter}
    />
    <Table {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableHeader {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
              </TableHeader>
            ))}
          </TableRow>
        ))}
      </TableHead>

      <TableBody {...getTableBodyProps()}>
        {rows.map((row, indx) => {
          prepareRow(row);

          return (
            <TableRow
              {...row.getRowProps()}
            >
              {row.cells.map((cell, idx) => (
                <TableData {...cell.getCellProps()}>
                  {cell.render("Cell")}
                </TableData>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
    </>
  );
}
