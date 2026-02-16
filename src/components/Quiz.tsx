import QuizContext, { type IQuizContext } from "@/contexts/quiz-context"
import { useContext } from "react"
import LoadingSpinner from "./LoadingSpinner";
import Button from "./Button";
import Question from "./Question";
import clsx from "clsx";

export default function Quiz() {
  const quizContext = useContext<IQuizContext | null>(QuizContext);

  if (quizContext == null)
    return <LoadingSpinner />;

  const [questions, _setQuestions] = quizContext.questionsState;
  const [current, _setCurrent] = quizContext.currentState;
  const correctAnswers = quizContext.correctAnswers;
  const questionsAnswered = quizContext.questionsAnswered;
  const previousQuestion = quizContext.previousQuestion;
  const nextQuestion = quizContext.nextQuestion;
  const checkOption = quizContext.checkOption;
  const ignoreOption = quizContext.ignoreOption;

  return <>
    <div className="flex flex-col min-h-100 gap-3">
      <menu className='flex justify-between'>
        <div className='flex justify-between items-center gap-3'>
          <span className='flex-1'>Acertos:</span>

          <div className={clsx('flex justify-center items-center p-2 rounded-full border aspect-square', {
            'bg-green-300 border-green-800 text-green-800': questionsAnswered != 0 && questionsAnswered === correctAnswers,
            'bg-red-300 border-red-800 text-red-800': questionsAnswered === questions.length && correctAnswers === 0,
            'bg-yellow-300 border-yellow-800 text-yellow-800': questionsAnswered != 0 && questionsAnswered != correctAnswers && correctAnswers !== questions.length && !(questionsAnswered === questions.length && correctAnswers === 0),
          })}>
            <span>{correctAnswers}</span>
            <span>/</span>
            <span>{questions.length}</span>
          </div>
        </div>

        <div className='flex justify-end gap-3 items-end'>
          <span>Questão {current + 1} de {questions.length}</span>

          <Button onClick={previousQuestion}>Anterior</Button>
          <Button onClick={nextQuestion}>Próxima</Button>
        </div>
      </menu>

      <div className='flex-1 h-full relative overflow-hidden'>
        {questions.map((question, index) => <Question key={question.id} index={index} current={current} question={question} checkOption={checkOption} ignoreOption={ignoreOption} />)}
      </div>
    </div>
  </>
}