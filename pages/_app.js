import React, { useEffect } from "react";
import { MantineProvider } from "@mantine/core";
import { theme } from "utils/theme";
import { ThemeProvider } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { QueryClientProvider, QueryClient } from "react-query";
import nprogress from "nprogress";
import "react-toastify/dist/ReactToastify.css";
import "tailwindcss/tailwind.css";
import "../styles.css";
import "../nprogress.css";

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				refetchOnMount: false,
				staleTime: 24 * 60 * 60 * 1000,
			},
		},
	});
	useEffect(() => {
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);

	useEffect(() => {
		const handleStart = () => {
			nprogress.start();
		};
		const handleStop = () => {
			nprogress.done();
		};

		router.events.on("routeChangeStart", handleStart);
		router.events.on("routeChangeComplete", handleStop);
		router.events.on("routeChangeError", handleStop);

		return () => {
			router.events.off("routeChangeStart", handleStart);
			router.events.off("routeChangeComplete", handleStop);
			router.events.off("routeChangeError", handleStop);
		};
	}, [router.events]);

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<MantineProvider withGlobalStyles withNormalizeCSS>
					<Component {...pageProps} />
				</MantineProvider>
			</ThemeProvider>
		</QueryClientProvider>
	);
}

export default MyApp;
