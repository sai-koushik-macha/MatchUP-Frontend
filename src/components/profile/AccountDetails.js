import React,{ useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';

import UpdateUserById from '../../APIcalls/User/UpdateUserById';

import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
// ----------------------------------------------------------------------

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const  AccountProfileDetails = (props) => {
  const  [user,setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [values, setValues] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    DOB: user.DOB
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  const [openSnack ,setOpenSnack] = useState(false);
  const [state, setState] = useState({
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal } = state;
  const [snackMsg, setSnackMsg] = useState("");
  const [severity,setSeverity] = useState("");
  
  const handleAlertClose = () => {
    setOpenSnack(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    UpdateUserById(user.id,values)
    .then((res) => {
      console.log(res);
      switch(res.status) {
        case 200 : {
          setSnackMsg(res.msg);setSeverity("success");          
          const curruser = {
            "id": res.user._id,
            "firstName": res.user.firstName,
            "lastName": res.user.lastName,
            "email": res.user.email,
            "DOB": res.user.DOB,
            "phone": res.user.phone,
            "photoURL": res.user.profileImage,
          }
          localStorage.setItem("user",JSON.stringify(curruser));
        };break;
        case 401 : {setSnackMsg(res.msg);setSeverity("warning")};break;
        case 500 : {setSnackMsg("Error Updating User");setSeverity("error")};break;
        default : {setSnackMsg(res.msg);setSeverity("error")};break;
      }
      setOpenSnack(true);
    })
  }
  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      {...props}
    >
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={openSnack}
          onClose={handleAlertClose}
          autoHideDuration={4000}
          key={vertical + horizontal}
        >
           <Alert onClose={handleAlertClose} severity={severity} sx={{ width: '100%' }}>
              {snackMsg}
            </Alert>
        </Snackbar>
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="First name"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="tel"
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="DOB"
                name="DOB"
                type="date"
                onChange={handleChange}
                required
                value={values.DOB}
                variant="outlined"
              />
            </Grid>
       
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
            type="submit"
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AccountProfileDetails;