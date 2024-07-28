import React from 'react'

const UserData = ({users}) => {
  return (
    <>
        {
            users.map((currUser, index) => {
                const {id, firstName, lastName,  age, gender, email, phone, address } = currUser
                return (
                    <tr key={index}>
                        <td>{id}</td>
                        <td>{firstName} {lastName}</td>
                        <td>{age}</td>
                        <td>{gender}</td>
                        <td>{address.city}</td>
                        <td>{email}</td>
                        <td>{phone}</td>
                    </tr>
                )    
            })
        }
    </>
  )
}

export default UserData