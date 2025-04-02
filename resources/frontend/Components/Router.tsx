import { memo } from "react";
import Home from "@/Pages/Home/index.jsx";
import Login from "@/Pages/Login/index.jsx";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "@/Components/PrivateRoute.jsx";
import Servers from "@/Pages/Servers/index.jsx";

export default memo(function Router() {
	const mainLayout = (
		<PrivateRoute>
			<div className="app-window">
				<Home />
			</div>
		</PrivateRoute>
	);

	return (
		<Routes>
			<Route path="/" element={ mainLayout }>
				<Route index element={ <h1>Home</h1> } />
				<Route path="servers" element={ <Servers /> } />
				<Route path="whitelist" element={ <h1>Whitelist</h1> } />
				<Route path="users" element={ <h1>Users</h1> } />
				<Route path="settings" element={ <h1>Settings</h1> } />
			</Route>
			<Route path="/login" element={ <Login /> } />
		</Routes>
	);
});
