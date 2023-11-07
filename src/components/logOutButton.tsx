import { Button } from "@mui/material"
import { useCookies } from 'react-cookie'

const logOutButtonSx = {
    backgroundColor: '#1FB6FF',
    color: 'white',
    ":hover": {
        backgroundColor: '#FF4949',
        color: '#white'
    }
}

export default function LogOutButton() {
    const [cookies, setCookies, removeCookies] = useCookies(['publicApiKey', 'privateApiKey', 'isAuthenticated'])

    function deleteCookies() {
        removeCookies('isAuthenticated')
    }

    return (
        <Button sx={logOutButtonSx} onClick={deleteCookies}>LogOut</Button>
    )
}