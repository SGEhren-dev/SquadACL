import "@/Styles/index.less";
import Router from "@/Components/Router";
import { createRoot } from "react-dom/client";
import { initFontAwesome } from "@/FontAwesome";
import ContextProvider from "@/Components/ContextProvider";

initFontAwesome();

const appRoot = (
	<ContextProvider>
		<Router />
	</ContextProvider>
);

createRoot(document.getElementById("root")!).render(appRoot);
