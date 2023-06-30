import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAlert from '../../../hooks/alert';
import { Formik } from "formik";
import * as yup from "yup";
import { Button, Col, Form, Row } from "react-bootstrap";
import Spinner from '../../../components/elements/spinner';
import { extractIds } from '../../../utils/helpers';
import {getAllSupplierProductTypesRequest} from '../../../services/supplierProductType';

export default function SupplierProductForm({
	onSubmit,
	form = {
		name: "",
		productTypeId: 0, 
		active: true
	  },
}) {
	const { t } = useTranslation("supplierProducts");
    const navigate = useNavigate();
    const sweetAlert = useAlert();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

	//#region Tipos
	const [supplierProductTypes, setSupplierProductTypes] = useState([]);
	//#endregion

	useEffect(() => {
        getAllSupplierProductTypesRequest()
            .then(({ data }) => setSupplierProductTypes(data))
            .catch((error) => {
                console.error(error);
                sweetAlert.fireRequestError(error);
                navigate("/product");
            })
			.finally(() => setLoading(false));;
	}, []);

	const handleSubmit = (values) => {
		setSubmitting(true);
		onSubmit(values).finally(() => setSubmitting(false));
	};

    const schema = yup.object().shape({
        name: yup.string().required(),
		productTypeId: yup.string().oneOf(extractIds(supplierProductTypes)),
		active: yup.bool().required()
    });

	return loading ? (
        <div className="d-flex justify-content-center">
            <Spinner />
        </div>
    ) : (
        <Formik
            enableReinitialize={true}
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={form}
        >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column md={3} className="d-flex justify-content-end">
                            {t("form.labelName")}:{" "}
                            <span style={{ color: "var(--tc-red)" }}>*</span>
                        </Form.Label>
                        <Col>
                            <Form.Control
                                type="text"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                isValid={touched.name && !errors.name}
                                isInvalid={touched.name && errors.name}
                            />
                        </Col>
                    </Form.Group>
					<Form.Group as={Row} className="mb-2">
                        <Form.Label column md={3} className="d-flex justify-content-end">
                            {t("form.labelProductType")}:{" "}
                            <span style={{ color: "var(--tc-red)" }}>*</span>
                        </Form.Label>
                        <Col>
                            <Form.Select
                                name="productTypeId"
                                value={values.productTypeId}
                                onChange={handleChange}
                                isValid={touched.productTypeId && !errors.productTypeId}
                                isInvalid={touched.productTypeId && errors.productTypeId}
                            >
                                <option value="">
                                    {t("form.selectAnOption")}
                                </option>
                                {supplierProductTypes.map(({ id, name }) => (
                                    <option key={id} value={id}>
                                        {name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Form.Group>
					<Form.Group as={Row} className="mb-2">
                        <Form.Label column md={3} className="d-flex justify-content-end">
                            {t("form.labelActive")}:{" "}
                            <span style={{ color: "var(--tc-red)" }}>*</span>
                        </Form.Label>
                        <Col>
                            <Form.Check
                                type="switch"
                                name="active"
                                checked={values.active}
                                onChange={handleChange}
                                label={values.active ? t("form.yes") : t("form.no")}
                                isValid={touched.active && !errors.active}
                                isInvalid={touched.active && errors.active}
                            />
                        </Col>
                    </Form.Group>
					<Row className="mt-5">
                        <Col className="d-flex justify-content-center">
                            {form?.id === undefined ? (
                                <Button type="submit" variant="primary">
                                    {t("form.labelBtnCreate")} {submitting && <Spinner />}
                                </Button>
                            ) : (
                                <Button type="submit" variant="warning">
                                    {t("form.labelBtnUpdate")} {submitting && <Spinner />}
                                </Button>
                            )}
                            <Link to="../" className="ms-5 btn btn-secondary">
                                {t("form.labelBtnBack")}
                            </Link>
                        </Col>
                    </Row>
                </Form>
            )}
        </Formik>
    );
};
