

import { useNavigate } from "react-router-dom";

import { Button, Stack, Typography } from "@mui/material";
import RtlProvider from "../components/common/RtlProvider";




import NotFoundIllustration from "../assets/404.svg?react";


const NotFoundPage: React.FC = () => {

	const navigate = useNavigate();
	//const theme = useTheme();

	return (
		<Stack
			alignItems="center"
			justifyContent="center"
			gap={3}
			sx={{
				width: "100%",
				height: "100%",
			}}
		>
			<NotFoundIllustration
				style={{
					maxHeight: "500px",
				}}
			/>
			<RtlProvider>
				<Typography
					align="center"
					color="info"
					variant="h5"
				>
					صفحه مورد نظر شما یافت نشد!
				</Typography>
			</RtlProvider>
			<Button
				variant="contained"
				size="large"
				onClick={() => {
					navigate("/");
				}}
				color="info"
			>
				"ورود به سامانه"
			</Button>
		</Stack>
	);
};

export default NotFoundPage;
