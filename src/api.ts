import { Difficulty, Question } from "./types/types.ts";
import { shuffleArray } from "./utils.ts";

export const fetchQuizQuestions = async(
    amount: number, 
    difficulty: Difficulty, 
) => {
    const endPoint = `https://opentdb.com/api.php?amount=${amount}&type=multiple&difficulty=${difficulty}`
    const data = await (await fetch(endPoint)).json()

    console.log(data, "data")

    return data.results.map((question: Question) => (
        {
            ...question, 
            answer: shuffleArray([...question.incorrect_answers, question.correct_answer])
        }
    ))
}