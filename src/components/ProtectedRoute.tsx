import { useEffect } from 'react'
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"

export default function ProtectedRoute({children}: any) {
    const [cookies, setCookies] = useCookies(['publicApiKey', 'privateApiKey', 'isAuthenticated'])
    const navigate = useNavigate()

    useEffect(() => {
        if(!cookies.privateApiKey || !cookies.privateApiKey || !cookies.isAuthenticated) {
            setCookies('isAuthenticated', false)
            navigate('/authenticate')
        }
    }, [])

    return children
}