import { Box } from "@mui/system";
import VisitorList from '../components/VisitorList';

const VisitorPage = () => {

    return(
        <Box sx={{ display: 'flex', flexDirection:'row'}}>
            <VisitorList/>
        </Box>
    )
}

export default VisitorPage