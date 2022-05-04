import * as Yup from 'yup';
import React , { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import {SignUp} from '../../../APIcalls/Auth'

import { connect } from 'react-redux';
import {postUser} from '../../../redux/actions/userActions';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
  display: 'none',
});
// ----------------------------------------------------------------------

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function RegisterForm(props) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [openSnack ,setOpenSnack] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [severity,setSeverity] = useState("");

  const handleClose = () => {
    setOpenSnack(false);
  };
  

  const [state, setState] = useState({
    vertical: 'top',
    horizontal: 'center',
  });
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const { vertical, horizontal } = state;


  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().required('Confirm Password is required'),
    dob: Yup.string().required('DOB is required'),
    phone: Yup.string().required('Phone Number is required'),
  });
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword:'',
      dob:'',
      phone:''
    },
    validationSchema: RegisterSchema,
    onSubmit: (values, actions) => {
      const user = {
        "firstName": values.firstName,
        "lastName": values.lastName,
        "email": values.email,
        "password": values.password,
        "confirmPassword":values.confirmPassword,
        "DOB": values.dob,
        "phone": values.phone,
        "file" : selectedProfileImage,
        "products" : [],
        "blogs" : [],
        "cartProducts" : [],
        "favouriteProducts" : [],
        "favouriteBlogs" : [],
      }
      SignUp(user)
      .then((res) => {
        console.log(res);
        if(res.status === 200){
          const curruser = {
            "id": res.user._id,
            "firstName": res.user.firstName,
            "lastName": res.user.lastName,
            "email": res.user.email,
            "DOB": res.user.DOB,
            "phone": res.user.phone,
            "photoURL": res.user.profileImage,
          }
          console.log(curruser);
          localStorage.setItem("user", JSON.stringify(curruser));
          props.postUser(user);
          localStorage.setItem("userId", res.user._id);
          localStorage.setItem("PageNo",1)
          setSnackMsg(res.msg);setSeverity("success");
          navigate('/login ', { replace: true });
        }
        else{
          console.log(res)
          switch(res.status){
            case 401 : {setSnackMsg(res.msg);setSeverity("error")};break;
            case 404 : {setSnackMsg(res.msg);setSeverity("error")};break;
            case 422 : {setSnackMsg(res.msg);setSeverity("error")};break;
            case 500 : {setSnackMsg(res.msg);setSeverity("error")};break;
            default : console.log(res);
          }
          setOpenSnack(true);
        }
        actions.setSubmitting(false);
      })
      .catch(err=>{
        console.log(err)
      })
    }
  });

  const { errors, touched,values, handleSubmit, isSubmitting, getFieldProps } = formik;


  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={openSnack}
          onClose={handleClose}
          autoHideDuration={4000}
          key={vertical + horizontal}
        >
           <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
              {snackMsg}
            </Alert>
        </Snackbar>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <TextField
            fullWidth
            autoComplete="confirm-password"
            type={showConfirmPassword ? 'text' : 'password'}
            label="confirmPassword"
            {...getFieldProps('confirmPassword')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowConfirmPassword((prev) => !prev)}>
                    <Icon icon={showConfirmPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
          />

          <TextField
              fullWidth
              id="phone"
              label="Phone"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              {...getFieldProps('phone')}
              error={Boolean(touched.phone && errors.phone)}
              helperText={touched.phone && errors.phone}
          />
          <TextField
              fullWidth
              id="date"
              label="DOB"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              {...getFieldProps('dob')}
              error={Boolean(touched.dob && errors.dob)}
              helperText={touched.dob && errors.dob}
          />

          <label htmlFor="icon-button-file">
            <Input accept="image/*" id="icon-button-file" type="file" name="file" required onChange={(e) => setSelectedProfileImage(e.target.files[0])}/>
            <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
            
            <span>{(selectedProfileImage) ? selectedProfileImage.name : <label for="icon-button-file">
              Upload Profile Picture
            </label>}</span>
          </label>
      
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
const mapStateToProps = (state) => {
  return {
    user : state.userReducer.user
  } 
}

const mapDispatchToProps = (dispatch)=>{
  return {
    postUser : (user)=>{dispatch(postUser(user))}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(RegisterForm);