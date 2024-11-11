import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { fetchPublishedQuizzes } from "../services/mockQuizService";
import { Box, Typography } from "@mui/material";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  const columns = [
    {
      field: "title",
      headerName: "Quiz Title",
      flex: 2,
      sortable: true,
      filter: true, 
      floatingFilter: true,
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
  ];

  useEffect(() => {
    const loadQuizzes = async () => {
      const data = await fetchPublishedQuizzes();
      setQuizzes(data);
    };
    loadQuizzes();
  }, []);

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
