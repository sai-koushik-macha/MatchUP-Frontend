import React ,{ useState , useEffect} from 'react';
// material
import { Container, Stack, Typography } from '@material-ui/core';
// components
import {useNavigate} from 'react-router-dom';
import Page from '../components/Page';
import {
  ProductCard,
  UserProductCard,
  ProductCartWidget
} from '../components/_dashboard/products';
import { Grid ,Button} from '@material-ui/core';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import {GetProducts,CreateProduct,GetAllProducts} from '../APIcalls/Products'

import searchFill from '@iconify/icons-eva/search-fill';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { Box, InputAdornment } from '@material-ui/core';
import Pagination from '@mui/material/Pagination';
import { styled } from '@material-ui/core/styles';
import Paper from '@mui/material/Paper';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
// ----------------------------------------------------------------------

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const RootStyle = styled('div')(({ theme }) => ({
  '& .MuiAutocomplete-root': {
    width: 200,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter
    }),
    '&.Mui-focused': {
      width: 240,
      '& .MuiAutocomplete-inputRoot': {
        boxShadow: theme.customShadows.z12
      }
    }
  },
  '& .MuiAutocomplete-inputRoot': {
    '& fieldset': {
      borderWidth: `1px !important`,
      borderColor: `${theme.palette.grey[500_32]} !important`
    }
  },
  '& .MuiAutocomplete-option': {
    '&:not(:last-child)': {
      borderBottom: `solid 1px ${theme.palette.divider}`
    }
  }
}));

const Input = styled('input')({
  display: 'none',
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: 'none !important'
}));


