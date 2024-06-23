import { useState, useEffect } from "react";
import QuestionCard from "./components/QuestionCard";
import { fetchQuizQuestions } from "./api.ts";
import { Difficulty, QuestionState, AnswerObject } from "./types/types.ts";

function App() {
  const [loading, setLoading] = useState(false)
  const [question, setQuestion] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)

  const TOTAL_QUESTIONS = 10

  const startTrivia = async () => {
    setLoading(true)
    setGameOver(false)

    try {
      const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
      console.log(newQuestions, 'newQuestions');
      setQuestion(newQuestions);
    } catch (error) {
      console.error("Error fetching questions: ", error);
    }
  
    setScore(0)
    setUserAnswer([])
    setNumber(0)
    setLoading(false)


  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver) {
      const answer = e.currentTarget.value
      
      const correct = question[number].correct_answer === answer

      if(correct) setScore(prev => prev + 1)

      // save answer in array
      const answerObj = {
        question: question[number].question,
        answer,
        correct,
        correctAnswer: question[number].correct_answer
      }
      setUserAnswer(prev => [...prev, answerObj])
    }
  }

  const nextQuestion = () => {
    // move to the next but check if is not the last question
    const nextQuestion = number + 1;
    if(nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true)
    } else {
      setNumber(nextQuestion)
    }
  }

  return (
    <div className="bg-slate-300 w-full h-screen flex justify-center"> 
        <div className="flex flex-col justify-center">
          <h1 className="text-center mb-4">Quiz</h1>
          
          {!gameOver ? <p className="text-center mb-2 bg-orange-200 rounded text-lg">Score: {score}</p> : null}
          
          {loading && <p className="text-center mb-2 bg-gray-500 text-white text-lg rounded py-2">Loading Question....</p>}
          {gameOver || userAnswer.length === TOTAL_QUESTIONS ? (
              <button className="text-center mb-2 bg-black text-white text-lg rounded " onClick={startTrivia}>Start</button>
            ) : null}

          <div className="bg-white w-80 h-max rounded p-2 px-4">
            {!loading && !gameOver && 
              <QuestionCard 
              questionNumber={number + 1}
              totalQuestion={TOTAL_QUESTIONS}
              question={question[number].question}
              answers={question[number].answer}
              userAnswer={userAnswer ? userAnswer[number] : undefined}
              callback={checkAnswer}/>
            }

            

            {!gameOver && !loading && userAnswer.length === number + 1 && number != TOTAL_QUESTIONS - 1 ?
              <button className="text-center mb-2 bg-orange-500 text-white text-lg rounded py-2 w-full"
               onClick={nextQuestion}>Next Question</button> : null
            }
            
          </div>
        </div>
    </div>    
  
  )
}

export default App;
