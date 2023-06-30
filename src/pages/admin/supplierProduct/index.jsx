import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container, Table, Form, Row, Col, Button } from "react-bootstrap";
import useAlert from "../../../hooks/alert";
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import usePagination from '../../../hooks/pagination';
import { searchSupplierProductsRequest } from '../../../services/supplierProduct';
import Spinner from '../../../components/elements/spinner';
import PaginationMenu from '../../../components/elements/paginationMenu';
import Swal from "sweetalert2";

export default function SupplierProducts() {
	const { t } = useTranslation("supplierProducts");
	const navigate = useNavigate();
	const [searchText, setSearchText] = useState("");
	const [searchCode, setSearchCode] = useState("");
	const {
		data: products,
		pageIndex,
		totalPages,
		nextPage,
		prevPage,
		setPage,
		isLoading,
		setFilter
	} = usePagination(searchSupplierProductsRequest, { name: searchText, externalCode: searchCode });

	const goToEdit = (id) => {
		navigate(`${id}`);
	};

	const search = () => {
		if ((searchText === undefined || searchText.length === 0)
			&& (searchCode === undefined || searchCode.length === 0)) {
			Swal.fire({
				icon: "error",
				text: "Informe o nome ou código externo do produto para pesquisar"
			});
			return;
		}

		setFilter({ name: searchText, externalCode: searchCode });
	};

	const clearSearch = () => {
		setSearchText("");
		setSearchCode("");
		setFilter({});
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
								<th colSpan={4}>
									<Row>
										<Col md={10}>
											<Row>
												<Col>
													<Form.Group as={Row} className="mb-2">
														<Form.Label column md={3} className="d-flex justify-content-end">
															Nome:
														</Form.Label>
														<Col>
															<Form.Control
																type="text"
																value={searchText}
																onChange={(e) => setSearchText(e.target.value)}
															/>
														</Col>
													</Form.Group>
												</Col>
											</Row>
											<Row>
												<Col>
													<Form.Group as={Row} className="mb-2">
														<Form.Label column md={3} className="d-flex justify-content-end">
															Código Externo:
														</Form.Label>
														<Col>
															<Form.Control
																type="text"
																value={searchCode}
																onChange={(e) => setSearchCode(e.target.value)}
															/>
														</Col>
													</Form.Group>
												</Col>
											</Row>
										</Col>
										<Col md={2}>
											<Row className="mb-2">
												<Col>
													<Button onClick={() => search()}>
														{t("labelSearch")}
													</Button>
												</Col>
											</Row>
											<Row>
												<Col>
													<Button variant="secondary" onClick={() => clearSearch()}>
														{t("labelClearSearch")}
													</Button>
												</Col>
											</Row>
										</Col>
									</Row>
								</th>
							</tr>
							<tr>
								<th style={{ width: "40%" }}>Name</th>
								<th style={{ width: "20%" }}>Código Externo</th>
								<th style={{ width: "20%" }}>Tipo</th>
								<th style={{ width: "20%" }}></th>
							</tr>
						</thead>
						<tbody>
							{isLoading ? (
								<tr><td className="text-center" colSpan={5}><Spinner size={50} /></td></tr>
							) : (
								products?.map((product) => (
									<tr>
										<td>{product.name}</td>
										<td>{product.externalCode}</td>
										<td>{product.productType.name}</td>
										<td className="text-center">
											<Button
												variant="warning"
												className="ms-1 me-1"
												onClick={() => goToEdit(product.id)}>
												<FaPencilAlt />
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
