import React from 'react';
import {useState} from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Icon } from '@iconify/react';
import { Box, Card, Link, Typography, Stack } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import buyIcon from '@iconify/icons-icons8/buy';

import { Button , TextField} from '@material-ui/core';
import Dialog from '@mui/material/Dialog';
import {AddProductToCart} from '../../../APIcalls/Products';
import {connect} from 'react-redux';
import {upadteCartItems} from '../../../redux/actions/cartActions';
import {RemoveFromCart} from '../../../APIcalls/Products'
// ----------------------------------------------------------------------
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
// ----------------------------------------------------------------------

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object
};

const InputNumStyle = {
  "& input[type=number]::-webkit-inner-spin-button,& input[type=number]::-webkit-outer-spin-button" : {"opacity" : "1"}
}

function ShopProductCard({ product ,...props }) {
  const { name, cover, price} = product;
  const {quantity} = props;
  const {id} = props;
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
  const handleRemoveCartItem = (e,id) => {
    e.preventDefault();
    let userId = localStorage.getItem('userId');
    RemoveFromCart(id,userId)
    .then((res) => {
      console.log(id)
      if(res){
        console.log(res);
        switch(res.status) {
          case 200 : {setSnackMsg("Successfully removed from cart");setSeverity("success");};break;
          case 401 : {setSnackMsg("Error removing to cart");setSeverity("warning")};break;
          case 500 : {setSnackMsg("Internal Server Error");setSeverity("error")};break;
          default : {setSnackMsg("Error removing to cart");setSeverity("error")};break;
        }
        setOpenSnack(true);
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }
  return (
    <Card>
          {/* <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={openSnack}
          onClose={handleAlertClose}
          autoHideDuration={4000}
          key={vertical + horizontal}
          style={{zIndex: "999999"}}
        >
           <Alert onClose={handleAlertClose} severity={severity} sx={{ width: '100%' }}>
              {snackMsg}
            </Alert>
        </Snackbar> */}
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <ProductImgStyle alt={name} src={cover} />
      </Box>
   
      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

   
        <Stack direction="row" alignItems="right" justifyContent="space-between">
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text',
              }}
            >
             Quantity :  {quantity}
            </Typography>
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="right" justifyContent="space-between">
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text',
              }}
            >
             Total Price :  {price*quantity} $
            </Typography>
          </Typography>
        </Stack>

        <Button type="button" color="error" variant="contained" onClick={(e) => handleRemoveCartItem(e,id)}>Remove from Cart</Button>
      
      </Stack>
      
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    cartItems : state.cartReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    upadteCartItems : (products) => {dispatch(upadteCartItems(products))}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ShopProductCard);