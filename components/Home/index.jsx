import React, { useRef, useState } from "react";
import { IconButton, makeStyles } from "@material-ui/core";
import colors from "utils/config/colors";
import GridLines from "react-gridlines";
import { useSpring, animated, useTransition, useTrail } from "react-spring";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

const Home = () => {
	const toggleTheme = (theme) => {
		setActiveTheme(theme);
	};
	const [intensity, setIntensity] = useState(200);

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

	const [activeTheme, setActiveTheme] = useState("jaipur");
	const intensities = [50, 100, 200, 300, 400, 500];

	const activeIndex = Number(Object.keys(themeMap).indexOf(activeTheme));
	const [scrollDirection, setScrollDirection] = useState("right");

	const ref = useRef(null);

	const rangesOfIntensity = (n, theme) => {
		return `bg-${theme}-${n}`;
	};

	const getThemeColor = (item) => {
		const themeColor = themeMap[item]?.split(" ")[0]?.split("-")[1];
		return themeColor;
	};

	const styles = useStyles();

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
			setScrollDirection("left");
			if (activeIndex === 0) {
				setActiveTheme(Object.keys(themeMap)[Object.keys(themeMap).length - 1]);
			} else {
				setActiveTheme(Object.keys(themeMap)[activeIndex - 1]);
			}
		} else if (e.key === "ArrowRight") {
			setScrollDirection("right");
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

	const activeThemeBg = themeMap[activeTheme];

	const getNextTheme = (n) => {
		if (n === Object.keys(themeMap).length - 1) {
			return Object.keys(themeMap)[Object.keys(themeMap).length - n];
		} else {
			return Object.keys(themeMap)[n + 1];
		}
	};
	const getPrevTheme = (n) => {
		if (n <= 0) {
			return Object.keys(themeMap)[Object.keys(themeMap).length + n];
		}
		return Object.keys(themeMap)[n - 1];
	};

	const shownImages = [
		getPrevTheme(activeIndex - 1),
		activeTheme,
		getNextTheme(activeIndex + 1),
	];

	const transitions = useTransition(shownImages, {
		keys: shownImages,
		from: {
			opacity: 0,
			scale: 0.2,
			transform:
				scrollDirection === "left" ? "translateX(-100%)" : "translateX(100%)",
		},
		enter: { opacity: 1, scale: 1, transform: "translateX(0%)" },
		exitBeforeEnter: true,
		duration: 500,
	});

	const textSpring = useTransition(activeIndex, {
		from: {
			opacity: 0,
			transform:
				scrollDirection === "left" ? "translateX(-50%)" : "translateX(50%)",
		},
		enter: { opacity: 1, transform: "translateX(0%)" },
		exitBeforeEnter: true,
	});

	return (
		<div
			className={`outline-none ${activeThemeBg} h-screen overflow-y-hidden overflow-x-scroll ${
				Number(intensity) > 500 ? "text-white" : "text-black"
			}`}
			tabIndex="0"
			onKeyDown={handleKeyMove}
		>
			<div className="mx-auto my-5 overflow-x-hidden">
				<div className={styles.cityContainer}>
					{Object.keys(themeMap).map((item, index) => {
						const themeColor = getThemeColor(item);
						const high700Color = rangesOfIntensity(700, themeColor);
						const highColor = rangesOfIntensity(
							Number(intensity) + 100,
							themeColor
						);
						return (
							<div
								className={`mx-auto flex flex-col justify-center items-center cursor-pointer px-4 border-dashed border-black z-100 ${
									activeTheme === item
										? `${highColor} rounded-md`
										: "none"
								}`}
								key={item}
								style={{
									position: "relative",
									bottom: index % 2 === 0 ? 90 + index + "px" : "0px",
								}}
								ref={activeTheme === item ? ref : null}
								onClick={() => toggleTheme(item)}
							>
								<button
									className={`p-2 h-10 mx-auto rounded-md text-center align-center border-2 border-dashed border-black cursor-pointer outline-none ${
										intensity > 100 ? highColor : themeMap[activeTheme]
									} my-4 hover:${high700Color}
										${activeTheme === item ? "border-2 border-black" : null}`}
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
				{textSpring((style) => (
					<animated.p
						style={style}
						className="text-6xl font-serif font-semibold text-center mb-2"
					>
						{activeTheme
							?.split("")[0]
							.toUpperCase()
							.concat(activeTheme.slice(1, activeTheme.length))}
					</animated.p>
				))}
				<div className="flex justify-center items-center gap-4 h-full w-full">
					<FaChevronCircleLeft
						size={24}
						color={colors.gray[900]}
						className="cursor-pointer"
						onClick={() => handleKeyMove({ key: "ArrowLeft" })}
					/>
					{transitions((style, i) => {
						return (
							<animated.div style={style}>
								<img
									src={`./${i}.avif`}
									className={`${
										activeTheme === i ? "w-96" : "w-60"
									} h-full rounded-xl`}
									onClick={() => setActiveTheme(i)}
								/>
							</animated.div>
						);
					})}
					<FaChevronCircleRight
						size={24}
						color={colors.gray[900]}
						className="cursor-pointer"
						onClick={() => handleKeyMove({ key: "ArrowRight" })}
					/>
				</div>
			</div>
			<div className="fixed top-10 right-10 text-center ">
				<div className="border-dashed border-2 border-black">
					<p className="w-auto rounde-md p-4 text-sm">
						Press <span className="bg-gray-800 p-1 text-white">Space</span> or{" "}
						<span>use {"<-, ->"} keys</span> to toggle theme
					</p>
					<div className="border-t-2 border-black border-dashed w-full h-1" />
					<div className="flex justify-center items-center gap-4">
						<p className="my-2 outline-none mx-4">
							<select
								onChange={(e) => setIntensity(e.target.value)}
								className="p-2 mx-auto border-2 border-dotted border-black rounded-md outline-none bg-transparent"
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
								className="underline hover:text-gray-100"
							>
								Shrey
							</a>
						</p>
					</div>
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
		overflowX: "scroll",
		msOverflowStyle: "-ms-autohiding-scrollbar",
	},
	activeContainer: {
		position: "fixed",
		left: "50%",
		top: "10%",
		width: "700px",
		height: "600px",
		transform: "translate(-50%, 0)",
	},
	slideContainer: {
		width: "100%",
		height: "100%",
	},
}));
