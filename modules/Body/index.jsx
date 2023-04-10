import React, { useState } from "react";
import { Navbar, Footer } from "modules";

const Body = ({ children }) => {

	const theme = window?.localStorage?.getItem("theme") ? window.localStorage.getItem("theme") : 'white';
	const [state, setState] = useState(theme);

	const toggleTheme = () => {
		if(theme === 'white' || !theme){
			setState("dark")
			window.localStorage.setItem("theme", "dark")
		}else {
			setState("white")
			window.localStorage.setItem("theme", "white")
		}
	}
	return (
		<div className={`${state}`}>
			<Navbar />
			<div className="h-screen w-full">
				<div className="flex flex-col justify-center items-center bg-white dark:bg-gray-900 dark:text-gray-400 h-full w-full">
					<button
						onClick={toggleTheme}
						className="p-2 bg-gray-900 text-gray-50 dark:bg-gray-100 dark:text-gray-900 cursor-pointer rounded-md"
					>
						Toggle theme
					</button>
					Theme: {state}
				</div>
			</div>
			<Footer />
		</div>
	);
};
export default Body;
