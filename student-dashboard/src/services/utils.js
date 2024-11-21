// Helper function for error handling
export const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Something went wrong");
  }
  return response.json();
};
