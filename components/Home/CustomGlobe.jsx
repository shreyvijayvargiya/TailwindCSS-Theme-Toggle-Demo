import React from "react";
import { useEffect, useState, useRef, useCallback } from "react";
import { COUNTRIES_DATA } from "./data/countries_data";
import HEX_DATA from "./data/countries_hex_data.json";
import Globe from "react-globe.gl";
import colors from "tailwindcss/colors";

export default function CustomGlobe({
	labelTheme,
	activeCountry,
	setActiveCountry,
}) {
	
	const [hex, setHex] = useState({ features: [] });
	
	useEffect(() => {
		setHex(HEX_DATA);
	}, []);
	
	const globeEl = useRef();
	useEffect(() => {
		const MAP_CENTER = { lat: 0, lng: 0, altitude: 1.5 };
		globeEl.current.pointOfView(MAP_CENTER, 0);
	}, [globeEl]);

	useEffect(() => {
		const countryLocation = {
			lat: activeCountry.latitude,
			lng: activeCountry.longitude,
			altitude: 1.5,
		};
		globeEl.current.pointOfView(countryLocation, 1000);
	}, [activeCountry]);

	return (
		<div
			className={` h-screen text-white w-screen flex flex-col justify-center items-center z-10`}
		>
			<Globe
				ref={globeEl}
				height={800}
				backgroundColor="rgba(0,0,0,0)"
				labelsData={COUNTRIES_DATA.map((item) => {
					return {
						lat: item.latitude,
						lng: item.longitude,
						name: item.name,
						country: item.country,
					};
				})}
				onLabelClick={({ lat, lng, name, country }) => {
					setActiveCountry({
						label: name,
						latitude: lat,
						longitude: lng,
						country,
					});
				}}
				atmosphereColor={colors.gray[800]}
				showAtmosphere={false}
				labelText={"name"}
				labelSize={1}
				labelColor={() => colors[labelTheme][200]}
				labelDotRadius={0.2}
				labelAltitude={0.05}
				arcColor={colors.orange[600]}
				hexPolygonsData={hex.features}
				hexPolygonResolution={3}
				hexPolygonMargin={0.62}
				hexPolygonColor={useCallback(() => colors.gray[800], [])}
			/>
		</div>
	);
}
