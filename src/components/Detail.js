import React from 'react';
import { Table } from 'react-bootstrap';

const Detail = ({ selectedContact = {} }) => {
    const { id, first_name, last_name, email, country } = selectedContact
    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Country</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{id}</td>
                    <td>{first_name}</td>
                    <td>{last_name}</td>
                    <td>{email}</td>
                    <td>{country.iso}</td>
                </tr>
            </tbody>
        </Table>
    )
}

export default Detail;