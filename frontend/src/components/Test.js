import React, {useEffect, useState} from 'react';

const Test = () => {
    let [users, setUsers] = useState([])

    useEffect(() => {
        getUsers()
    }, [])

    let getUsers = async () => {
        let response = await fetch('/api/users')
        
        if (response.ok) {
            let data = await response.json()
            setUsers(data)
        } else {
            console.log('Error')
        }
    }

    return(
        <div>
            {
                users.map((user) => 
                    <div>{user.email}</div>
                )
            } 
        </div>
    )
}

export default Test