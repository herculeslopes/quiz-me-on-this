import { createFileRoute } from '@tanstack/react-router'
import URLField from '@/components/URLField'
import { useContext, useEffect, useMemo, useState, type ChangeEvent, type SubmitEvent } from 'react'
import n8nAPI from '@/clients/n8n-client'
import { QuestionStatus, type QuestionType, type APIQuestionType } from '@/types/quiz-types'
import { nanoid } from 'nanoid'
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import clsx from 'clsx'
import Button from '@/components/Button'
import { motion } from 'motion/react';
import LoadingSpinner from '@/components/LoadingSpinner'
import Leaderboard from '@/components/Leaderboard'
import type { IQuizContext } from '@/contexts/quiz-context'
import QuizContext from '@/contexts/quiz-context'
import Quiz from '@/components/Quiz'
import LiveButton from '@/components/LiveButton'
import APIKey from '@/components/APIKey'

export const Route = createFileRoute('/')({
  component: App,
})

const initialForm = {
  source: '',
}

const builtinQuestions: QuestionType[] = [
  {
    id: '1',
    question: "Are magic mushrooms more or less dangerous when dried?",
    status: QuestionStatus.UNANSWERED,
    options: [
      { option: "More dangerous when dried", checked: false, ignore: false },
      { option: "Less dangerous when dried", checked: false, ignore: false },
      { option: "No more or less dangerous when dried", checked: false, ignore: false },
      { option: "Only dangerous when fresh", checked: false, ignore: false }
    ],
    answer: 2
  },
  {
    id: '2',
    question: "What is the main active ingredient in magic mushrooms that stimulates neurons in the brain?",
    status: QuestionStatus.UNANSWERED,
    options: [
      { option: "Psilocybin", checked: false, ignore: false },
      { option: "Psilocin", checked: false, ignore: false },
      { option: "Serotonin", checked: false, ignore: false },
      { option: "Amanita phalloides", checked: false, ignore: false }
    ],
    answer: 1
  },
  {
    id: '3',
    question: "What is a common effect of eating magic mushrooms?",
    status: QuestionStatus.UNANSWERED,
    options: [
      { option: "Uncontrollable crying", checked: false, ignore: false },
      { option: "Uncontrollable laughter", checked: false, ignore: false },
      { option: "Increased heart rate", checked: false, ignore: false },
      { option: "Nausea", checked: false, ignore: false }
    ],
    answer: 1
  },
  {
    id: '4',
    question: "Is it legal to possess magic mushrooms in the UK?",
    status: QuestionStatus.UNANSWERED,
    options: [
      { option: "Yes, it is legal", checked: false, ignore: false },
      { option: "No, it is illegal", checked: false, ignore: false },
      { option: "Only if they are dried", checked: false, ignore: false },
      { option: "Only if they are fresh", checked: false, ignore: false }
    ],
    answer: 1
  },
  {
    id: '5',
    question: "What is the most toxic mushroom species that can cause liver and kidney failure?",
    status: QuestionStatus.UNANSWERED,
    options: [
      { option: "Psilocybe semilanceata", checked: false, ignore: false },
      { option: "Amanita phalloides", checked: false, ignore: false },
      { option: "Fly agaric", checked: false, ignore: false },
      { option: "Liberty cap", checked: false, ignore: false }
    ],
    answer: 1
  }
];

// const builtinQuestions_: QuestionType[] = [{
//   id: '1',
//   question: 'What is the super hero with powers of a spider?',
//   status: QuestionStatus.UNANSWERED,
//   options: [
//     {
//       option: 'Superman',
//       checked: false,
//       ignore: false,
//     },
//     {
//       option: 'Ironman',
//       checked: false,
//       ignore: false,
//     },
//     {
//       option: 'Spiderman',
//       checked: false,
//       ignore: false,
//     },
//     {
//       option: 'Batman',
//       checked: false,
//       ignore: false,
//     },
//   ],
//   answer: 2,
// }]

