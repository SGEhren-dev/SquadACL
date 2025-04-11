import { IWhitelist } from "@/Data/Interfaces/Whitelist";
import { memo, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Button, Modal, Switch, TextInput, ThemeIcon } from "@mantine/core";
import { DatePickerInput, DateValue } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useAppDispatch } from "@/Data/Redux/Store";
import { createWhitelistAction, updateWhitelistAction } from "@/Data/Redux/Slices/Whitelist";
import { produce } from "immer";
import Icon from "@/Components/Icon";

interface IWhitelistModalProps {
	orgId: number;
	whitelist?: IWhitelist;
}

export default memo(function WhitelistModal({ orgId, whitelist }: IWhitelistModalProps) {
	const dispatch = useAppDispatch();
	const createWhitelist = (newWhitelist: Partial<IWhitelist>) => dispatch(createWhitelistAction({ orgId, ...newWhitelist }));
	const updateWhitelist = (updatedWhitelist: IWhitelist) => dispatch(updateWhitelistAction({ orgId, ...updatedWhitelist }));
	const [ expiryDate, setExpiryDate ] = useState<DateValue>(whitelist ? new Date(whitelist.expires) : null);
	const [ opened, { open, close } ] = useDisclosure(false);
	const actionIcon = whitelist ? "pencil" : "plus";
	const actionText = whitelist ? "Edit" : "Create";
	const whitelistForm = useForm({
		mode: "uncontrolled",
		initialValues: {
			steamId: whitelist?.steamId ?? "",
			expires: whitelist?.expires ?? new Date(),
			enabled: whitelist?.enabled ?? true
		},
		validate: {
			steamId: (value: string) => value.length === 17 ? null : "Whitelist must be exactly 17 characters long"
		}
	});

	const handleFormSubmit = ({ steamId, enabled }: IWhitelist) => {
		if (whitelist) {
			updateWhitelist(produce(whitelist, draft => {
				draft.enabled = enabled;
				draft.steamId = steamId;
				draft.expires = expiryDate?.toISOString() ?? ""
			}));
		} else {
			// This will be refactored once the user routes and RBAC is introduced
			createWhitelist({
				steamId,
				enabled,
				expires: expiryDate?.toISOString()
			});
		}

		whitelistForm.reset();
		setExpiryDate(null);
		close();
	};

	return (
		<>
			<Modal
				opened={ opened }
				onClose={ close }
				centered
				title={ `${ actionText } Whitelist` }
			>
				<form onSubmit={ whitelistForm.onSubmit(handleFormSubmit) }>
					<Switch
						label="Enabled"
						defaultChecked={ whitelist?.enabled ?? true }
						key={ whitelistForm.key("enabled") }
						{ ...whitelistForm.getInputProps("enabled", { type: "checkbox" }) }
					/>
					<TextInput
						withAsterisk
						label="Steam ID"
						key={ whitelistForm.key("steamId") }
						required
						mt={ 10 }
						{ ...whitelistForm.getInputProps("steamId") }
					/>
					<DatePickerInput
						label="Expires"
						onChange={ setExpiryDate }
						mt={ 10 }
						value={ expiryDate }
						defaultDate={ new Date() }
					/>
					<Button variant="filled" type="submit" mt={ 20 }>
						Submit
					</Button>
				</form>
			</Modal>
			<ThemeIcon
				className="theme-icon-button"
				onClick={ open }
				variant="light"
				ml="auto"
			>
				<Icon name={ actionIcon } />
			</ThemeIcon>
		</>
	);
});
