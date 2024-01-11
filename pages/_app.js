import React, { useEffect } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import "tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";
import { QueryClientProvider, QueryClient } from "react-query";
import "../styles.css";
import { theme } from "utils/theme";
import { MantineProvider } from "@mantine/core";

function MyApp({ Component, pageProps }) {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				refetchOnMount: false,
				staleTime: 24 * 60 * 60 * 1000, // in milliseconds
			},
		},
	});
	useEffect(() => {
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);

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
