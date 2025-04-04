import { memo, StrictMode } from "react";
import { IWithChildren } from "@/Data/Interfaces/Global";
import { MantineProvider } from "@mantine/core";
import { baseTheme } from "@/Data/Utils/Theme";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/Data/Redux/Store";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/Data/Redux/Persist";

export default memo(function ContextProvider({ children }: IWithChildren) {
	return (
		<StrictMode>
			<MantineProvider defaultColorScheme="dark" theme={ baseTheme }>
				<Provider store={ store }>
					<PersistGate loading={ null } persistor={ persistor }>
						<BrowserRouter>
							{ children }
						</BrowserRouter>
					</PersistGate>
				</Provider>
			</MantineProvider>
		</StrictMode>
	);
});
