import { memo } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { IWithChildren } from "@/Data/Interfaces/Global";
import { useAppSelector } from "@/Data/Redux/Store";
import { selectUser } from "@/Data/Redux/Slices/User";

interface IPrivateRouteProps extends Partial<IWithChildren> {
	hasPermission?: boolean;
	redirectTo?: string;
}

export default memo(function PrivateRoute({ children, hasPermission = true, redirectTo = "/login" }: IPrivateRouteProps) {
	const loggedInUser = useAppSelector(selectUser);

	if (!loggedInUser || !loggedInUser.token || !hasPermission) {
		return <Navigate to={ redirectTo } />;
	}

	return children ?? <Outlet />;
});
