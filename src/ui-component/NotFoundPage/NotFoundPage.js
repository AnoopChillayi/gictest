import { Box, Button, Container, Typography } from '@mui/material';
import Img from 'assets/images/404.png';

const NotFoundPage = () => {
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
                <Typography variant="h1">500</Typography>
                <Typography variant="h1"> Internal server error</Typography>
                <Typography my={1} variant="h5">
                    We are currently trying to fix the problem.
                </Typography>
                <Button variant="outlined" onClick={() => window.location.reload()}>
                    Reload Page
                </Button>
            </Box>
        </Container>
    );
};
export default NotFoundPage;
