import PageLayout from "@/Components/PageLayout/index.jsx";
import { memo } from "react";

export default memo(function Organizations() {
	return (
		<PageLayout title="Organizations" subTitle="View all organizations." icon="building">
			<h1>Organizations</h1>
		</PageLayout>
	);
});