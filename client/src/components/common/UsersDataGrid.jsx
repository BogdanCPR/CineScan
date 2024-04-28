import { Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import adminApi from '../../api/modules/admin.api';
import { setGlobalLoading } from '../../redux/features/globalLoadingSlice';


const UsersDataGrid = () => {

	const [rows, setRows] = useState([]);
	const [selectedUser, setSelectedUser] = useState([]);
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
		  console.log("SELECTED USER ID: ", selectedUser);
		  const { response, err } = await adminApi.getReviews(selectedUser);
		  if (err) {
			console.log(err);
			return;
		  }
		  setUserReviews(response);
		}
		getReviews();
		setGlobalLoading(false);
	  }, [selectedUser])
	


	const promoteToAdmin = async (username) => {
		const { response, err } = await adminApi.updateUserAccessLevel(username, 'admin');
		if (err) {
		  console.log(err);
		  return;
		}
		// Update the local state to reflect the change
		setRows(prevRows => prevRows.map(row => row.username === username ? { ...row, accessLevel: 'admin' } : row));
	  };
	  
	  const demoteToUser = async (username) => {
		const { response, err } = await adminApi.updateUserAccessLevel(username, 'user');
		if (err) {
		  console.log(err);
		  return;
		}
		// Update the local state to reflect the change
		setRows(prevRows => prevRows.map(row => row.username === username ? { ...row, accessLevel: 'user' } : row));
	  };

	  const removeUser = async (username) => {
		const { response, err } = await adminApi.removeUser(username);
		if (err) {
		  console.log(err);
		  return;
		}
		// Update the local state to reflect the change
		setRows(prevRows => prevRows.filter(row => row.username !== username));
	  };

	  const removeReview = async (reviewId) => {};

	  
	  return (
		<Box sx={{ width: '100%', position:"relative", marginTop:"10vh"}}>
		  <DataGrid
			rows={rows}
			columns={columns}
			onRowSelectionModelChange={(newSelection) => {
			  const selectedUsername = newSelection.map((id) => {
				const row = rows.find(row => row.id === id);
				return row ? row.id : null;
			  });
			  setSelectedUser(selectedUsername);
			}}
			selectionModel={selectedUser.map(user => user.id)}
		  />
		  <Button onClick={() => promoteToAdmin(selectedUser)}>Promote</Button>
		  <Button onClick={() => demoteToUser(selectedUser)}>Demote</Button>
		  <Button onClick={() => removeUser(selectedUser)}>Delete User</Button> {/* Added Delete User button */}
		  <Box sx={{ width: '100%', position:"relative", marginTop:"5vh"}}>
			<DataGrid
			  rows={userReviews}
			  columns={reviewColumns}
			  onRowSelectionModelChange={(newSelection) => {
				const selectedReview = newSelection.map((id) => {
				  const row = rows.find(row => row.id === id);
				  return row ? row.id : null;
				});
				setSelectedReview(selectedReview);
			  }}
			  selectionModel={selectedUser.map(user => user.id)}
			/>
			<Button onClick={() => removeReview(selectedReview)}>Delete Review</Button> {/* Added Delete Review button */}
		  </Box>
		</Box>
	)
}

export default UsersDataGrid