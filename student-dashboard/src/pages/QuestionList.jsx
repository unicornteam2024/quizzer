import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
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
            setLoading(false);
          }
        };
        loadQuestions();
      }, [id]);
    return(
        <div>
            <h2>{quiz.title}</h2>
            <p>{quiz.description}</p>
            <p>Added on: {quiz.createdDate} - Questions: {quiz.questionCount}</p>
            {!loading && !error && questions.length > 0 ? (
                <div>
                    <h2>Questions</h2>                    
                </div>
            ) : (
                !loading && !error && <p>No questions found for this quiz.</p>
            )}
        </div>
    )
}

export default QuestionList