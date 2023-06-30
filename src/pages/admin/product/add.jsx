import React from 'react';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useAlert from "../../../hooks/alert";
import { Container } from "react-bootstrap";
import ProductForm from './form';
import {addProductRequest} from '../../../services/product';

export default function ProductAdd() {
    const { fireSuccess, fireRequestError } = useAlert();
	const navigate = useNavigate();
	const { t } = useTranslation("products");

    const handleSubmit = (values) => {
		return addProductRequest(values)
			.then(({ data }) => {
				const message = t("add.success").replace("#PRODUCT_NAME", data.name);
				fireSuccess(message);
				navigate(`../${data.id}`);
			})
			.catch((err) => {
				console.error(err);
				fireRequestError(err);
			});
	};

    return (
		<Container className="mb-5">
			<h3>{t("add.title")}</h3>
			<ProductForm onSubmit={handleSubmit} />
		</Container>
	);
};