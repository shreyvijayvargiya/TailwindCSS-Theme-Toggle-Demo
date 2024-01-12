const {
	PHASE_PRODUCTION_SERVER,
	PHASE_DEVELOPMENT_SERVER,
} = require("next/constants");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

module.exports = (phase) => {
	const isDev = phase === PHASE_DEVELOPMENT_SERVER;
	const isProd = phase === PHASE_PRODUCTION_SERVER;
	const stageUrl = "http://localhost:4000/";
	const prodUrl = "https://ihatereading-backend-services.onrender.com/";
	return {
		env: {
			REACT_APP_FIREBASE_KEY: "AIzaSyAz-hjGhuQ4wczQMYOAMI9vR2gT7Sw9L6E",
			REACT_APP_FIREBASE_DOMAIN: "ihatereading-4ba52.firebaseapp.com",
			REACT_APP_FIREBASE_DATABASE:
				"https://ihatereading-4ba52-default-rtdb.firebaseio.com/",
			REACT_APP_FIREBASE_PROJECT_ID: "ihatereading-4ba52",
			REACT_APP_FIREBASE_STORAGE_BUCKET: "ihatereading-4ba52.appspot.com",
			REACT_APP_ID: "1:229243106222:web:fbda9e2ce9f7bb61234e3f",
			REACT_APP_MEASUREMENT_ID: "G-NDZCNG6Z5X",
			SUPABASE_KEY:
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJidmlld21zcWd0ZXB3a2JwYWtsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg3NzA2MjAsImV4cCI6MTk4NDM0NjYyMH0.tAYXlJQ7d-xxmrSy2WF3tSSIFgraUL9LkMI1YzodtSU",
			baseUrl: prodUrl,
			stageUrl: stageUrl,
			isDev: isDev,
			isProd: isProd,
			stripeServerKey:
				"pk_test_51MP3WjSHwrRfUqyvwzMGmmWpJ6PaUfV6WAAhzdHvlsz26utdPZChsdkCFjbhdeLFdLr1rVAU6CaBMnGedmaRoccd00QOVPQo0A",
			stripeClientKey:
				"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",
			NOTION_TOKEN: "secret_lWxsufOgs0jo9zIetH0m59YwMqA6ubDgPDqo5HHD83x",
		},
		experimental: {
			esmExternals: false,
		},
		images: {
			domains: [
				"firebasestorage.googleapis.com",
				"static.toiimg.com",
				"oaidalleapiprodscus.blob.core.windows.net",
				"picsum.photos",
			],
		},
		webpack: (config) => {
			config.node = {
				fs: "empty",
				child_process: "empty",
				net: "empty",
				dns: "empty",
				tls: "empty",
			};
			return config;
		},
		...withBundleAnalyzer({}),
	};
};
