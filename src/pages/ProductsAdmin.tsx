import React from "react";
import {
  Box,
  Typography,
  styled,
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from "@mui/material";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import NewProduct from "../components/NewProduct";
import { deleteProductItem } from "../app/reducer/products";
import DeleteIcon from "@mui/icons-material/Delete";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: "none",
  padding: theme.spacing(1),
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  borderBottom: "none",
  padding: theme.spacing(1),
}));

const ProductsAdmin = () => {
  const { products } = useAppSelector((state) => state.products);
  const sortedProducts = [...products]
    .filter(
      (product, index, self) =>
        self.findIndex((p) => p.title === product.title) === index
    )
    .sort((a, b) => a.title.localeCompare(b.title));
  const dispatch = useAppDispatch();
  const handleDelete = (id?: number) => {
    dispatch(deleteProductItem(id));
  };

  return (
    <Box>
      <Typography variant="h4">Products</Typography>
      <NewProduct />
      <TableContainer>
        <Table>
          <TableBody>
            {sortedProducts.map((product, i) => (
              <StyledTableRow key={`${product.title}-${i}`}>
                <StyledTableCell>{product.title}</StyledTableCell>
                <StyledTableCell>{product.category.name}</StyledTableCell>
                <StyledTableCell>{product.price}</StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton onClick={() => handleDelete(product.id)}>
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductsAdmin;
