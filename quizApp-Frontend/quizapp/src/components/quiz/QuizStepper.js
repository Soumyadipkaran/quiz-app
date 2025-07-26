import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getSubjects } from "../../utils/QuizService"

const QuizStepper = () => {
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedNumQuestions, setSelectedNumQuestions] = useState("")
  const [subjects, setSubjects] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await getSubjects()
        setSubjects(data)
      } catch (error) {
        console.error("Error fetching subjects:", error)
      }
    }

    fetchSubjects()
  }, [])

  const handleStartQuiz = () => {
    if (!selectedSubject || !selectedNumQuestions) {
      alert("Please select subject and number of questions")
      return
    }

    navigate("/take-quiz", {
      state: { selectedSubject, selectedNumQuestions }
    })
  }

  return (
    <div className="container mt-5">
      <h3 className="mb-3">Start Your Quiz</h3>

      <div className="mb-3">
        <label className="form-label">Select Subject:</label>
        <select
          className="form-select"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="">Choose a subject</option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Number of Questions:</label>
        <input
          type="number"
          className="form-control"
          value={selectedNumQuestions}
          onChange={(e) => setSelectedNumQuestions(e.target.value)}
          placeholder="Enter number"
        />
      </div>

      <button className="btn btn-primary" onClick={handleStartQuiz}>
        Start Quiz
      </button>
    </div>
  )
}

export default QuizStepper
