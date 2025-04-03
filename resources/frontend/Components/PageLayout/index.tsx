import { Group, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { memo } from "react";
import Icon from "../Icon/index.jsx";
import { IWithChildren } from "@/Data/Interfaces/Global.js";

interface IPageLayoutProps extends IWithChildren {
	title: string;
	subTitle: string;
	icon: string;
}

export default memo(function PageLayout({ title, subTitle, icon, children }: IPageLayoutProps) {
	return (
		<Stack align="center" mx="lg">
			<Group h={ 90 } w="100%">
				<ThemeIcon color="cyan" radius="lg" size="xl">
					<Icon name={ icon } />
				</ThemeIcon>
				<Stack align="flex-start" gap={ 0 }>
					<Title fw={ 700 }>{ title }</Title>
					<Text size="xs" c="#D3D3D3">{ subTitle }</Text>
				</Stack>
			</Group>
			<Group justify="center" w="75%">
				{ children }
			</Group>
		</Stack>
	);
});
