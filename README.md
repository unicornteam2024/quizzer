# Quizzer

## Project Description

Quizzer is a web-based platform designed for teachers and students at Haaga Helia to enhance learning through interactive quizzes. Teachers can create, manage, and categorize quizzes with multiple-choice questions on course-related topics, while students can take these quizzes to test and improve their knowledge. The application includes two main dashboards: a Teacher Dashboard, where teachers add and organize quizzes by categories like "Vocabulary" or "Geography" and manage questions and answers, and a Student Dashboard, where students can access published quizzes, receive instant feedback on their answers, view results, and share their thoughts through reviews. Quizzer aims to make learning engaging and accessible for both teachers and students.

## Team Members

- Chen Shiyang, [GitHub Profile](https://github.com/ChenFangFangFang)
- Emad Yazdankhah, [Github Profile](https://github.com/emaDBytes)
- Leon Mbishibishi, [Github Profile](https://github.com/mbishibishi11)
- Yen (Chloe) Nguyen, [Github Profile](https://github.com/chloee122)
- Temitope Ajayi, [Github Profile](https://github.com/Topebhh500)
- Hardik Savsani, [Github Profile](https://github.com/hardiksavsani)

## Backlog

Here is the link to the [Backlog](https://github.com/orgs/unicornteam2024/projects/1/views/1)

## Deployment URL

Here is the link to the [Quizzer](https://quizzer-c8si.onrender.com/)

## Developer Guide

This guide provides instructions for setting up and running the backend application from the command line. Please ensure that you have the required Java installed before proceeding.  

### Prerequistites
- **Java Version**: The application requires **Java 17** to ensure accurate use. Please make sure you have the correct version installed on your machine.  
  
### Getting Started

1. **Clone the Repository**  
  Clone the project to your local machine using Git:  
  git clone https://github.com/unicornteam2024/quizzer.git  

2. **Navigate to the project Directory**  
   `cd quizzer` 
   
4. **Build Application**  
   Compile and build the application using the following command:  
   `./mvnw clean install`  
   
   Note: The command `./mvnw` uses the Maven Wrapper provided in the repository, which ensures consistency with the         Maven version used in the project. On Windows, use `mvnw.cmd` instead of `./mvnw`.  
   
5. **Run Application**  
   `./mvnw spring-boot:run`  
   
6. **Verify Application Status**  
   Once started, the application will be accessible at http://localhost:8080 by default (or another port if specified     in the configuration).  
7. **Troubleshooting**  
   Ensure you are running the correct Java version. You can verify your Java version with:  
   `java version`  
   If you encounter issues with permissions for `./mvnw`, make it executable by running:  
    `chmod +x mvnw`  
   
