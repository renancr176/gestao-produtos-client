import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container, Table, Form, Row, Col, Button } from "react-bootstrap";
import useAlert from "../../../hooks/alert";
import {FaPencilAlt, FaTrashAlt} from 'react-icons/fa';
import usePagination from '../../../hooks/pagination';
import {searchProductsRequest} from '../../../services/product';
import Spinner from '../../../components/elements/spinner';
import PaginationMenu from '../../../components/elements/paginationMenu';
import {formatCurrency} from '../../../utils/helpers';
import Swal from "sweetalert2";

export default function Products() {
	const { t } = useTranslation("products");
	const navigate = useNavigate();
	const { fireRequestError } = useAlert();
	const [searchText, setSearchText] = useState("");
	const {
		data: products,
		pageIndex,
		totalPages,
		nextPage,
		prevPage,
		setPage,
		isLoading,
		setFilter
	} = usePagination(searchProductsRequest, {name: searchText});

	const goToEdit = (id) => {
		navigate(`${id}`);
	};

	const search = () => {
		if(searchText === undefined || searchText.length === 0)
		{
			Swal.fire({
				icon: "error",
				text: "Informe o nome do produto para pesquisar"
			});
			return;
		}

		setFilter({name: searchText});
	};

	useEffect(() => {}, [searchText])

	return (
		<Container>
			<h3>{t("title")}</h3>
			<Row>
					<Col className="d-flex justify-content-end">
						<Link to="add" className="btn btn-primary btn-tc-blue">
							Adicionar
						</Link>
					</Col>
				</Row>
			<Row>
				<Col>
					<Table className="mt-5" striped bordered hover>
						<thead>
							<tr>
								<th colSpan={3}>
									<Row>
										<Col md={10}>
											<Form.Group as={Row} className="mb-2">
												<Col>
													<Form.Control
														type="text"
														value={searchText}
														onChange={(e) => setSearchText(e.target.value)}
													/>
												</Col>
											</Form.Group>
										</Col>
										<Col md={2}>
											<Button onClick={() => search()}>
												{t("labelSearch")}
											</Button>
										</Col>
									</Row>
								</th>
							</tr>
							<tr>
								<th style={{width: "50%"}}>Name</th>
								<th style={{width: "50%"}}>Preço</th>
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
								<td>{formatCurrency(product.price)}</td>
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
