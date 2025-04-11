import { memo } from "react";
import Home from "@/Pages/Home";
import Login from "@/Pages/Login";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "@/Components/PrivateRoute";
import Servers from "@/Pages/Servers";
import Organizations from "@/Pages/Organizations";
import EditOrganization from "@/Pages/Organizations/EditOrganization";

export default memo(function Router() {
	const mainLayout = (
		<PrivateRoute>
			<Home />
		</PrivateRoute>
	);

	return (
		<Routes>
			<Route path="/" element={ mainLayout }>
				<Route index element={ <h1>Home</h1> } />
				<Route path="organizations" element={ <Organizations /> } />
				<Route path="organizations/:orgId" element={ <EditOrganization /> } />
				<Route path="servers" element={ <Servers /> } />
				<Route path="whitelist" element={ <h1>Whitelist</h1> } />
				<Route path="users" element={ <h1>Users</h1> } />
				<Route path="settings" element={ <h1>Settings</h1> } />
			</Route>
			<Route path="/login" element={ <Login /> } />
		</Routes>
	);
});
