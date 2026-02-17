import n8nAPI from "@/clients/n8n-client";
import clsx from "clsx";
import { useRef, useState } from "react"

export default function APIKey() {
  const [showInput, setShowInput] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleInput = () => {
    setShowInput((prev) => !prev);

    if (inputRef.current && inputRef.current?.value)
      n8nAPI.defaults.headers['X-Quiz-Secret'] = inputRef.current?.value;
  }

  return <>
    <div
      className={clsx("flex items-center fixed bottom-3 right-3 h-10 p-3 rounded bg-white/30 transition-all hover:opacity-100", {
        'opacity-30': !inputFocused,
        'opacity-100': inputFocused,
        'w-100': showInput,
        'w-20': !showInput,
      })}
    >
      {
        showInput
          ? <input
            ref={inputRef}
            autoFocus
            type="text"
            className="w-full outline-0"
            onBlur={() => {
              setInputFocused(false);
              toggleInput();
            }}
            onFocus={() => setInputFocused(true)}
          />
          : <button className="cursor-pointer" onClick={toggleInput}>API Key</button>
      }
    </div>
  </>
}