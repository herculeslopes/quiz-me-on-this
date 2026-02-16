import clsx from "clsx";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {

}

export default function Button({ className, children, ...props }: Props) {
  return <>
    <button {...props}
      className={clsx('bg-white p-3 pt-1 pb-1 rounded-2xl hover:bg-gray-300 transition cursor-pointer', className)}
    >
    {children}
  </button >
  </>
}