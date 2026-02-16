import type { ChangeEvent, SubmitEvent } from "react";

interface Props {
  value: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
}

export default function URLField({ value, handleChange, handleSubmit }: Props) {
  return <>
    <form className="w-full mx-auto" onSubmit={handleSubmit}>
      <label htmlFor="search" className="block mb-2.5 text-sm font-medium text-heading sr-only ">Search</label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" /></svg>
        </div>
        <input type="search" id="search" name='source' value={value} className="outline-none rounded-2xl block w-full p-3 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" placeholder="Search" required onChange={handleChange} />
        <button type="submit" className="hover:bg-blue-400 cursor-pointer absolute end-1.5 bottom-1.5 text-white bg-brand hover:bg-brand-strong box-border shadow-xs font-medium leading-5 rounded-2xl text-xs px-3 py-1.5">Search</button>
      </div>
    </form>
  </>
}
