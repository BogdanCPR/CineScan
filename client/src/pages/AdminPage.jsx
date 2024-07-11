import React from 'react';
import Box from '@mui/material/Box';
import UsersDataGrid from '../components/common/UsersDataGrid';
import adminApi from '../api/modules/admin.api';
import { setGlobalLoading } from '../redux/features/globalLoadingSlice';
import Unauthorized from './Unauthorized';
import ContactForms from '../components/common/ContactForms';

async function fetchUserData() {
  setGlobalLoading(true);
  const { response, err } = await adminApi.getUserAccessLevel();
  console.log("USER ACCESS LEVEL: ", response)
  setGlobalLoading(false);
  if (err) {
    console.error(err);
    return null;
  }
  return response;
}

export default function AdminPage() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    fetchUserData().then(setUser);
  }, []);

  console.log(user);
  if (user !== 'admin') {
    return <Unauthorized />;
  }

  return (
    <Box sx={{ width: '100%', position:"relative", marginTop:"10vh"}}>
      <UsersDataGrid/>
      <ContactForms/>
    </Box>
  );
}