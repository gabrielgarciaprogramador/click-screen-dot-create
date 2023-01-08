function Button (props){

  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={`
        bg-cyan-400 text-gray-700
        text-sm font-medium
        px-3 py-1
        rounded-sm
        border border-solid
        ${props.disabled ?
          `bg-gray-400 text-gray-300 border-transparent opacity-70 cursor-not-allowed` : 
          `cursor-pointer border-cyan-400
          hover:bg-transparent hover:text-cyan-400`
        }
      `}
    >
      {props.children}
    </button>
  )

}

export default Button