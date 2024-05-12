export const Button = (props) => {
  return (
    <button {...props} className={props.className + " text-lg font-bold text-gray-100 bg-brand py-2 px-4 rounded-xl w-full"}>{props.children}</button>
  )
}