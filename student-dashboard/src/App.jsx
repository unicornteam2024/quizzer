import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import QuizList from "./pages/QuizList";
import QuestionList from "./pages/QuestionList";
import CategoryList from "./pages/CategoryList";
import QuizResults from "./pages/QuizResults";
import CategoryDetails from "./pages/CategoryDetails";
import AddReview from "./pages/AddReview";
import Reviews from "./pages/Reviews";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    background: {
      default: "#f5f5f5",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: theme.palette.background.default,
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            width: "100%",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/quizzes" element={<QuizList />} />
              <Route path="/quizzes/:id/questions" element={<QuestionList />} />
              <Route path="/quizzes/:id/results" element={<QuizResults />} />
              <Route path="/categories" element={<CategoryList />} />
              <Route path="/categories/:id" element={<CategoryDetails />} />
              <Route path="/quizzes/:id/reviews" element={<Reviews />} />
              <Route path="/quizzes/:id/write-review" element={<AddReview />} />
            </Routes>
          </Layout>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
