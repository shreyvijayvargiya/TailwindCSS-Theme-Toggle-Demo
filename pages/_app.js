import React, { useEffect } from "react";
import { MantineProvider } from "@mantine/core";
import { theme } from "utils/theme";
import { ThemeProvider } from "@material-ui/core/styles";
import { QueryClientProvider, QueryClient } from "react-query";
import nprogress from "nprogress";
import "react-toastify/dist/ReactToastify.css";
import "tailwindcss/tailwind.css";
import "../styles.css";
import "../nprogress.css";
import 'swiper/css/bundle';

function MyApp({ Component, pageProps }) {
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
