import { IOrganization } from "@/Data/Interfaces/Organization";
import { memo } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Button, Modal, NativeSelect, NumberInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAppDispatch, useAppSelector } from "@/Data/Redux/Store";
import { selectUser } from "@/Data/Redux/Slices/User";
import { createOrganizationAction, updateOrganizationAction } from "@/Data/Redux/Slices/Organization";
import { produce } from "immer";

interface IOrganizationModalProps {
	organization?: IOrganization;
}

export default memo(function OrganizationModal({ organization }: IOrganizationModalProps) {
	const dispatch = useAppDispatch();
	const createOrganization = (newOrganization: Partial<IOrganization>) => dispatch(createOrganizationAction(newOrganization));
	const updateOrganization = (updatedOrganization: IOrganization) => dispatch(updateOrganizationAction(updatedOrganization));
	const loggedInUser = useAppSelector(selectUser);
	const [ opened, { open, close } ] = useDisclosure(false);
	const actionText = organization ? "Edit" : "Create";
	const organizationForm = useForm({
		mode: "uncontrolled",
		initialValues: {
			name: organization?.name ?? "",
			owner: loggedInUser?.email,
			maxSlots: organization?.maxSlots ?? 0
		},
		validate: {
			name: (value: string) => value.length >= 3 && value.length <= 32 ? null : "Organization name must be at least 3 characters long",
			owner: (value: string) => !!value ? null : "Owner cannot be empty",
			maxSlots: (value: string) => +value >= 0 && +value <= 100 ? null : "Max Slots must be between 0 and 100"
		}
	});

	const handleFormSubmit = ({ name, maxSlots }: IOrganization) => {
		if (organization) {
			updateOrganization(produce(organization, draft => {
				draft.name = name;
				draft.maxSlots = +maxSlots;
			}))
		} else {
			// This will be refactored once the user routes and RBAC is introduced
			createOrganization({
				name,
				owner: loggedInUser?.id,
				maxSlots
			});
		}

		organizationForm.reset();
		close();
	};

	return (
		<>
			<Modal
				opened={ opened }
				onClose={ close }
				centered
				title={ `${ actionText } Organization` }
			>
				<form onSubmit={ organizationForm.onSubmit(handleFormSubmit) }>
					<TextInput
						withAsterisk
						label="Organization Name"
						key={ organizationForm.key("name") }
						required
						{ ...organizationForm.getInputProps("name") }
					/>
					<NativeSelect
						withAsterisk
						variant="filled"
						label="Owner"
						description="Owner of the organization"
						data={[ loggedInUser?.email ?? "" ]}
						key={ organizationForm.key("owner") }
						mt={ 10 }
						required
						{ ...organizationForm.getInputProps("owner") }
					/>
					<NumberInput
						withAsterisk
						label="Max Slots"
						key={ organizationForm.key("maxSlots") }
						mt={ 10 }
						min={ 0 }
						max={ 100 }
						required
						{ ...organizationForm.getInputProps("maxSlots") }
					/>
					<Button variant="filled" type="submit" mt={ 20 }>
						Submit
					</Button>
				</form>
			</Modal>
			<Button onClick={ open } variant="light">
				{ `${ actionText } Organization` }
			</Button>
		</>
	);
});
