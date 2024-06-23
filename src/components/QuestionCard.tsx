import { questionProps } from "../types/types.ts"

const QuestionCard: React.FC<questionProps> = ({
    question,
    answers,
    callback, 
    userAnswer, 
    questionNumber, 
    totalQuestion
}) => (
    <div>
        <p className="text-center mb-2 bg-black text-white text-lg rounded py-2">Question: {questionNumber}/{totalQuestion}</p>
        <p className="mb-2 text-black font-bold text-lg rounded py-2" dangerouslySetInnerHTML={{__html: question}}></p>
        <div>
            {answers.map(answer => (
                <div className="mb-2  flex justify-center " key={answer}>
                    <button className="text-center w-full border border-gray-900" disabled={userAnswer? true : false} value={answer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{ __html: answer}} />
                    </button>
                </div>
            ))

            }
        </div>
    </div>
)

export default QuestionCard