import { useNavigate } from "react-router-dom"
import { useCookies } from 'react-cookie'
import { Button } from "@mui/material"


const logOutButtonSx = {
    backgroundColor: '#1FB6FF',
    color: 'white',
    ":hover": {
        backgroundColor: '#FF4949',
        color: '#white'
    }
}

export default function LogOutButton() {
    const navigate = useNavigate()
    const [cookies, setCookies, removeCookies] = useCookies(['publicApiKey', 'privateApiKey', 'isAuthenticated'])

    function deleteCookies() {
        removeCookies('isAuthenticated')
        navigate('/authenticate')
    }

    return (
        <Button sx={logOutButtonSx} onClick={deleteCookies}>LogOut</Button>
    )
}