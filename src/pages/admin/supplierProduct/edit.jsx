import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import useAlert from "../../../hooks/alert";
import { useTranslation } from "react-i18next";
import Spinner from "../../../components/elements/spinner";
import SupplierProductForm from './form';
import {getSupplierProductRequest, editSupplierProductRequest} from '../../../services/supplierProduct';

export default function SupplierProductEdit() {
    const { id } = useParams();
	const navigate = useNavigate();
	const { fireRequestError, fireSuccess } = useAlert();
    const { t } = useTranslation("products");

    const [form, setForm] = useState();

	useEffect(() => {
		if (!id) return navigate("../");

		getSupplierProductRequest(id)
			.then(({ data }) => {
				setForm(data);
			})
			.catch((err) => {
				console.error(err);
				fireRequestError(err);
				navigate("../");
			});
	}, [id]);

    const handleSubmit = (values) => {
        debugger;
		return editSupplierProductRequest({
			...values,
			id,
		})
        .then(({ data }) => {
            const message = t("edit.success").replace("#PRODUCT_NAME", data.name);
            fireSuccess(message);
            navigate("../");
        })
        .catch((err) => {
            console.error(err);
            fireRequestError(err);
        });
	};

    return (
		<Container className="mb-5">
			<h3>{t("edit.title")}</h3>
			{form ? (
				<SupplierProductForm onSubmit={handleSubmit} form={form} />
			) : (
				<div style={{ width: "100%", textAlign: "center" }}>
					<Spinner />
				</div>
			)}
		</Container>
	);
};