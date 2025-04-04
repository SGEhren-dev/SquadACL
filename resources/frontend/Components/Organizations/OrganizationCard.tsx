import { IOrganization } from "@/Data/Interfaces/Organization";
import { selectUser } from "@/Data/Redux/Slices/User";
import { useAppSelector } from "@/Data/Redux/Store";
import { Button, Divider, Group, Paper, Stack, Text, Title } from "@mantine/core";
import { memo } from "react";
import Icon from "@/Components/Icon/index";
import { useNavigate } from "react-router-dom";

interface IOrganizationCardProps {
	organization: IOrganization;
}

export default memo(function OrganizationCard({ organization }: IOrganizationCardProps) {
	const navigate = useNavigate();
	const loggedInUser = useAppSelector(selectUser);

	const handleEditClick = () => {
		navigate(`/organizations/${ organization.id }`, { replace: true });
	};

	return (
		<Paper shadow="md" px="lg" py="sm" bg="dark">
			<Stack>
				<Group align="center">
					<Title size="xl">{ organization.name }</Title>
					<Text size="sm" ml="auto">{ loggedInUser?.id === organization.owner ? loggedInUser.email : '-' }</Text>
				</Group>
				<Divider />
				<Group align="center">
					<Text>0 / { organization.maxSlots }</Text>
					<Button variant="light" color="red" ml="auto">
						<Icon name="trash" />
					</Button>
					<Button variant="light" color="blue" onClick={ handleEditClick }>
						<Icon name="cog" />
					</Button>
				</Group>
			</Stack>
		</Paper>
	);
});
