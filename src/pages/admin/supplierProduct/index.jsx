import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container, Table, Pagination, Row, Col, Button } from "react-bootstrap";
import useAlert from "../../../hooks/alert";
import {FaPencilAlt, FaTrashAlt} from 'react-icons/fa';
import usePagination from '../../../hooks/pagination';
import {searchSupplierProductsRequest} from '../../../services/supplierProduct';
import Spinner from '../../../components/elements/spinner';
import PaginationMenu from '../../../components/elements/paginationMenu';

export default function SupplierProducts() {
	const { t } = useTranslation("supplierProducts");
	const navigate = useNavigate();
	const {
		data: products,
		pageIndex,
		totalPages,
		nextPage,
		prevPage,
		setPage,
		isLoading,
	} = usePagination(searchSupplierProductsRequest);

	const goToEdit = (id) => {
		navigate(`${id}`);
	};

	return (
		<Container>
			<h3>{t("title")}</h3>
			<Row>
				<Col></Col>
			</Row>
			<Row>
				<Col>
					<Table className="mt-5" striped bordered hover>
						<thead>
							<tr>
								<th style={{width: "50%"}}>Name</th>
								<th style={{width: "50%"}}>Tipo</th>
								<th style={{width: "20%"}}></th>
							</tr>
						</thead>
						<tbody>
						{isLoading ? (
								<tr><td className="text-center" colSpan={5}><Spinner size={50}/></td></tr>
							) : (
								products?.map((product) => (
							<tr>
								<td>{product.name}</td>
								<td>{product.productType.name}</td>
								<td className="text-center">
									<Button 
										variant="warning" 
										className="ms-1 me-1"
										onClick={() => goToEdit(product.id)}>
										<FaPencilAlt/>
									</Button>
									{/* <Button variant="danger" className="ms-1 me-1">
										<FaTrashAlt/>
									</Button> */}
								</td>
							</tr>
							))
							)}
						</tbody>
					</Table>
				</Col>
			</Row>
			<Row>
				<Col className="d-flex justify-content-center">
					<PaginationMenu
						nPagesToShow={5}
						{...{ pageIndex, totalPages, nextPage, prevPage, setPage }}
					/>
				</Col>
			</Row>
		</Container>
	);
}
