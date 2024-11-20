import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
// import { fetchPublishedQuizzes } from "../services/mockQuizService";
import { quizService } from "../services/quizService";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  AlertTitle,
} from "@mui/material";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          href={`/questions/${params.data.id}`}
          target="_blank"
          style={{
          
            color: "#1976d2",
            fontWeight: "bold",
          }}>
            {params.value}
          </a>
        )
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
  ];

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await quizService.getPublishedQuizzes();
        setQuizzes(data);
      } catch (err) {
        setError(err.message || "Failed to load quizzes");
      } finally {
        setLoading(false);
      }
    };
    loadQuizzes();
  }, []);

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
        Available Quizzes
      </Typography>

      <div
        className="ag-theme-material"
        style={{ height: "500px", width: "100%" }}
      >
        <AgGridReact
          rowData={quizzes}
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

export default QuizList;
