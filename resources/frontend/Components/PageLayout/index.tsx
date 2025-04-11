import { Group, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { memo, ReactNode } from "react";
import Icon from "@/Components/Icon";
import { IWithChildren } from "@/Data/Interfaces/Global";

interface IPageLayoutProps extends IWithChildren {
	title: string;
	subTitle: string;
	icon: string;
	titleRightContent?: ReactNode;
}

export default memo(function PageLayout({ title, subTitle, icon, children, titleRightContent }: IPageLayoutProps) {
	return (
		<Stack align="center" mx="lg">
			<Group h={ 90 } w="100%">
				<ThemeIcon color="cyan" radius="lg" size="xl">
					<Icon name={ icon } />
				</ThemeIcon>
				<Stack align="flex-start" gap={ 0 }>
					<Title fw={ 700 }>{ title }</Title>
					<Text size="xs" c="#D3D3D3" ml={ 10 }>{ subTitle }</Text>
				</Stack>
				<Stack ml="auto">
					{ titleRightContent }
				</Stack>
			</Group>
			<Stack justify="center" w="75%" py="xl">
				{ children }
			</Stack>
		</Stack>
	);
});
