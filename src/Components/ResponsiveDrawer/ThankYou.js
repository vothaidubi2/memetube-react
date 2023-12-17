import React, { useContext, useEffect } from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import NotFound from './NotFound'
import UsersAPI from '../../utils/UsersAPI';
import setCookie from '../Cookie/setCookie';
import getCookie from '../Cookie/getCookie';
const ThankYou = () => {
    let [params] = useSearchParams();
    useEffect(()=>{
        const updateBalance = async()=>{
            const data = await UsersAPI.updateBalance(`/depositmoney?amount=${params.get('amount')}&iduser=${params.get('extraData')}`)
        }
        if(params.get('amount') && params.get('extraData')){
            updateBalance()
        }
    },[])
    if(!params.get('amount')){
        return <NotFound />
    }
    else return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h1" align="center">
                        Successfully!!!
                    </Typography>
                    <Typography variant="h5" align="center">
                        Your transaction has been recorded.
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button component={Link} to="/studio/home" variant="contained" color="primary">
                        Go back
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ThankYou;
