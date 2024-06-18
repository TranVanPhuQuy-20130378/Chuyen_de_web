import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {useNavigate} from "react-router-dom";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

const Products = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [contacts, setContacts] = useState([]);
    const [columns, setColumns] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate hook

    const fetchContacts = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/products");
            const data = await response.json();
            if (data.status === "Ok") {
                setContacts(data.data);
                generateColumns(data.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const generateColumns = (data) => {
        if (data.length > 0) {
            const sample = data[0];
            const excludeFields = ["rating_comment", "listImg", "rating"];
            const generatedColumns = Object.keys(sample)
                .filter(key => !excludeFields.includes(key))
                .map((key) => {
                    let column = {
                        field: key,
                        headerName: key.charAt(0).toUpperCase() + key.slice(1),
                        flex: 1,
                        cellClassName: key === "name" ? "name-column--cell" : undefined,
                        type: typeof sample[key] === "number" ? "number" : "string",
                    };

                    // Customize column widths
                    if (key === "id") {
                        column.width = 70; // Narrow width for 'id' column
                    }
                    if (key === "name") {
                        column.flex = 2; // Wider width for 'name' column
                    }

                    return column;
                });

            // Add custom column for Edit button
            generatedColumns.push({
                field: "edit",
                headerName: "Edit",
                width: 100,
                renderCell: (params) => (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEdit(params.row.id)}
                    >
                        Edit
                    </Button>
                ),
            });

            setColumns(generatedColumns);
        }
    };

    const handleEdit = (id) => {
        navigate(`/product/${id}`);
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <Box m="20px">
            <Header
                title="Danh sách sản phẩm"
            />
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    },
                }}
            >
                <DataGrid
                    checkboxSelection
                    rows={contacts}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    );
};

export default Products;
