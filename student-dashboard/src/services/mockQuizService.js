// Mock data structure based on expected Quiz entity format
export const mockQuizzes = [
  {
    id: 1,
    title: "European Capitals",
    description: "Test your knowledge of European capital cities",
    status: true, // published
    createdDate: "2024-11-08T10:30:00",
  },
  {
    id: 2,
    title: "Basic Mathematics",
    description: "Practice fundamental math operations",
    status: true,
    createdDate: "2024-11-08T11:00:00",
  },
  {
    id: 3,
    title: "World Geography",
    description: "Learn about countries and their locations",
    status: true,
    createdDate: "2024-11-08T09:15:00",
  },
];

// Simulate API call delay
export const fetchPublishedQuizzes = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockQuizzes);
    }, 500); // Simulate network delay
  });
};
