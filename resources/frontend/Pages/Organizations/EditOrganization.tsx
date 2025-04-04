import Icon, { IconSize } from "@/Components/Icon/index";
import OrganizationModal from "@/Components/Organizations/OrganizationModal";
import PageLayout from "@/Components/PageLayout/index";
import WhitelistModal from "@/Components/Whitelist/WhitelistModal";
import { selectOrganizationById } from "@/Data/Redux/Slices/Organization";
import { selectUser } from "@/Data/Redux/Slices/User";
import { fetchWhitelistsAction, selectWhitelists } from "@/Data/Redux/Slices/Whitelist";
import { useAppDispatch, useAppSelector } from "@/Data/Redux/Store";
import { Divider, Group, Paper, ScrollArea, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { memo, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";

export default memo(function EditOrganization() {
	const { orgId } = useParams();
	const dispatch = useAppDispatch();
	const loggedInUser = useAppSelector(selectUser);
	const whitelists = useAppSelector(selectWhitelists);
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

	const renderWhitelistContent = () => {
		if (whitelists.length === 0) {
			return (
				<Stack align="center" mt={ 100 }>
					<Icon name="ticket" size={ IconSize.BIG } />
					<Text>Get started by adding someone to the Whitelist.</Text>
				</Stack>
			);
		}

		return whitelists.map(whitelist => (
			<Paper radius="md" p="md" mb="sm">
				<Group>
					<Text>{ whitelist.steamId } - { whitelist.username ?? "No Username" }</Text>
					<ThemeIcon color="red" variant="light" ml="auto">
						<Icon name="trash" />
					</ThemeIcon>
				</Group>
			</Paper>
		));
	}

	return (
		<PageLayout
			title="Edit Organization"
			subTitle={ `Editing Organization ${ selectedOrganization?.name }.` }
			icon="pencil"
			titleRightContent={ <OrganizationModal organization={ selectedOrganization } /> }
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
				<Paper bg="gray" radius="md" h="100%" w="100%" p="md">
					<ScrollArea h={ 500 }>
						{ renderWhitelistContent() }
					</ScrollArea>
				</Paper>
			</Stack>
		</PageLayout>
	);
});