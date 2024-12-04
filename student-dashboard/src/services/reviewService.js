const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
export const reviewService = {
  writeReview,
};
async function writeReview(quizId, reviewData) {
  const url = `${API_BASE_URL}/quizzes/${quizId}/review`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to write review");
    }
    return await response.json();
  } catch (error) {
    console.error("Error writing review:", error);
    throw error;
  }
}
