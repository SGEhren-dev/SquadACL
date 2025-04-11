import Icon from "@/Components/Icon";
import OrganizationModal from "@/Components/Organizations/OrganizationModal";
import PageLayout from "@/Components/PageLayout";
import WhitelistModal from "@/Components/Whitelist/WhitelistModal";
import { selectOrganizationById } from "@/Data/Redux/Slices/Organization";
import { selectUser } from "@/Data/Redux/Slices/User";
import { deleteWhitelistAction, fetchWhitelistsAction, selectWhitelists } from "@/Data/Redux/Slices/Whitelist";
import { useAppDispatch, useAppSelector } from "@/Data/Redux/Store";
import { Badge, Button, Divider, Group, Paper, Stack, Table, Text, ThemeIcon, Title } from "@mantine/core";
import { memo, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export default memo(function EditOrganization() {
	const { orgId } = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const loggedInUser = useAppSelector(selectUser);
	const whitelists = useAppSelector(selectWhitelists);
	const deleteWhitelist = (id: number) => () => dispatch(deleteWhitelistAction({ orgId: +orgId!, whitelistId: id }));
	const selectedOrganization = useAppSelector((state) => selectOrganizationById(state, +orgId!));

	useEffect(() => {
		if (!selectedOrganization) {
			return;
		}

		dispatch(fetchWhitelistsAction(selectedOrganization.id));
	}, []);

	if (!selectedOrganization) {
		return <Navigate to="/organizations" replace />;
	}

	const tableData = whitelists.map(whitelist => {
		const { enabled, steamId, username } = whitelist;
		const badgeColor = enabled ? "green" : "red";
		const actions = (
			<>
				<WhitelistModal whitelist={ whitelist } orgId={ +orgId! } />
				<ThemeIcon
					className="theme-icon-button"
					color="red"
					variant="light"
					ml={ 10 }
					onClick={ deleteWhitelist(whitelist.id) }
				>
					<Icon name="trash" />
				</ThemeIcon>
			</>
		);

		return (
			<Table.Tr key={ whitelist.id }>
				<Table.Td>{ steamId }</Table.Td>
				<Table.Td>{ username ?? "—" }</Table.Td>
				<Table.Td>
					<Badge variant="light" color={ badgeColor }>{ enabled ? "Enabled" : "Disabled" }</Badge>
				</Table.Td>
				<Table.Td>{ actions }</Table.Td>
			</Table.Tr>
		);
	});

	const titleRightComponent = (
		<Group>
			<Button
				leftSection={ <Icon name="arrow-left" /> }
				variant="light"
				color="red"
				onClick={ () => navigate(-1) }
			>
				Back
			</Button>
			<OrganizationModal organization={ selectedOrganization } />
		</Group>
	);

	return (
		<PageLayout
			title="Edit Organization"
			subTitle={ `Editing Organization ${ selectedOrganization?.name }.` }
			icon="pencil"
			titleRightContent={ titleRightComponent }
		>
			<Group px="md">
				<Title>{ selectedOrganization.name }</Title>
				<Text ml="auto">{ loggedInUser?.email }</Text>
			</Group>
			<Divider />
			<Stack px="md">
				<Group px="lg">
					<Text fw="bold" mr="auto">Whitelist</Text>
					<WhitelistModal orgId={ selectedOrganization.id } />
				</Group>
				<Paper bg="dark" radius="md" h="100%" w="100%" p="md">
					<Table.ScrollContainer minWidth={ 500 }>
						<Table captionSide="bottom" stickyHeader>
							<Table.Thead>
								<Table.Tr>
									<Table.Th>Steam ID</Table.Th>
									<Table.Th>Username</Table.Th>
									<Table.Th></Table.Th>
									<Table.Th></Table.Th>
								</Table.Tr>
							</Table.Thead>
							<Table.Tbody>
								{ tableData }
							</Table.Tbody>
							<Table.Caption>
								All Whitelists
							</Table.Caption>
						</Table>
					</Table.ScrollContainer>
				</Paper>
			</Stack>
		</PageLayout>
	);
});