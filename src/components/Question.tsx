import { QuestionStatus, type QuestionType } from "@/types/quiz-types"
import { nanoid } from "nanoid";
import clsx from 'clsx';

interface Props {
  index: number;
  current: number;
  question: QuestionType;
  checkOption: (questionId: string, optionIndex: number) => void;
  ignoreOption: (questionId: string, optionIndex: number) => void;
}

export default function Question({ index, current, question, checkOption }: Props) {
  const translate = `${100 * (index - current)}%`;

  return <>
    <div 
    // w-3/4 
    className="duration-300 transition-all ease-[cubic-bezier(0.075, 0.82, 0.165, 1)] flex h-full absolute w-full flex-col gap-5 bg-white p-5 rounded-2xl"
      // className={clsx(`[transform:translateX(${translate})]`, " transition-all ease-in-out duration-300 flex absolute w-full flex-col gap-5 bg-white p-5 rounded-2xl", {
      //   "transform": true,
      // })}
      style={{
        translate,
      }}
      >
      <p className="text-xl">{question.question}</p>

      <ul className="flex flex-col gap-3">
        {question.options.map((option, index) => <>
          <li className={clsx('gap-2 flex border-gray-400 border rounded-2xl p-2  transition cursor-pointer hover:bg-gray-300', {
            'pointer-events-none': question.status !== QuestionStatus.UNANSWERED,
            'transition bg-green-300 border-green-800 text-green-800': option.checked && question.status === QuestionStatus.CORRECT,
            'bg-red-300 border-red-800 text-red-800': option.checked && question.status === QuestionStatus.INCORRECT,
          })} key={nanoid()} onClick={() => checkOption(question.id, index)}>
            {/* <div className={clsx('border aspect-square rounded-full')}></div> */}
            <span className="text-l">{option.option}</span>
          </li>
        </>)}
      </ul>
    </div>
  </>
}