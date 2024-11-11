import Layout from "./components/Layout";
import QuizList from "./pages/QuizList";
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
            <QuizList />
          </Layout>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
