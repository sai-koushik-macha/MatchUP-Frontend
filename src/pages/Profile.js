import {useState} from 'react';
// material
import { Box, Grid ,Stack ,Container, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';
import { makeStyles } from '@mui/styles';


import Accountdetails from '../components/profile/AccountDetails';
import UserCard from '../components/profile/UserProfileCard';
// ----------------------------------------------------------------------
const useStyles = makeStyles(theme => ({
  wrapIcon: {
    verticalAlign: 'middle',
    display: 'inline-flex'
   }
}));

function Profile(...props) {
  const classes = useStyles();
  const [userId,setUserId] = useState(localStorage.getItem('userId') || null);
  console.log(userId)
  return (
    <Page title="Profile">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">User Profile</Typography>
          <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 5
            }}
           >
               {userId?  <Container maxWidth="lg">
                    <Grid
                    container
                    spacing={2}
                    >
                        <Grid
                        item
                        lg={4}
                        md={6}
                        xs={12}
                        >
                          <UserCard userId={userId}/>
                        </Grid>
                        <Grid
                            item
                            lg={8} 
                            md={6}
                            xs={12}
                        >
                            <Accountdetails />
                        </Grid>
                    </Grid>
            </Container> : null}
           
          </Box>
    
        </Box>
      </Container>
    </Page>
  );
}


export default Profile;