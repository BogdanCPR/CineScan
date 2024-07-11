import { Box, Button,Divider } from '@mui/material';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import adminApi from '../../api/modules/admin.api';
import { setGlobalLoading } from '../../redux/features/globalLoadingSlice';
import { toast } from "react-toastify";
import Container from "../common/Container";

const UsersDataGrid = () => {
	const apiRef1 = useGridApiRef();
	const apiRef2 = useGridApiRef();
	const [rows, setRows] = useState([]);
	const [selectedUser, setSelectedUser] = useState([]);
	const [selectedUserId, setSelectedUserId] = useState([]);
	const [selectedReview, setSelectedReview] = useState([]);
	const [userReviews, setUserReviews] = useState([]);
	const columns = [
		{
		  field: 'id',
		  headerName: 'ID',
		  flex:1,					
		},
		{
		  field: 'displayName',
		  headerName: 'Display Name',
		  flex:1,
		  editable: true,
		},
		{
		  field: 'username',
		  headerName: 'Username',
		  flex:1,
		  editable: true,
		},
		{
		  field: 'accessLevel',
		  headerName: 'Access Level',
		  flex:1,
		  editable: true,
		}
	];
	const reviewColumns = [
		{
			field: 'id',
			headerName: 'ID',
			flex:1,
			editable: true,
		},
		{
			field: 'mediaType',
			headerName: 'Media Type',
			flex:1,
			editable: true,
		},
		{
		  field: 'mediaTitle',
		  headerName: 'Media Title',
		  flex:1,
		  editable: true,
		},
		{
		  field: 'createdAt',
		  headerName: 'Posted Date',
		  flex:1,
		  editable: true,		
		},
		{
		  field: 'content',
		  headerName: 'Review',
		  flex:1,
		  editable: true,
		}
	];
	useEffect(() => {
		setGlobalLoading(true);
		const getUsers = async () => {
			const { response, err } = await adminApi.getUsers();
			if (err) {
				console.log(err);
				return;
			}
			setRows(response);
		};
		getUsers();
		setGlobalLoading(false);
	}, []);

	useEffect(() => {
		setGlobalLoading(true);
		const getReviews = async () => {
		  const { response, err } = await adminApi.getReviews(selectedUserId);
		  if (err) {
			console.log(err);
			return;
		  }
		  setUserReviews(response);
		}
		getReviews();
		setGlobalLoading(false);
	  }, [selectedUserId])
	


	const promoteToAdmin = async () => {
		const { response, err } = await adminApi.updateUserAccessLevel(selectedUser, 'admin');
		if (err) {
			console.log(err);
			return;
		}
		// Update the local state to reflect the change
		apiRef1.current.updateRows([{ id: selectedUserId, accessLevel: 'admin' }]);
		toast.success("User promoted to admin successfully");
	  };
	  
	  const demoteToUser = async () => {
		const { response, err } = await adminApi.updateUserAccessLevel(selectedUser, 'user');
		if (err) {
			console.log(err);
			return;
		}
		// Update the local state to reflect the change
		apiRef1.current.updateRows([{ id: selectedUserId, accessLevel: 'user' }]);
		toast.success("User demoted to user successfully");
	  };

	  const removeUser = async () => {
		const { response, err } = await adminApi.removeUser(selectedUser);
		if (err) {
		  console.log(err);
		  return;
		}
		// Update the local state to reflect the change
		apiRef1.current.updateRows([{ id: selectedUserId, _action: 'delete' }]);
		toast.success("User deleted successfully");
	  };

	  const removeReview = async () => {
		console.log("reviewId: " + selectedReview);
		const { response, err } = await adminApi.removeReview(selectedReview);
		if (err) {
		  console.log(err);
		  return;
		}
		// Update the local state to reflect the change
		apiRef2.current.updateRows([{ id: selectedReview, _action: 'delete' }]);
		toast.success("Review deleted successfully");
	  };

	  
	  return (
		<Box sx={{ width: '100%', position:"relative", marginTop:"10vh"}}>
		  <Container header={"Users and reviews"}/>
		  <Divider />
		  <DataGrid
		  	apiRef={apiRef1}
		    sx={{ height: 400, width: '100%', marginTop:"2vh"}}
			rows={rows}
			columns={columns}
			onRowSelectionModelChange={(newSelection) => {
			  const selectedUsername = newSelection.map((id) => {
				const row = rows.find(row => row.id === id);
				return row ? row.username : null;
			  });
			  const selectedUserId = newSelection.map((id) => {
				const row = rows.find(row => row.id === id);
				return row ? row.id : null;
			  });
			  setSelectedUser(selectedUsername);
			  setSelectedUserId(selectedUserId);
			}}
			selectionModel={selectedUser.map(user => user.username)}
		  />
		  <Button onClick={() => promoteToAdmin()}>Promote</Button>
		  <Button onClick={() => demoteToUser()}>Demote</Button>
		  <Button onClick={() => removeUser()}>Delete User</Button> 
		  <Box sx={{ width: '100%', position:"relative", marginTop:"5vh"}}>
			<DataGrid
			  apiRef={apiRef2}
			  sx={{ height: 400, width: '100%', marginTop:"2vh"}}
			  rows={userReviews}
			  columns={reviewColumns}
			  onRowSelectionModelChange={(newSelection) => {
				const review = newSelection.map((id) => {
				  const row = userReviews.find(row => row.id === id);
				  return row ? row.id : null;
				});
				setSelectedReview(review);
			  }}
			  selectionModel={selectedUser.map(user => user.id)}
			/>
			<Button onClick={() => removeReview()}>Delete Review</Button>
		  </Box>
		</Box>
	)
}

export default UsersDataGrid