import Icon, { IconSize } from "@/Components/Icon/index";
import OrganizationCard from "@/Components/Organizations/OrganizationCard";
import OrganizationModal from "@/Components/Organizations/OrganizationModal";
import PageLayout from "@/Components/PageLayout/index";
import { fetchOrganizationsAction, selectOrganizations } from "@/Data/Redux/Slices/Organization";
import { useAppDispatch, useAppSelector } from "@/Data/Redux/Store";
import { Grid, Stack, Text } from "@mantine/core";
import { memo, useEffect } from "react";

export default memo(function Organizations() {
	const dispatch = useAppDispatch();
	const organizations = useAppSelector(selectOrganizations);
	const noOrgsContent = (
		<Stack align="center">
			<Icon name="box-open" size={ IconSize.BIG } />
			<Text>Get started by creating an organization</Text>
		</Stack>
	);

	const renderOrganizations = () => {
		if (organizations.length === 0) {
			return noOrgsContent;
		}

		return (
			<Grid w="100%">
				{ organizations.map(org => (
					<Grid.Col span={ 4 }>
						<OrganizationCard organization={ org } />
					</Grid.Col>
				))}
			</Grid>
		);
	};

	useEffect(() => {
		dispatch(fetchOrganizationsAction());
	}, []);

	return (
		<PageLayout
			title="Organizations"
			subTitle="View all organizations."
			icon="building"
			titleRightContent={ <OrganizationModal /> }
		>
			{ renderOrganizations() }
		</PageLayout>
	);
});