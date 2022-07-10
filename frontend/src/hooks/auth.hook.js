import { useCallback, useState, useEffect } from "react";

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)
        console.log("authhook here", token, id)
        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)

        localStorage.removeItem(storageName)
    }, [])

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem(storageName))
        console.log("Local storage have", data)

        if (data && data.token) {
            console.log("Use autologin by ", data.token, data.userId)
            login(data.token, data.userId)
        }
    }, [login])

    return { token, login, logout, userId}
}
