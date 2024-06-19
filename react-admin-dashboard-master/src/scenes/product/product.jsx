import React, { useState, useEffect } from "react";
import { Box, Button, Grid, Paper, TextField, Typography, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";

const ProductEdit = () => {
  const { id } = useParams();
  // State variables
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch product data
        const productResponse = await fetch(`http://localhost:8080/api/products/${id}`);
        const productData = await productResponse.json();
        if (productData.status === "OK") {
          setProduct(productData.data);
        }

        // Fetch categories
        const categoriesResponse = await fetch("http://localhost:8080/api/category");
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        // Fetch vendors
        const vendorsResponse = await fetch("http://localhost:8080/api/vendors");
        const vendorsData = await vendorsResponse.json();
        setVendors(vendorsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);
  console.log(product)
  // Handle form submission
  const handleFormSubmit = async (values) => {
    try {
      const updatedProduct = {
        // id: product.id,  // Assuming `product.id` is available
        name: values.name,
        description: values.description,
        price: parseInt(values.price),  // Ensure numeric values are parsed if necessary
        stockQuanlity: parseInt(values.stockQuantity), // Correcting 'stockQuantity' typo
        category: values.category,
        vendor: values.vendor,
        // listImg: product.listImg, // Assuming `product.listImg` is already in correct format
        status: parseInt(values.status),
        // rating_comment: product.rating_comment, // Assuming `product.rating_comment` structure is correct
        view: parseInt(values.view),
        liked: parseInt(values.liked),
        buy: parseInt(values.buy),
        // rating: product.rating, // Assuming `product.rating` structure is correct
      };
      console.log(updatedProduct);
      const response = await fetch(`http://localhost:8080/api/products/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log('Product updated successfully:', responseData);
        // Optionally, perform any UI actions upon successful update
      } else {
        console.error('Failed to update product:', responseData.error);
        // Optionally, handle error cases and provide user feedback
      }
    } catch (error) {
      console.error('Error updating product:', error);
      // Handle any network or unexpected errors
    }
  };

  // console.log(product);
  // console.log(categories);
  // console.log(vendors);
  if (!product || categories.length === 0 || vendors.length === 0) {
    return <Typography>Loading...</Typography>;
  }

  // Initial form values
  const initialValues = {
    name: product.name,
    price: product.price,
    description: product.description,
    stockQuantity: product.stockQuantity,
    category: product.category,
    vendor: product.vendor,
    status: product.status,
    view: product.view,
    liked: product.liked,
    buy: product.buy,
  };

  // Form validation schema
  const validationSchema = yup.object().shape({
    name: yup.string().required("Required"),
    price: yup.number().required("Required").positive("Must be positive"),
    description: yup.string().required("Required"),
    stockQuantity: yup.number().required("Required").positive("Must be positive"),
    category: yup.string().required("Required"),
    vendor: yup.string().required("Required"),
    status: yup.number().required("Required"),
    view: yup.number().required("Required").positive("Must be positive"),
    liked: yup.number().required("Required").positive("Must be positive"),
    buy: yup.number().required("Required").positive("Must be positive"),
  });

  return (
      <Box m="20px">
        <Header title="PRODUCT EDIT" subtitle="Edit Product Information" />

        <Paper elevation={3} sx={{ padding: "20px" }}>
          <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleFormSubmit}
          >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <img
                          src={product.listImg[0]?.path_image}
                          alt={product.name}
                          style={{ width: "100%", height: "auto", marginBottom: "10px" }}
                      />
                      <Box>
                        {product.listImg.slice(1, 4).map((image) => (
                            <img
                                key={image.id_image}
                                src={image.path_image}
                                alt={product.name}
                                style={{ width: "33%", height: "auto", marginRight: "10px", marginBottom: "10px" }}
                            />
                        ))}
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Product Name"
                          name="name"
                          value={values.name}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.name && !!errors.name}
                          helperText={touched.name && errors.name}
                          sx={{ gridColumn: "span 4" }}
                      />
                      <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Price"
                          name="price"
                          value={values.price}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.price && !!errors.price}
                          helperText={touched.price && errors.price}
                          sx={{ gridColumn: "span 4", marginTop: "10px" }}
                      />
                      <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Description"
                          name="description"
                          value={values.description}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.description && !!errors.description}
                          helperText={touched.description && errors.description}
                          multiline
                          rows={4}
                          sx={{ gridColumn: "span 4", marginTop: "10px" }}
                      />
                      <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Stock Quantity"
                          name="stockQuantity"
                          value={values.stockQuantity}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.stockQuantity && !!errors.stockQuantity}
                          helperText={touched.stockQuantity && errors.stockQuantity}
                          sx={{ gridColumn: "span 4", marginTop: "10px" }}
                      />
                      <TextField
                          fullWidth
                          select
                          variant="filled"
                          label="Category"
                          name="category"
                          value={values.category}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.category && !!errors.category}
                          helperText={touched.category && errors.category}
                          sx={{ gridColumn: "span 4", marginTop: "10px" }}
                      >
                        {categories.map((category) => (
                            <MenuItem key={category.id} value={category.categoryName}>
                              {category.categoryName}
                            </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                          fullWidth
                          select
                          variant="filled"
                          label="Vendor"
                          name="vendor"
                          value={values.vendor}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.vendor && !!errors.vendor}
                          helperText={touched.vendor && errors.vendor}
                          sx={{ gridColumn: "span 4", marginTop: "10px" }}
                      >
                        {vendors.map((vendor) => (
                            <MenuItem key={vendor.id} value={vendor.vendorName}>
                              {vendor.vendorName}
                            </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Views"
                          name="view"
                          value={values.view}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.view && !!errors.view}
                          helperText={touched.view && errors.view}
                          sx={{ gridColumn: "span 4", marginTop: "10px" }}
                      />
                      <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Likes"
                          name="liked"
                          value={values.liked}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.liked && !!errors.liked}
                          helperText={touched.liked && errors.liked}
                          sx={{ gridColumn: "span 4", marginTop: "10px" }}
                      />
                      <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Purchases"
                          name="buy"
                          value={values.buy}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.buy && !!errors.buy}
                          helperText={touched.buy && errors.buy}
                          sx={{ gridColumn: "span 4", marginTop: "10px" }}
                      />
                      <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Status"
                          name="status"
                          value={values.status}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.status && !!errors.status}
                          helperText={touched.status && errors.status}
                          sx={{ gridColumn: "span 4", marginTop: "10px" }}
                      />
                    </Grid>
                  </Grid>

                  <Box display="flex" justifyContent="end" mt="20px">
                    <Button type="submit" color="secondary" variant="contained">
                      Save Changes
                    </Button>
                  </Box>
                </form>
            )}
          </Formik>
        </Paper>
      </Box>
  );
};
export default ProductEdit;
