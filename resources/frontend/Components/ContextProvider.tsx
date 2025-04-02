import { memo, StrictMode } from "react";
import { IWithChildren } from "@/Data/Interfaces/Global.js";
import { MantineProvider } from "@mantine/core";
import { baseTheme } from "@/Data/Utils/Theme.js";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/Data/Redux/Store.js";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/Data/Redux/Persist.js";

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
