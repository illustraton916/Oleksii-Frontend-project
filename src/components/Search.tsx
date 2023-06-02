import React from "react";
import {
  TextField,
  Autocomplete,
  Box,
  Grid,
  Button,
  Slider,
} from "@mui/material";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { fetchFilteredProducts } from "../app/reducer/products";
import { Category } from "../types/Categories";
import { FilterProducts } from "../types/types";

const Search = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.categories);
  const [values, setValues] = React.useState<FilterProducts>({
    title: "",
    categoryId: 0,
    price_max: 1000,
    price_min: 1,
  });

  const sortedCategories = categories.filter(
    (product, index, self) =>
      self.findIndex((p) => p.name === product.name) === index
  );

  const handleChange = (event: any) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const handleChangeCategory = (event: any, newValue: Category | null) => {
    setValues({
      ...values,
      categoryId: newValue?.id || 0,
    });
  };
  const handleChangePrice = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue))
      setValues({
        ...values,
        price_min: newValue[0] as number,
        price_max: newValue[1] as number,
      });
  };
  const onSubmit = () => dispatch(fetchFilteredProducts(values));

  return (
    <Box sx={{ my: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            id="title"
            name="title"
            label="Title"
            value={values.title}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Autocomplete
            id="categoryId"
            options={sortedCategories}
            getOptionLabel={(option: Category) => option.name}
            onChange={handleChangeCategory}
            renderInput={(params) => (
              <TextField {...params} fullWidth label="Category" />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Slider
            getAriaLabel={() => "Price range"}
            value={[values.price_min, values.price_max]}
            onChange={handleChangePrice}
            valueLabelDisplay="auto"
            min={1}
            max={1000}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={onSubmit}
            fullWidth
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Search;
