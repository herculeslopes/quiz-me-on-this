import type { QuestionType } from "@/types/quiz-types";
import { createContext, type Dispatch, type SetStateAction } from "react";

export interface IQuizContext {
    questionsState: [QuestionType[], Dispatch<SetStateAction<QuestionType[]>>];
    currentState: [number, Dispatch<SetStateAction<number>>];
    leaderboardState: [boolean, Dispatch<SetStateAction<boolean>>];
    correctAnswers: number;
    questionsAnswered: number;
    previousQuestion: () => void;
    nextQuestion: () => void;
    checkOption: (questionId: string, option: number) => void;
    ignoreOption: (questionId: string, option: number) => void;
}

const QuizContext = createContext<IQuizContext | null>(null);

export default QuizContext;