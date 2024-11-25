import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  AlertTitle,
} from "@mui/material";
import { useParams, Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import { categoryService } from "../services/categoryService";

const CategoryDetails = () => {
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const getCategory = async () => {
      try {
        setLoading(true);
        const data = await categoryService.getCategoryById(id);
        setCategory(data);
      } catch (error) {
        setError(error.message || "Failed to load quizzes");
      } finally {
        setLoading(false);
      }
    };

    getCategory();
  }, [id]);

  const columns = [
    {
      field: "title",
      headerName: "Quiz Title",
      flex: 2,
      sortable: true,
      filter: true,
      floatingFilter: true,
      cellRenderer: (params) => {
        return (
          <Link
            to={`/quizzes/${params.data.id}/questions`}
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
      headerName: "Description",
      flex: 3,
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      field: "createdDate",
      headerName: "Created",
      flex: 1,
      sortable: true,
      filter: true,
      floatingFilter: true,
      valueFormatter: (params) => {
        return new Date(params.value).toLocaleDateString();
      },
    },
    {
      field: "questionCount",
      headerName: "Questions",
      flex: 1,
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "Resutls",
      cellRenderer: (params) => {
        const hasAnswers = params.data.questionCount > 0; // Basic check for possible results
        return hasAnswers ? (
          <Link
            to={`/quizzes/${params.data.id}/results`}
            style={{
              color: "#1976d2",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            View Results
          </Link>
        ) : (
          <Typography
            color="text.secondary"
            sx={{
              fontSize: "0.875rem",
              cursor: "not-allowed",
            }}
            title="No results available - quiz has no questions yet"
          >
            No results
          </Typography>
        );
      },
    },
  ];

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ m: 2 }}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ height: "100%" }}>
      <Typography variant="h4" gutterBottom>
        {category.name}
      </Typography>
      <Typography variant="subtitle1" sx={{ marginBottom: "20px" }}>
        {category.description}
      </Typography>

      <div
        className="ag-theme-material"
        style={{ height: "500px", width: "100%" }}
      >
        <AgGridReact
          rowData={category.quizzes}
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

export default CategoryDetails;
