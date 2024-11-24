import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import QuizList from "./pages/QuizList";
import QuestionList from "./pages/QuestionList";
import CategoryList from "./pages/CategoryList";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CategoryDetails from "./pages/CategoryDetails";

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
              <Route path="/" element={<QuizList />} />
              <Route path="/quizzes" element={<QuizList />} />
              <Route path="/quizzes/:id/questions" element={<QuestionList />} />
              <Route path="/categories" element={<CategoryList />} />
              <Route path="/categories/:id" element={<CategoryDetails />} />
            </Routes>
          </Layout>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
