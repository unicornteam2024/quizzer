import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { AgGridReact } from "ag-grid-react";
import { Link } from "react-router-dom";
import { categoryService } from "../services/categoryService";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorAlert from "../components/ErrorAlert";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const columns = [
    {
      field: "name",
      sortable: true,
      filter: true,
      floatingFilter: true,
      cellRenderer: (params) => {
        return (
          <Link
            to={`/categories/${params.data.id}`}
            style={{
              color: "#1976d2",
              fontWeight: "bold",
            }}
          >
            {params.value}
          </Link>
        );
      },
    },
    {
      field: "description",
      flex: 3,
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
  ];

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const data = await categoryService.getCategories();
        setCategories(data);
      } catch (err) {
        setError(err.message || "Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorAlert errorMessage={error} />;

  return (
    <Box sx={{ height: "100%" }}>
      <Typography variant="h4" gutterBottom>
        Categories
      </Typography>

      <div
        className="ag-theme-material"
        style={{ height: "500px", width: "100%" }}
      >
        <AgGridReact
          rowData={categories}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 20, 50]}
          defaultColDef={{
            resizable: true,
          }}
          animateRows={true}
        />
      </div>
    </Box>
  );
};

export default CategoryList;
