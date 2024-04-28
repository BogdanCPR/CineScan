import Box from '@mui/material/Box';
import UsersDataGrid from '../components/common/UsersDataGrid';

export default function AdminPage() {
  return (
    <Box sx={{ height: 400, width: '100%', position:"relative", marginTop:"10vh"}}>
      <UsersDataGrid/>
    </Box>
  );
}