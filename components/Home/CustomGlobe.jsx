import React from "react";
import { useEffect, useState, useRef, useCallback } from "react";
import { COUNTRIES_DATA } from "./data/countries_data";
import HEX_DATA from "./data/countries_hex_data.json";
import Globe from "react-globe.gl";
import colors from "tailwindcss/colors";

const getRandomCountry = () => {
	return COUNTRIES_DATA[Math.floor(Math.random() * COUNTRIES_DATA.length)];
};

export default function CustomGlobe() {
	const globeEl = useRef();
	const country = getRandomCountry();
	const [selectedCountry, setSelectedCountry] = useState({
		lat: country.latitude,
		lng: country.longitude,
		label: country.name,
	});
	const [hex, setHex] = useState({ features: [] });

	useEffect(() => {
		setHex(HEX_DATA);
	}, []);

	useEffect(() => {
		const MAP_CENTER = { lat: 0, lng: 0, altitude: 1.5 };
		globeEl.current.pointOfView(MAP_CENTER, 0);
	}, [globeEl]);

	useEffect(() => {
		const countryLocation = {
			lat: selectedCountry.lat,
			lng: selectedCountry.lng,
			altitude: 1.5,
		};

		globeEl.current.pointOfView(countryLocation, 2000);
	}, [selectedCountry]);

	const themes = [
		"orange",
		"red",
		"indigo",
		"green",
		"yellow",
		"pink",
		"blue",
		"rose",
		"blueGray",
		"lime",
		"purple",
	];

	const [intensity, setIntensity] = useState(100);
	const [active, setActive] = useState(0);

	return (
		<Globe
			ref={globeEl}
			height={800}
			backgroundColor="rgba(0,0,0,0)"
			labelsData={COUNTRIES_DATA.map((item) => {
				return {
					lat: item.latitude,
					lng: item.longitude,
					name: item.name,
				};
			})}
			onLabelClick={({ lat, lng, name }) => {
				setSelectedCountry({ label: name, lat, lng });
			}}
			atmosphereColor={colors.gray[800]}
			showAtmosphere={false}
			labelText={"name"}
			labelSize={0.8}
			labelColor={useCallback(() => colors["gray"][50], [])}
			labelDotRadius={0.2}
			labelAltitude={0.05}
			hexPolygonsData={hex.features}
			hexPolygonResolution={3}
			hexPolygonMargin={0.62}
			hexPolygonColor={useCallback(() => colors.gray[800], [])}
		/>
	);
}
