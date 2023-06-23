import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, Col, Row, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import Spinner from '../../../components/elements/spinner';
import useAlert from "../../../hooks/alert";

export default function SupplierProductForm({
	onSubmit,
	form = {
		name: "",
		active: true,
	},
}) {
	const { t } = useTranslation("supplierProducts");
	const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const sweetAlert = useAlert();
    const [initialValues, setInitialValues] = useState(form);

    const schema = yup.object().shape({
        name: yup.string().required(),
    });

    const handleSubmit = (values) => {
		setSubmitting(true);
		onSubmit(values).finally(() => setSubmitting(false));
	};

	return loading ? (
		<div className="d-flex justify-content-center">
			<Spinner size={100} />
		</div>
	) : (
		<Formik
			enableReinitialize={true}
			validationSchema={schema}
			onSubmit={handleSubmit}
			initialValues={initialValues}
		>
			{({ handleSubmit, handleChange, values, touched, errors }) => (
				<Form noValidate onSubmit={handleSubmit}>
                    <Form.Group as={Row} className="mb-2">
						<Form.Label column md={3}>
							{t("labelName")}:{" "}
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
						<Form.Label column md={2}>
							{t("labelActive")}:{" "}
							<span style={{ color: "var(--tc-red)" }}>*</span>
						</Form.Label>
						<Col>
							<Form.Check
								type="switch"
								name="active"
								checked={values.active}
								onChange={handleChange}
								isValid={touched.active && !errors.active}
								isInvalid={touched.active && errors.active}
							/>
						</Col>
					</Form.Group>
                </Form>
			)}
		</Formik>
	);
}
