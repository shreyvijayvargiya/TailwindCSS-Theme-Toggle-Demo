import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import colors from "tailwindcss/colors";

const Body = () => {
	const toggleTheme = (theme) => {
		setActiveTheme(theme);
	};

	const [activeTheme, setActiveTheme] = useState("jaipur");
	const intensities = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
	const [intensity, setIntensity] = useState(200);

	const themeMap = {
		jaipur: `bg-orange-${intensity}`,
		tokyo: `bg-red-${intensity}`,
		london: `bg-indigo-${intensity}`,
		berlin: `bg-green-${intensity}`,
		sydney: `bg-yellow-${intensity}`,
		newyork: `bg-pink-${intensity}`,
		istanbul: `bg-blue-${intensity}`,
		seoul: `bg-rose-${intensity}`,
		capetown: `bg-blueGray-${intensity}`,
		amsterdam: `bg-lime-${intensity}`,
		moscow: `bg-purple-${intensity}`,
	};

	const getThemeColor = (item) => {
		const themeColor = themeMap[item].split(" ")[0].split("-")[1];
		return themeColor;
	};

	return (
		<div
			className={`outline-none ${themeMap[activeTheme]} h-screen overflow-y-hidden overflow-x-scroll`}
			tabIndex="0"
			onKeyDown={(e) => {
				const activeIndex = Object.keys(themeMap).indexOf(activeTheme);
				if (e.key === "ArrowLeft") {
					// move on down in themeMap
					if (activeIndex === 0) {
						setActiveTheme(
							Object.keys(themeMap)[Object.keys(themeMap).length - 1]
						);
					}
					setActiveTheme(Object.keys(themeMap)[activeIndex - 1]);
				} else if (e.key === "ArrowRight") {
					// move right in the themeMap
					if (activeIndex === Object.keys(themeMap).length - 1) {
						setActiveTheme(Object.keys(themeMap)[0]);
					}
					setActiveTheme(Object.keys(themeMap)[activeIndex + 1]);
				}
				if (e.key === " ") {
					const lastItem = Object.keys(themeMap).length - 1;
					setActiveTheme(Object.keys(themeMap)[activeIndex + 1]);
					if (activeIndex === lastItem) {
						setActiveTheme(Object.keys(themeMap)[0]);
					}
				}
			}}
		>
			<div className="fixed bottom-10 left-0 right-0 text-center p-2">
				<span className="w-auto rounde-md p-4 text-sm bg-gray-900 text-white">
					Press <span className="bg-gray-800 p-1">Space</span> or{" "}
					<span>use {"<-, ->"} keys</span> to toggle theme
				</span>
				<span className="bg-gray-900 p-3 outline-none text-white mx-4">
					<select
						onChange={(e) => setIntensity(e.target.value)}
						className="bg-gray-900 p-2 mx-auto text-white outline-none"
					>
						{intensities.map((item) => {
							return (
								<option
									key={item}
									value={item}
									className="outline-none text-white"
								>
									{item}
								</option>
							);
						})}
					</select>
				</span>
			</div>
			<div className="h-full xxs:w-full xs:w-full flex justify-center items-center gap-10 mx-auto">
				{Object.keys(themeMap).map((item) => {
					const themeColor = getThemeColor(item);
					return (
						<div
							className={`h-full min-w-xl mx-auto flex flex-col justify-center items-center py-20 cursor-pointer ${
								activeTheme === item
									? `border-l border-r border-dotted border-gray-400 bg-${themeColor}-${intensity}`
									: "none"
							}`}
							key={item}
							onClick={() => toggleTheme(item)}
						>
							{activeTheme === item ? (
								<>
									<img
										loading="lazy"
										src={`/${activeTheme}.avif`}
										className="w-full h-96"
									/>
								</>
							) : (
								<button
									className={`p-2 h-10 mx-auto rounded-md text-center align-center border-dotted border-black cursor-pointer bg-${themeColor}-400 my-4 hover:bg-${themeColor}-700`}
								>
									{item.toUpperCase()}
								</button>
							)}
							<br />
						</div>
					);
				})}
			</div>
		</div>
	);
};
export default Body;

const useStyles = makeStyles((theme) => ({
	activeBox: {
		borderLeft: `2px dashed ${colors.indigo[400]}`,
		borderRight: `2px dashed ${colors.indigo[400]}`,
		transition: "border 0.3s ease-in-out",
	},
}));