function App() {
  const [form, setForm] = useState(initialForm);

  const [questions, setQuestions] = useState<QuestionType[]>(builtinQuestions);
  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean | undefined>(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);


  const fetchQuiz = async () => {
    try {
      setIsLoading(true);
      const response = await n8nAPI.post('/quiz-me-on-this', {
        form,
      });

      const questions = response.data as APIQuestionType[];
      const uiQuestions: QuestionType[] = questions.map(question => ({
        id: nanoid(),
        status: QuestionStatus.UNANSWERED,
        options: question.options.map(option => ({
          checked: false,
          option: option,
          ignore: false,
        })),
        answer: question.answer,
        question: question.question,
      }));

      setQuestions(uiQuestions);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(undefined);
      throw error;
    }
  }

  const checkOption = (questionId: string, optionIndex: number) => {
    const questionIndex = questions.findIndex(question => question.id === questionId);

    const newQuestions = [...questions];
    const selectedQuestion = newQuestions[questionIndex];

    if (selectedQuestion.status !== QuestionStatus.UNANSWERED) {
      return;
    }

    selectedQuestion.status = optionIndex === selectedQuestion.answer ? QuestionStatus.CORRECT : QuestionStatus.INCORRECT;
    selectedQuestion.options = selectedQuestion.options.map((option, index) => index === optionIndex
      ? ({ ...option, checked: true })
      : ({ ...option, checked: false }));

    setQuestions(newQuestions);
  }

  const correctAnswers = useMemo<number>(
    () => questions.filter(question => question.status === QuestionStatus.CORRECT).length,
    [questions]
  );

  const questionsAnswered = useMemo<number>(
    () => questions.filter(question => question.status !== QuestionStatus.UNANSWERED).length,
    [questions]
  )



  useEffect(() => {
    if (questionsAnswered === questions.length && correctAnswers === questions.length) {
      setShowFireworks(true);
      const timer = setTimeout(() => {
        setShowFireworks(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [questionsAnswered, correctAnswers]);

  const ignoreOption = (_questionId: string, _option: number) => {

  }

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    setForm({ ...form, [name]: value });
  }

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchQuiz();
  }

  const previousQuestion = () => {
    if (current == 0)
      setCurrent(questions.length - 1);
    else
      setCurrent((current - 1) % (questions.length - 1));
  }

  const nextQuestion = () => {
    setCurrent((current + 1) % questions.length);
  }

  const resetQuiz = () => {
    const newQuestions = questions.map(question => ({
      ...question,
      status: QuestionStatus.UNANSWERED,
      options: question.options.map(option => ({
        ...option,
        checked: false,
        ignore: false,
      }))
    }));
    setQuestions(newQuestions);
    setCurrent(0);
  }

  const toggleLeaderboard = () => {
    setShowLeaderboard((prev) => !prev);
  }

  const quizContextState: IQuizContext = {
    questionsState: [questions, setQuestions],
    currentState: [current, setCurrent],
    leaderboardState: [showLeaderboard, setShowLeaderboard],
    correctAnswers,
    questionsAnswered,
    previousQuestion,
    nextQuestion,
    checkOption,
    ignoreOption,
  }

  return <>
    <QuizContext.Provider value={quizContextState}>
      <LiveButton />

      {
        showFireworks &&
        <Fireworks autorun={{ speed: 3 }} />
      }

      <div
        className='flex items-center justify-center min-h-screen bg-linear-to-br from-cyan-100 via-blue-300 to-indigo-400'>
        <div className='flex flex-col w-1/2 gap-3'>

          <motion.div layout layoutId='main-div' className='flex flex-col gap-5'>
            <span className='text-xl'>Crie um quiz sobre o assunto dessa página:</span>
            <URLField value={form.source} handleChange={handleFormChange} handleSubmit={handleSubmit} />

          </motion.div>

          <LoaderSwitch isLoading={isLoading} />

          <menu className={clsx('flex gap-3 transition-all duration-500 opacity-0', {
            // 'pointer-events-none': questionsAnswered !== questions.length,
            'opacity-100 pointer-events-auto': questionsAnswered === questions.length || true,
          })}>
            <Button onClick={resetQuiz}>Reiniciar</Button>

            {
              showLeaderboard
                ? <Button onClick={toggleLeaderboard}>Leaderboard</Button>
                : <Button onClick={toggleLeaderboard}>Quiz</Button>
            }
          </menu>

        </div>
      </div>

      <APIKey />
    </QuizContext.Provider>
  </>
}

function LoaderSwitch({ isLoading }: { isLoading: boolean | undefined }) {
  if (isLoading === undefined)
    return <MainContent />

  if (isLoading)
    return <LoadingSpinner />

  if (!isLoading)
    return <></>
}

function MainContent() {
  const quizState = useContext(QuizContext);

  if (quizState === null)
    return <></>

  const [showLeaderboard, _setShowLeaderboard] = quizState.leaderboardState;

  if (showLeaderboard)
    return <Leaderboard />

  if (!showLeaderboard)
    return <Quiz />
}