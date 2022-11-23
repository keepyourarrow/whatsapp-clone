import React from 'react'
import { useDispatch } from 'react-redux';

const AuthBtn = ({ active, className="", text, type, setActive }) => {
	const dispatch = useDispatch();
  return (
    <button
			type="button"
			className={
				`py-1 border-b border-transparent focus:outline-none ${className} ${
				(active === type ? "border-blue-500 text-blue-500" : "")}`
			}
			onClick={() => {
				dispatch({ type: "REMOVE_ERROR" });
				setActive(type);
			}}
		>
			{text}
		</button>
  )
}

export default AuthBtn