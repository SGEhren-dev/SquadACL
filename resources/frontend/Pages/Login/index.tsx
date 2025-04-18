import { ILoginUserPayload } from "@/Data/Interfaces/User";
import { loginUserAction, selectUser } from "@/Data/Redux/Slices/User";
import { useAppDispatch, useAppSelector } from "@/Data/Redux/Store";
import { Button, Center, Image, Paper, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AclLogo from "../../Images/squadacl-logo.png";

export default memo(function Login() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const loggedInUser = useAppSelector(selectUser);
	const loginForm = useForm({
		mode: "uncontrolled",
		initialValues: {
			email: "",
			password: ""
		},
		validate: {
			email: (value: string) => (/^\S+@\S+$/.test(value) ? null : "Invalid email")
		}
	});

	const handleFormSubmit = (values: ILoginUserPayload) => {
		dispatch(loginUserAction(values));
	};

	useEffect(() => {
		if (loggedInUser && loggedInUser.token) {
			navigate("/");
		}
	}, [ loggedInUser, navigate ]);

	return (
		<Center h="100vh" w="100vw">
			<Paper shadow="xs" p="xl" w="500" bg="dark" radius="md">
				<form onSubmit={ loginForm.onSubmit(handleFormSubmit) }>
					<Stack align="center">
						<Image src={ AclLogo } alt="squadacl" w={ 164 } />
						<TextInput
							withAsterisk
							label="Email"
							key={ loginForm.key("email") }
							w="75%"
							{ ...loginForm.getInputProps("email") }
						/>
						<TextInput
							withAsterisk
							label="Password"
							key={ loginForm.key("password") }
							type="password"
							w="75%"
							{ ...loginForm.getInputProps("password") }
						/>
						<Button type="submit" w="75%">Login</Button>
					</Stack>
				</form>
			</Paper>
		</Center>
	);
});
