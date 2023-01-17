import { Box, Container, Typography } from '@mui/material';

import Img from 'assets/images/404.png';

const UnAuthorizedPage = () => {
    return (
        <Container
            component="main"
            maxWidth="md"
            sx={{
                display: 'flex'
            }}
        >
            <Box sx={{ textAlign: 'center', margin: 'auto', padding: '4em' }}>
                <img src={Img} alt="404" width="256" height="225" />
                <Typography variant="h1">403</Typography>
                <Typography variant="h1">Unauthorized</Typography>
                <Typography my={1} variant="h5">
                    You don't have permisison to access this page, Please reachout to admin to know more.
                </Typography>
            </Box>
        </Container>
    );
};
export default UnAuthorizedPage;
