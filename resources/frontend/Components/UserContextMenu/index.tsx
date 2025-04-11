import { logoutUserAction, selectUser } from "@/Data/Redux/Slices/User";
import { useAppDispatch, useAppSelector } from "@/Data/Redux/Store";
import { Menu, Text, UnstyledButton } from "@mantine/core";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/Components/Icon";

export default memo(function UserContextMenu() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const logoutUser = () => dispatch(logoutUserAction());
	const loggedInUser = useAppSelector(selectUser);

	return (
		<Menu shadow="md" width={ 200 }>
			<Menu.Target>
				<UnstyledButton>
					<Text size="xs" fw="bold">{ loggedInUser?.email }</Text>
				</UnstyledButton>
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Label>Application</Menu.Label>
				<Menu.Item
					leftSection={ <Icon name="cog" /> }
					onClick={ () => navigate("settings", { replace: true }) }
				>
					Settings
				</Menu.Item>
				<Menu.Divider />
				<Menu.Item
					color="red"
					leftSection={ <Icon name="right-from-bracket" /> }
					onClick={ logoutUser }
				>
					Logout
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	)
});
