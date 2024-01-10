import React, { useState } from "react";
import { Navbar, Footer } from "modules";

const Body = () => {
	const theme = window?.localStorage?.getItem("theme")
		? window.localStorage.getItem("theme")
		: "white";

	const toggleTheme = (theme) => {
		setActiveTheme(theme);
	};

	const [activeTheme, setActiveTheme] = useState("jaipur");

	const themeMap = {
		jaipur: "bg-gray-900 text-gray-50",
		tokyo: "bg-zinc-900 text-black",
		london: "bg-indigo-50 text-black",
		berlin: "bg-green-50 text-black",
		sydney: "bg-yellow-50 text-black",
		newyork: "bg-pink-50 text-black",
	};

	return (
		<div
			className={`outline-none ${themeMap[activeTheme]} h-screen`}
			tabIndex="0"
			onKeyDown={(e) => {
				if (e.key === "t") {
					toggleTheme("london");
				}
			}}
		>
			<div className="h-full md:w-1/5 xxs:w-full xs:w-full flex justify-center items-center mx-auto">
				{Object.keys(themeMap).map((item) => {
					return (
						<div
							className="h-screen w-full mx-auto flex flex-col justify-center items-center"
							key={item}
						>
							<button
								onClick={() => toggleTheme(item)}
								className={`p-2 w-10 h-10 border border-black bg-black cursor-pointer rounded-md`}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};
export default Body;
