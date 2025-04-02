import "@/Styles/index.less";
import Router from "@/Components/Router.jsx";
import { createRoot } from "react-dom/client";
import { initFontAwesome } from "@/FontAwesome.js";
import ContextProvider from "@/Components/ContextProvider.jsx";

initFontAwesome();

const appRoot = (
	<ContextProvider>
		<Router />
	</ContextProvider>
);

createRoot(document.getElementById("root")!).render(appRoot);
