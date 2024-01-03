import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import './UserList.scss'

const UserList = () => {


    return (
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
            <List sx={{ width: "100%", bgcolor: "background.paper", position: "relative", overflow: "auto", height: 240, }}>
                <ListItem>
                    <Avatar sx={{ bgcolor: deepOrange[500], marginRight: "10px" }} src="/broken-image.jpg">K</Avatar>
                    <ListItemText primary={"Lê Văn Kiên"} />
                </ListItem>
                <ListItem>
                    <Avatar sx={{ bgcolor: deepOrange[500], marginRight: "10px" }} src="/broken-image.jpg">K</Avatar>
                    <ListItemText primary={"Lê Văn Kiên"} />
                </ListItem>
                <ListItem>
                    <Avatar sx={{ bgcolor: deepOrange[500], marginRight: "10px" }} src="/broken-image.jpg">K</Avatar>
                    <ListItemText primary={"Lê Văn Kiên"} />
                </ListItem>
                <ListItem>
                    <Avatar sx={{ bgcolor: deepOrange[500], marginRight: "10px" }} src="/broken-image.jpg">K</Avatar>
                    <ListItemText primary={"Lê Văn Kiên"} />
                </ListItem>
                <ListItem>
                    <Avatar sx={{ bgcolor: deepOrange[500], marginRight: "10px" }} src="/broken-image.jpg">K</Avatar>
                    <ListItemText primary={"Lê Văn Kiên"} />
                </ListItem>
            </List>
        </Box>
    );
}

export default UserList