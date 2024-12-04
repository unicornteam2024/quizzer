import { Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";

const QuizGrid = ({ quizzes }) => {
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
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
          </Box>
        );
      },
    },
    {
      headerName: "Reviews",
      cellRenderer: (params) => {
        return (
          <Link
            to={`/quizzes/${params.data.id}/reviews`}
            style={{
              color: "#1976d2",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            View Reviews
          </Link>
        );
      },
    },
  ];

  return (
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
  );
};

export default QuizGrid;
