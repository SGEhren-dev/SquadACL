import PageLayout from "@/Components/PageLayout/index";
import { memo } from "react";

export default memo(function Servers() {
	return (
		<PageLayout title="Servers" subTitle="View your servers." icon="server">
			<h1>Servers</h1>
		</PageLayout>
	);
});