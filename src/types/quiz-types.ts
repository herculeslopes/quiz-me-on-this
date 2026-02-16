export enum QuestionStatus {
    UNANSWERED = 1,
    CORRECT = 2,
    INCORRECT = 3,
}

export type OptionType = {
    option: string;
    ignore: boolean;
    checked: boolean;
}

export type APIQuestionType = {
    question: string;
    options: string[];
    answer: number;
    status?: QuestionStatus,
}

export type QuestionType = {
    id: string;
    question: string;
    options: OptionType[];
    answer: number;
    status?: QuestionStatus,
}

export type QuizType = {
    questions: QuestionType[];
}