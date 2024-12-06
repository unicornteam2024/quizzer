const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const reviewService = {
  writeReview,
  updateReview,
  deleteReview,
  getQuizReviews,
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

async function updateReview(reviewId, reviewData, quizId) {
  const url = `${API_BASE_URL}/reviews/${reviewId}`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...reviewData,
        quizId: parseInt(quizId, 10), // Convert to number
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update review");
    }

    // Add delay before fetching updated reviews
    await new Promise((resolve) => setTimeout(resolve, 100));

    return await response.json();
  } catch (error) {
    console.error("Error updating review:", error);
    throw error;
  }
}

async function deleteReview(reviewId) {
  const url = `${API_BASE_URL}/reviews/${reviewId}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete review");
    }
    return true;
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
}

async function getQuizReviews(quizId) {
  const url = `${API_BASE_URL}/quizzes/${quizId}/reviews`;
  console.log("Fetching reviews from:", url);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch reviews");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
}
