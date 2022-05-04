import { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Avatar,
  } from '@mui/material';



const UserCard = (props) => {
    const  [user,setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

    return (
    <Card>
        <CardContent>
        <Box
            sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
            }}
        >
            <Avatar
            src={user.photoURL}
            sx={{
                height: 230,
                mb: 4,
                width: 230
            }}
            />
            <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
            >
            {user.firstName + ' ' + user.lastName}  
            </Typography>
            <Typography
            color="textSecondary"
            variant="body2"
            >
            {user.email}
            </Typography>
            <Typography
            color="textSecondary"
            variant="body2"
            >
            {user.DOB}
            </Typography>
            <Typography
            color="textSecondary"
            variant="body2"
            >
            {user.phone}
            </Typography>
        </Box>
        </CardContent>
    </Card>
    )
}

export default UserCard;