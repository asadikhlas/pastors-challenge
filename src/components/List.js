import React, { useEffect, useState, useRef } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useDispatch } from 'react-redux';
import { getContacts } from '../actions/contacts';
import { Table, Spinner } from 'react-bootstrap';

const List = ({
	showContactDetail,
	setPage,
	contacts,
	page,
	query,
	isShowEvenContact,
}) => {
	const [isFetching, setIsFetching] = useState(false);
	const dispatch = useDispatch();
	const el = useRef();

	function handleScroll(e) {
		if (
			window.innerHeight + document.documentElement.scrollTop !==
			document.documentElement.offsetHeight
		)
			return;
		setIsFetching(true);
	}

	useEffect(() => {
		if (!isFetching) return;
		fetchMoreListItems();
	}, [isFetching]);

	async function fetchMoreListItems() {
		dispatch(
			getContacts({
				companyId: 171,
				page: page + 1,
				query: query,
			})
		);
		setPage(page + 1);
		setIsFetching(false);
	}

	const shouldShowContact = (contact) => {
		return isShowEvenContact ? contact.id % 2 === 0 : true;
	};

	const queryContact = (contact) => {
		return query
			? (contact.first_name && contact.first_name.includes(query)) ||
					(contact.last_name && contact.last_name.includes(query))
			: true;
	};

	return (
		<>
			<ul className='list-group mb-2'>
				<Scrollbars
					ref={el}
					style={{ width: '100%' }}
					autoHeight
					onScroll={handleScroll}
				>
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
							{contacts
								.filter(shouldShowContact)
								.filter(queryContact)
								.map((contact, index) => (
									<tr key={index} onClick={() => showContactDetail(contact)}>
										<td>{contact.id}</td>
										<td>{contact.first_name}</td>
										<td>{contact.last_name}</td>
										<td>{contact.email}</td>
										<td>{contact.country.iso}</td>
									</tr>
								))}
						</tbody>
					</Table>
				</Scrollbars>
			</ul>
			{isFetching && (
				<div className='flexer'>
					<Spinner animation="grow" variant="primary" />
				</div>
			)}
		</>
	);
};

export default List;
