import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import colors from "utils/config/colors";
import dynamic from "next/dynamic";
import { Select } from "@mantine/core";
import { COUNTRIES_DATA } from "./data/countries_data";

const Globe = dynamic(import("./CustomGlobe"), { ssr: false });

const SecondHome = () => {
	const themes = [
		"orange",
		"red",
		"indigo",
		"green",
		"yellow",
		"pink",
		"blue",
		"rose",
		"lime",
		"purple",
	];

	const styles = useStyles();

	const [labelTheme, setLabelTheme] = useState("orange");
	const [activeCountry, setActiveCountry] = useState(COUNTRIES_DATA[0]);

	return (
		<div
			className={`h-screen bg-gray-100 text-white w-screen flex flex-col justify-center items-center`}
		>
			<div className={styles.configContainer}>
				<Select
					data={COUNTRIES_DATA.map((item) => ({
						value: item.name,
						label: item.name,
					}))}
					label="Find your country"
					value={activeCountry.name}
					defaultValue={themes[0]}
					classNames={{
						input:
							"outline-none text-gray-900 outline-none border border-gray-600",
						dropdown: "border border-gray-800 text-gray-900",
						selected: "bg-gray-800 text-white",
						label: "text-gray-900",
						options: "text-gray-100",
					}}
					searchable
					onChange={(val) =>
						setActiveCountry(
							COUNTRIES_DATA.filter((item) => item.name === val)[0]
						)
					}
				/>
				<Select
					data={themes.map((item) => ({
						value: item,
						label: item,
					}))}
					label="Label theme"
					value={labelTheme}
					defaultValue={themes[0]}
					classNames={{
						input:
							"outline-none text-gray-900 outline-none border border-gray-600",
						dropdown: "border border-gray-800 text-gray-900",
						selected: "bg-gray-800 text-white",
						label: "text-gray-900",
						options: "text-gray-100",
					}}
					searchable
					onChange={(val) => setLabelTheme(val)}
				/>
				<p className="text-left text-black">
					Made by{" "}
					<a
						href="https://www.iamshrey.me"
						target="_blank"
						className="underline hover:text-gray-900 text-black"
					>
						Shrey
					</a>
				</p>
			</div>
			<Globe
				labelTheme={labelTheme}
				activeCountry={activeCountry}
				setActiveCountry={setActiveCountry}
			/>
		</div>
	);
};
export default SecondHome;

const useStyles = makeStyles((theme) => ({
	activeBox: {
		borderLeft: `2px dashed ${colors.indigo[400]}`,
		borderRight: `2px dashed ${colors.indigo[400]}`,
		transition: "border 0.3s ease-in-out",
	},
	configContainer: {
		position: "fixed",
		top: 40,
		right: 40,
		border: `1px solid ${colors.gray[600]}`,
		borderRadius: 10,
		padding: 10,
		margin: "auto",
		display: "flex",
		justifyContent: "space-around",
		alignItems: "center",
		gap: "10px",
		flexDirection: "column",
		zIndex: 100,
	},
	slideContainer: {
		width: "100%",
		height: "100%",
	},
}));
