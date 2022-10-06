import { Box } from "@mui/system";
import UserList from "../components/UserList";

const UserPage = () => {

    return(
        <Box sx={{ display: 'flex', flexDirection:'row'}}>
            <UserList/>
        </Box>
    )
}

export default UserPage;