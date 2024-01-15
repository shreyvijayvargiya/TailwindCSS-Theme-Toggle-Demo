import React, { useRef, useState } from "react";
import { IconButton, makeStyles } from "@material-ui/core";
import colors from "utils/config/colors";
import dynamic from "next/dynamic";

const Globe = dynamic(import("./CustomGlobe"), { ssr: false });

const SecondHome = () => {

	return (
		<div
			className={`bg-gray-900 h-screen text-white w-screen flex flex-col justify-center items-center`}
		>
			<Globe />
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
	activeContainer: {
		margin: "auto",
		height: "100vh",
		width: "100%",
	},
	slideContainer: {
		width: "100%",
		height: "100%",
	},
}));
