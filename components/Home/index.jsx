import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core";
import colors from "tailwindcss/colors";

const Home = () => {
	const toggleTheme = (theme) => {
		setActiveTheme(theme);
	};

	const [activeTheme, setActiveTheme] = useState("jaipur");
	const intensities = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
	const [intensity, setIntensity] = useState(200);

	const ref = useRef(null);

	const themeMap = {
		delhi: `bg-orange-${intensity}`,
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
		bangkok: `bg-orange-${intensity}`,
		bali: `bg-red-${intensity}`,
		bhutan: `bg-orange-${intensity}`,
		belgium: `bg-red-${intensity}`,
		italy: `bg-indigo-${intensity}`,
		argentina: `bg-green-${intensity}`,
	};

	const getThemeColor = (item) => {
		const themeColor = themeMap[item]?.split(" ")[0]?.split("-")[1];
		return themeColor;
	};

	const styles = useStyles();

	const activeIndex = Object.keys(themeMap).indexOf(activeTheme);

	const handleKeyMove = (e) => {
		if (activeIndex <= Math.floor(Object.keys(themeMap).length / 2)) {
			ref?.current?.scrollIntoView({
				behavior: "smooth",
				block: "center",
				inline: "center",
			});
		} else if (activeIndex > Math.floor(Object.keys(themeMap).length / 2)) {
			ref?.current?.scrollIntoView({
				behavior: "smooth",
				block: "center",
				inline: "center",
			});
		}
		if (e.key === "ArrowLeft") {
			if (activeIndex === 0) {
				setActiveTheme(Object.keys(themeMap)[Object.keys(themeMap).length - 1]);
			} else {
				setActiveTheme(Object.keys(themeMap)[activeIndex - 1]);
			}
		} else if (e.key === "ArrowRight") {
			if (activeIndex === Object.keys(themeMap).length - 1) {
				setActiveTheme(Object.keys(themeMap)[0]);
			} else {
				setActiveTheme(Object.keys(themeMap)[activeIndex + 1]);
			}
		}
		if (e.key === " ") {
			const lastItem = Object.keys(themeMap).length - 1;
			setActiveTheme(Object.keys(themeMap)[activeIndex + 1]);
			if (activeIndex === lastItem) {
				setActiveTheme(Object.keys(themeMap)[0]);
			}
		}
	};

	return (
		<div
			className={`outline-none ${themeMap[activeTheme]} h-screen overflow-y-hidden overflow-x-scroll`}
			tabIndex="0"
			onKeyDown={handleKeyMove}
		>
			<div className="mx-auto my-5 overflow-x-hidden">
				<div className={styles.cityContainer}>
					{Object.keys(themeMap).map((item) => {
						const themeColor = getThemeColor(item);
						return (
							<div
								className={`mx-auto flex flex-col justify-center items-center cursor-pointer px-4 border-t-2 border-b-2 border-dashed border-black z-100 ${
									activeTheme === item
										? `border-dashed border-r-2 border-l-2 border-black bg-${themeColor}-${
												intensity <= 700 ? Number(intensity) + 100 : intensity
										  }`
										: "none"
								}`}
								key={item}
								ref={activeTheme === item ? ref : null}
								onClick={() => toggleTheme(item)}
							>
								<button
									className={`p-2 h-10 mx-auto rounded-md text-center align-center border-2 border-black cursor-pointer outline-none bg-${themeColor}-${
										intensity > 100 ? intensity - 100 : intensity
									} my-4 hover:bg-${themeColor}-700 ${
										activeTheme === item ? "border-2 border-black" : null
									}`}
									onClick={() => toggleTheme(item)}
								>
									{item.toUpperCase()}
								</button>
							</div>
						);
					})}
				</div>
			</div>
			<div className={styles.activeContainer}>
				<div className="w-96" style={{ height: "40rem" }}>
					<p className="text-7xl font-serif font-semibold text-center mb-2">
						{activeTheme
							?.split("")[0]
							.toUpperCase()
							.concat(activeTheme.slice(1, activeTheme.length))}
					</p>
					<img
						src={`./${activeTheme}.avif`}
						className="w-full h-full rounded-xl shadow-xl"
					/>
				</div>
			</div>
			<div className="fixed top-10 right-10 text-center border-dashed border-2 border-black">
				<p className="w-auto rounde-md p-4 text-sm text-black">
					Press <span className="bg-gray-800 p-1 text-white">Space</span> or{" "}
					<span>use {"<-, ->"} keys</span> to toggle theme
				</p>
				<div className="border-t-2 border-black border-dashed w-full h-1" />
				<div className="flex justify-center items-center gap-4">
					<p className="my-2 outline-none text-white mx-4">
						<select
							onChange={(e) => setIntensity(e.target.value)}
							className="p-2 mx-auto text-black border-2 border-dotted border-black rounded-md outline-none bg-transparent"
							style={{ background: "transparent" }}
						>
							{intensities.map((item) => {
								return (
									<option
										key={item}
										value={item}
										className="outline-none text-black bg-transparent"
									>
										{item}
									</option>
								);
							})}
						</select>
					</p>
					<p className="my-4">
						Made by{" "}
						<a
							href="https://www.iamshrey.me"
							target="_blank"
							className="text-gray-800 underline hover:text-gray-900"
						>
							Shrey
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};
export default Home;

const useStyles = makeStyles((theme) => ({
	activeBox: {
		borderLeft: `2px dashed ${colors.indigo[400]}`,
		borderRight: `2px dashed ${colors.indigo[400]}`,
		transition: "border 0.3s ease-in-out",
	},
	cityContainer: {
		width: "100%",
		margin: "auto",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "flex-end",
		height: "98vh",
		flexWrap: "nowrap",
	},
	activeContainer: {
		position: "fixed",
		left: "50%",
		top: 0,
		transform: "translate(-50%, 0)",
		// borderLeft: `2px dashed black`,
		// borderRight: "2px dashed black",
		padding: theme.spacing(10),
	},
}));
