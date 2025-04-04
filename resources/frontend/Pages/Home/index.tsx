import { memo } from "react";
import "@/Pages/Home/Home.less";
import { Outlet, useMatch, useNavigate } from "react-router-dom";
import { Category } from "@/Data/Interfaces/Navigation";
import Icon, { IconWeight } from "@/Components/Icon/index";
import { AppShell, Flex, Group, Image, Text, Tooltip, UnstyledButton } from "@mantine/core";
import UserContextMenu from "@/Components/UserContextMenu/index";
import AclLogo from "../../Images/squadacl-logo.png";

interface ICategoryItem {
	icon: string;
	label: string;
	route: string;
}

const iconMap: Record<Category, ICategoryItem> = {
	[ Category.DASHBOARD ]: {
		icon: "gauge",
		label: "Dashboard",
		route: ""
	},
	[ Category.ORGANIZATIONS ]: {
		icon: "building",
		label: "Organizations",
		route: "/organizations"
	},
	[ Category.SERVERS ]: {
		icon: "server",
		label: "Servers",
		route: "/servers"
	},
	[ Category.WHITELIST ]: {
		icon: "ticket",
		label: "Whitelist",
		route: "/whitelist"
	},
	[ Category.USERS ]: {
		icon: "users",
		label: "Users",
		route: "/users"
	},
	[ Category.SETTINGS ]: {
		icon: "cog",
		label: "Settings",
		route: "/settings"
	}
};

export default memo(function Home() {
	const navigate = useNavigate();
	const routeMatch = useMatch("/:currentCategory");

	const renderCategories = (category: Category) => {
		const currentCategory = iconMap[ category ];

		const handleClick = () => {
			navigate(currentCategory.route, { replace: true });
		};

		return (
			<Tooltip
				label={ currentCategory.label }
				position="right"
				withArrow
				transitionProps={ { duration: 0 } }
				key={ currentCategory.label }
			>
				<UnstyledButton
					className="main-link"
					onClick={ handleClick }
					data-active={ category === routeMatch?.params.currentCategory || undefined }
				>
					<Icon name={ currentCategory.icon } weight={ IconWeight.SOLID } />
				</UnstyledButton>
			</Tooltip>
		)
	}

	return (
		<AppShell header={ { height: 60 } } navbar={ { width: 74, breakpoint: "sm" } } padding="lg">
			<AppShell.Header className="sacl-shell-header">
				<Group flex={ 1 } px="md">
					<Group>
						<Image src={ AclLogo } alt="squadacl" height={ 48 } width={ 48 } />
					</Group>
					<Flex ml="auto" justify="flex-end" gap="md" align="center">
						<UserContextMenu />
					</Flex>
				</Group>
			</AppShell.Header>
			<AppShell.Navbar p="md">
				{ Object.values(Category).map(renderCategories) }
			</AppShell.Navbar>
			<AppShell.Main>
				<Outlet />
			</AppShell.Main>
		</AppShell>
	)
});