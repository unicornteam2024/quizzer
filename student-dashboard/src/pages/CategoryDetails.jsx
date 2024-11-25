import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { categoryService } from "../services/categoryService";
import QuizGrid from "../components/QuizGrid";
import ErrorAlert from "../components/ErrorAlert";
import LoadingIndicator from "../components/LoadingIndicator";

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

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorAlert errorMessage={error} />;

  return (
    <Box sx={{ height: "100%" }}>
      <Typography variant="h4" gutterBottom>
        {category.name}
      </Typography>
      <Typography variant="subtitle1" sx={{ marginBottom: "20px" }}>
        {category.description}
      </Typography>
      <QuizGrid quizzes={category.quizzes} />
    </Box>
  );
};

export default CategoryDetails;