export default function EcommerceShop() {
  const [openDailog, setOpenDailog] = useState(false);

  const [productTitle,setProductTitle] = useState('');
  const [productPrice,setProductPrice] = useState(0);
  const [productAvailable,setProductAvailable] = useState(1);
  const [selectedProductImage, setSelectedProductImage] = useState(null);
  const [uploadedProductUrl, setUploadedProductUrl] = useState(null);
  const handleClose = () => {
    setSelectedProductImage(null);
    setUploadedProductUrl(null);
    setOpenDailog(false);
  };
    const dispatch = useDispatch();

    const [search, setSearch] = useState('');

    const Products = useSelector((state) => state.productsReducer);
    const [currPage ,setcurrPage] = useState(localStorage.getItem("PageNo") || 1);
    const [totalPages, setTotalPages] = useState(0);

    
  const [filteredProducts, setFilteredProducts] = useState(Products);

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

    const onSort = (e) => {
      e.preventDefault();
      var res = Object.keys(Products)
      // iterate over them and generate the array
      .map(function(k) {
        // generate the array element 
        return Products[k];
      });
      console.log(res);
      switch(e.target.value) {
        case "Ascending" : return dispatch({ 
          type : "SORT_POSTS_ASC",
          payload: res
        })
        case "Descending" : return dispatch({ 
          type : "SORT_POSTS_DESC",
          payload: res
        }) 
        case "SortByPrice" : return dispatch({ 
          type : "SORT_BY_PRICE",
          payload: res
        }) 
        default : break;
      }
    }

    useEffect(() => {
      if (selectedProductImage) {
        setUploadedProductUrl(URL.createObjectURL(selectedProductImage));
      }

      let pageId = window.location.pathname.split("/")[3];
      setcurrPage(pageId);

      // GetAllProducts()
      // .then(res => {
      //   setTotalPages(Math.ceil(res.data.length/12));
      // })

      GetProducts(pageId)
      .then((res => {
        console.log(res.data);
        dispatch({
          type: "FETCH_POST_REQUEST",
          payload: res.data.products
        })
      }))

      GetAllProducts()
      .then((res => {
        if(res){
        console.log(res.data);
        setTotalPages(Math.ceil(res.data.length/8));
        // dispatch({
        //   type: "FETCH_POST_REQUEST",
        //   payload: res.data
        // })
        }
      }))

      if (search) {
        console.log(search);
        const reqData = Object.values(Products).map((product) => {
          if( product.name.toLowerCase().indexOf(search.toLowerCase()) >= 0 ) {
            return product;
          };
          return null
        });
        setFilteredProducts(
          reqData.filter(val => {
            if (val) return true;
            return false;
          })
        );
      } else setFilteredProducts(Products);

      console.log(Products)
    }, [search,selectedProductImage]);
    let sellerid = localStorage.getItem('userId');

    const SaveProduct = (e) => {
      if(productTitle && productPrice && productPrice > 0 && productAvailable > 0){
        CreateProduct(productAvailable,productTitle, productPrice, selectedProductImage)
        .then((res) => {
            console.log(res);
            switch(res.status){
              case 200 : {setSnackMsg("Successfully created product");setSeverity("success");};break;
              case 201 : {setSnackMsg("Successfully created product");setSeverity("success");};break;
              case 401 : {setSnackMsg("Error creating product");setSeverity("warning")};break;
              case 500 : {setSnackMsg("Internal Server Error");setSeverity("error")};break;
              default : {setSnackMsg("Internal Server Error");setSeverity("error")};break;
            }
            setOpenSnack(true);
            
        })
        setOpenDailog(false);
      }
    }
 
    

    const handlePageChange = (event, value) => {
      event.preventDefault();
      setcurrPage(value);
      window.location.href = `/dashboard/products/${value}`
    };

  return (
    <Page title="Products">
      <Container>
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
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>
        <Button
            type="button"
            variant="contained"
            onClick={() => {setOpenDailog(true)}}
            startIcon={<Icon icon={plusFill} />}
          >
            Sell Product
          </Button>
          <br /><br />
          <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <RootStyle>
                <TextField
                  placeholder="Search Product..."
                  onChange={(e) => setSearch(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <>
                        <InputAdornment position="start">
                          <Box
                            component={Icon}
                            icon={searchFill}
                            sx={{
                              ml: 1,
                              width: 20,
                              height: 20,
                              color: 'text.disabled'
                            }}
                          />
                        </InputAdornment>
                      </>
                    )
                  }}
                />
          </RootStyle>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          onChange={(e) => onSort(e)}
          autoWidth
          label="Sort"
        >
            <MenuItem key="ascending" value="Ascending">
              Sort by A to Z
              </MenuItem>
              <MenuItem key="descending" value="Descending">
              Sort by Z to A
              </MenuItem>
              <MenuItem key="SortByPrice" value="SortByPrice">
              Sort by Price
              </MenuItem>
        </Select>
      </FormControl>

        </Stack>
      <Dialog open={openDailog}>
        <DialogTitle>Sell Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Sell Products by sharing about their product and the price you want to sell it at.
          </DialogContentText>
          <TextField
            required
            margin="dense"
            id="name"
            label="Product Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setProductTitle(e.target.value)}
          />
          <TextField
            required
            margin="dense"
            id="name"
            label="Price (in $)"
            type="number"
            fullWidth
            variant="standard"
            InputProps={{
              inputProps: {
                type: 'number',
                max: 10000000, min: 1 
              },
            }}
            onChange={(e) => setProductPrice(e.target.value)}
          />
          <TextField
            required
            margin="dense"
            id="name"
            label="Available in Stock"
            type="number"
            fullWidth
            variant="standard"
            InputProps={{
              inputProps: {
                type: 'number',
                max: 100, min: 1 
              },
            }}
            onChange={(e) => setProductAvailable(e.target.value)}
          />
          <br /><br />
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
              <Item>
                <label htmlFor="contained-button-file">
                  <Input accept="image/*" id="contained-button-file" multiple type="file"  onChange={e => setSelectedProductImage(e.target.files[0])}/>
                  <Button variant="contained" component="span">
                    Upload Image
                  </Button>
                </label>
              </Item>
            </Grid>
            <Grid item xs={12}>
              <Item>
                {uploadedProductUrl && selectedProductImage && (
                  <Box mt={2}>
                    <img src={uploadedProductUrl} alt={selectedProductImage.name} height="300px" />
                  </Box>
                )}
              </Item>
            </Grid>
          </Grid>
     

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={(e) => SaveProduct(e)}>Save</Button>
        </DialogActions>
      </Dialog>
        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
        </Stack>

        <Grid container spacing={3}>
          { Products.length > 0 ?
            (
              filteredProducts.length > 0 ? Object.keys(filteredProducts).map(function(key, index) {
              return <Grid key={filteredProducts[key]._id} item xs={12} sm={6} md={3}>
                {/* {console.log(filteredProducts[key].sellerUserId +"  "+sellerid)} */}
                     {(filteredProducts[key].sellerUserId === sellerid )? <UserProductCard  id={filteredProducts[key]._id} product={filteredProducts[key]} /> : <ProductCard  id={filteredProducts[key]._id} product={filteredProducts[key]} />}
                    </Grid>
              }) : Object.keys(Products).map(function(key, index) {
                return <Grid key={Products[key].sellerUserId} item xs={12} sm={6} md={3}>
                  {/* {console.log(Products[key].sellerUserId+ "  "+sellerid)} */}
                {(Products[key].sellerUserId === sellerid) ? <UserProductCard id={Products[key]._id} product={Products[key]} /> : <ProductCard id={Products[key]._id} product={Products[key]} /> }
              </Grid>
              }) 
            ) : (Products.length == 0) ? null : <div style={{ alignItems: "center", display: "flex", justifyContent: "center", height: "50vh", width: "100vw" }}>
            <CircularProgress />
          </div>
        }
        </Grid>
        <ProductCartWidget />
        <br /><br /> <br /><br />
       {Products.length === 0 ?null:<Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Pagination size="large" page={parseInt(currPage)} color="primary" count={totalPages} onChange={handlePageChange} />
        </Grid>}
      </Container>
    </Page>
  );
}
