import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { blue, green, amber } from '@mui/material/colors';
import { getFirstNameCharacter } from '../../../utils/helper';
import './UserList.scss'

const UserList = (props) => {
    const { users } = props

    return (
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
            <List sx={{ width: "100%", bgcolor: "background.paper", position: "relative", overflow: "auto", height: 240, }}>
                {users.map((user, index) => (
                    <ListItem id={`student-id-${user.user_id || 0}`}>
                        <Avatar src="/broken-image.jpg" 
                            sx={{ 
                                marginRight: "15px",
                                bgcolor: index % 3 === 0 ? green[500] : index % 3 === 1 ? blue[500] : amber[500], 
                            }}
                        >
                            {getFirstNameCharacter(user.full_name)}
                        </Avatar>
                        <ListItemText primary={`${user.full_name || ''} (${user.user_name || ''})`} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default UserList