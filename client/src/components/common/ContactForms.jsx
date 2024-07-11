import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import dayjs from "dayjs";
import { useState, useEffect } from 'react';
import { setGlobalLoading } from '../../redux/features/globalLoadingSlice';
import { toast } from "react-toastify";
import Container from "../common/Container";
import contactApi from "../../api/modules/contact.api";
import uiConfigs from "../../configs/ui.configs";
import BeenhereOutlinedIcon from '@mui/icons-material/BeenhereOutlined';

const ContactItem = ({ contact, onRemoved }) => {
	const [onRequest, setOnRequest] = useState(false);
	const onRemove = async () => {
		if (onRequest) return;
		setOnRequest(true);
		const { response, err } = await contactApi.removeContact({ contactId: contact.id });
		setOnRequest(false);

		if (err) toast.error(err.message);
		if (response) {
			toast.success("Remove contact success");
			onRemoved(contact.id);
		}
	}

	return (
		<Box sx={{
			position: "relative",
			display: "flex",
			flexDirection: { xs: "column", md: "row" },
			padding: 1,
			opacity: onRequest ? 0.6 : 1,
			"&:hover": { backgroundColor: "background.paper" }
		  }}>
			<Box>
				<Typography variant="h6" sx={{ ...uiConfigs.style.typoLines(1, "left") }}>{contact.subject}</Typography>
				<Stack spacing={1} direction={"row"}>
					<Typography variant="caption">{contact.name}</Typography>
					<Typography variant="caption">
						{dayjs(contact.createdAt).format("DD-MM-YYYY HH:mm:ss")}
					</Typography>
				</Stack>
				<Typography>{contact.message}</Typography>
			</Box>
			<LoadingButton
				variant="contained"
				color="success"
				sx={{
				position: { xs: "relative", md: "absolute" },
				right: { xs: 0, md: "10px" },
				marginTop: { xs: 2, md: 0 },
				width: "max-content"
				}}
				startIcon={<BeenhereOutlinedIcon />}
				loadingPosition="start"
				loading={onRequest}
				onClick={onRemove}
			>
				solved
			</LoadingButton>
		</Box>
	);
}


const ContactForms = () => {

	const [contacts, setContacts] = useState([]);


	const fetchContacts = async () => {
		setGlobalLoading(true);
		const { response, err } = await contactApi.getContacts();
		setGlobalLoading(false);
		console.log("CONTACTS", response.data)
		if (err) {
			toast.error(err.message);
			return;
		}

		setContacts(response);
		console.log(contacts);
	}

	useEffect(() => {
		fetchContacts();
	}, []);


  	return (
	<Box>
		<Container header={"Contact Forms"}/>
		<Divider />
		<Box sx={{ padding: 2 }}>
			<Stack spacing={2}>
				{contacts.map(contact => (
					<ContactItem key={contact.id} contact={contact} onRemoved={(contactId) => setContacts(contacts.filter(c => c.id !== contactId))} />
				))}
				<Divider sx={{
					display: { xs: "block", md: "none" }
				}} />
			</Stack>
		</Box>		
	</Box>
  )
}

export default ContactForms