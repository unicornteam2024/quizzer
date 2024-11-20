import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import dayjs from "dayjs"
import { quizService } from "../services/quizService"

const QuestionList = () => {
    const { id } = useParams()
    const [quiz, setQuiz] = useState([])
    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadQuestions = async () => {
          try {
            setLoading(true)
            setError(null)
            const data = await quizService.getQuizById(id)
            setQuiz(data)
            setQuestions(data.questions || [])
            console.log(data)
          } catch (err) {
            setError(err.message || "Failed to load questions")
          } finally {
            setLoading(false)
          }
        };
        loadQuestions()
      }, [id])
      const formatDate = (dateString) => {
        return dayjs(dateString).format("DD-MM-YYYY"); // e.g., "18 November 2024"
      };
      const renderQuizInfo = () => (
        <>
          <Typography variant="h4" gutterBottom>
            {quiz.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {quiz.description}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Added on: {formatDate(quiz.createdDate)} - Questions: {quiz.questionCount} - Category: 
          </Typography>
        </>
      )
      const renderQuestions = () => (
        <Box sx={{ minWidth: 275 , mb: 2}}>
          {questions.map((question, index) => (
            <Card key={index}  elevation={3} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {question.q_description}
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                  Question {index + 1} of {quiz.questionCount} - Difficulty: {question.difficulty}
                </Typography>
                </CardContent>
              </Card>
            ))}
        </Box> 
      )
      if (loading) return <Typography>Loading...</Typography>;
      if (error) return <Typography color="error">{error}</Typography>    

      return(
        <div>
            {renderQuizInfo()}
            {/* {renderQuestions()} */}
            {quiz.questionCount > 0 ? renderQuestions() : <Typography >No questions for this quiz</Typography>}

            </div>
    )
}

export default QuestionList