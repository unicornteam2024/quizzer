import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  AlertTitle,
} from "@mui/material";
import { categoryService } from "../services/categoryService";
import { useParams } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import { mockQuizzes } from "../services/mockQuizService";

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
          <a
            href={`/questions/${params.data.id + 1}`}
            style={{
              color: "#1976d2",
              fontWeight: "bold",
            }}
          >
            {params.value}
          </a>
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
      cellRenderer: () => {
        return (
          <a
            href="#"
            style={{
              color: "#1976d2",
              fontWeight: "bold",
            }}
          >
            See results
          </a>
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
          rowData={
            category.quizzes.length !== 0 ? category.quizzes : mockQuizzes
          }
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
