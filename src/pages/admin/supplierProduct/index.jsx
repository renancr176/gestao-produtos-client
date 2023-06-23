import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container, Table, Pagination, Row, Col } from "react-bootstrap";
import useAlert from "../../../hooks/alert";

export default function SupplierProducts() {
	const { t } = useTranslation("supplierProducts");
	const navigate = useNavigate();
	const [pagination, setPagination] = useState({
		items: [],
		active: 1,
	});

	useEffect(() => {
		let items = [];
		for (let number = 1; number <= 5; number++) {
			items.push(
				<Pagination.Item key={number} active={number === pagination.active}>
					{number}
				</Pagination.Item>
			);
		}
		setPagination((prevState) => ({
			...prevState,
			items,
		}));
	}, []);

	return (
		<Container>
			<h3>{t("title")}</h3>

			<Table className="mt-5" striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Username</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1</td>
						<td>Mark</td>
						<td>Otto</td>
						<td>@mdo</td>
					</tr>
					<tr>
						<td>2</td>
						<td>Jacob</td>
						<td>Thornton</td>
						<td>@fat</td>
					</tr>
					<tr>
						<td>3</td>
						<td colSpan={2}>Larry the Bird</td>
						<td>@twitter</td>
					</tr>
				</tbody>
			</Table>

			<Row>
				<Col></Col>
				<Col>
					<Pagination>
						<Pagination.First />
						<Pagination.Prev />
						{pagination.items.map((item) => item)}
						<Pagination.Next />
						<Pagination.Last />
					</Pagination>
				</Col>
				<Col></Col>
			</Row>
		</Container>
	);
}
