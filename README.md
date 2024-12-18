# Quizzer

## Project Description

Quizzer is a web-based platform designed for teachers and students at Haaga Helia to enhance learning through interactive quizzes. Teachers can create, manage, and categorize quizzes with multiple-choice questions on course-related topics, while students can take these quizzes to test and improve their knowledge. The application includes two main dashboards: a Teacher Dashboard, where teachers add and organize quizzes by categories like "Vocabulary" or "Geography" and manage questions and answers, and a Student Dashboard, where students can access published quizzes, receive instant feedback on their answers, view results, and share their thoughts through reviews. Quizzer aims to make learning engaging and accessible for both teachers and students.

## Team Members

- Shiyang Chen, [GitHub Profile](https://github.com/ChenFangFangFang)
- Emad Yazdankhah, [Github Profile](https://github.com/emaDBytes)
- Leon Mbishibishi, [Github Profile](https://github.com/mbishibishi11)
- Yen (Chloe) Nguyen, [Github Profile](https://github.com/chloee122)
- Temitope Ajayi, [Github Profile](https://github.com/Topebhh500)
- Hardik Savsani, [Github Profile](https://github.com/hardiksavsani)

## Backlog

Here is the link to the [Backlog](https://github.com/orgs/unicornteam2024/projects/1/views/1)

## Deployment URL

- Here is the link to the backend [Quizzer - Teacher Dashboard](https://quizzer-c8si.onrender.com/)
- Here is the link to the frontend [Quizzer - Student Dashboard](https://quizzer-dumz.onrender.com/)
- Here is the Swagger Rest API Link [Quizzer - Swagger API Link](https://quizzer-c8si.onrender.com/swagger-ui/index.html#/)

## Developer Guide

This guide provides instructions for setting up and running the application. It covers both backend and frontend parts, as well as the project's architecture.

### Project Architecture

The project architecture consists of three main components:

- **Database**: Stores data persistently. Different database platforms may be used in development and production environments.
- **Backend**: Handles the business logic, data processing, and API endpoints. It connects the frontend and database.
- **Frontend**: The user interface (UI) written in React, where users interact with the application.

#### Architecture Diagram

```mermaid
flowchart TD
    Frontend["Frontend (React)"] --> Backend["Backend (Java, Spring Boot)"]
    Backend --> Database["Database"]
```

### Backend

##### Prerequistites

- **Java Version**: The application requires **Java 17** to ensure accurate use. Please make sure you have the correct version installed on your machine.

##### Getting Started

1. **Clone the Repository**  
   Clone the project to your local machine using Git:  
   git clone https://github.com/unicornteam2024/quizzer.git

2. **Navigate to the project Directory**
   ```bash
   cd quizzer
   ```
3. **Build Application**  
   Compile and build the application using the following command:

   ```bash
   ./mvnw clean install
   ```

   Note: The command `./mvnw` uses the Maven Wrapper provided in the repository, which ensures consistency with the Maven version used in the project. On Windows, use `mvnw.cmd` instead of `./mvnw`.

4. **Run Application**
   ```bash
   ./mvnw spring-boot:run
   ```
5. **Verify Application Status**  
   Once started, the application will be accessible at http://localhost:8080 by default (or another port if specified in the configuration).
6. **Troubleshooting**  
   Ensure you are running the correct Java version. You can verify your Java version with:
   ```bash
   java version
   ```
   If you encounter issues with permissions for `./mvnw`, make it executable by running:
   ```bash
   chmod +x mvnw
   ```

### Frontend

#### Prerequisites

- **Node.js**: Install the latest stable version of Node.js, which includes npm.

#### Setting Up the Frontend

1. **Navigate to the Frontend Directory**

   The frontend code is located in the `student-dashboard` folder within the project.

   ```bash
   cd student-dashboard
   ```

2. **Install Dependencies**

   Install the required npm packages:

   ```bash
   npm install
   ```

3. **Start the Frontend Application**

   Run the following command to start the frontend server:

   ```bash
   npm run dev
   ```

   The application will be accessible by default at http://localhost:5173.

### Test

#### Running Tests

Run all tests using Maven:

```bash
mvn test
```

Run specific test class:

```bash
mvn test -Dtest=QuestionRestApiControllerTest
```

```bash
mvn test -Dtest=CategoryRestApiControllerTest
```

```bash
mvn test -Dtest=AnswerRestApiControllerTest
```

Run specific test method:

```bash
mvn test -Dtest=QuestionRestApiControllerTest#getQuestionsByQuizIdReturnsErrorWhenQuizDoesNotExist
```

```bash
mvn test -Dtest=QuizRestApiControllerTest#getAllQuizzesDoesNotReturnUnpublishedQuizzes
```

```bash
mvn test -Dtest=ReviewRestApiControllerTest#createReviewCreatesNewReview
```

Tests use H2 in-memory database to avoid affecting the development database.

### Technology Stack

- **Programming Language**: JavaScript

- **Framework**: React

- **Major Libraries**:

  React Router for routing

  Axios for API requests

  Other libraries as required by the project setup

### Database Platforms

- **Development Environment**: Uses an in-memory H2 database for quick setup.
- **Production Environment**: Uses a PostgreSQL database for reliable data persistence.

### Data model

```mermaid
erDiagram
    quiz {
        integer id PK
        varchar description
        boolean status
        timestamp created_date
        integer category_id FK
    }
    question {
        integer id PK
        varchar description
        integer quiz_id FK
    }
    answer {
        integer id PK
        integer question_id FK
        boolean status
        varchar answer
    }
    category {
        integer id PK
        varchar description
        varchar name
    }
    answerHistory {
        integer id PK
        integer answer_id FK
        timestamp submitted_at
    }
    review {
        integer id PK
        varchar comment
        integer rating
        timestamp created_date
        integer quiz_id FK
        varchar studentName
    }
    category ||--o{ quiz : "has"
    quiz ||--o{ question : "contains"
    question ||--o{ answer : "has"
    answer ||--o{ answerHistory : "tracks"
    quiz ||--o{ review : "has"

```

### License

Quizzer is [MIT licensed](https://github.com/unicornteam2024/quizzer/blob/main/LICENSE).
