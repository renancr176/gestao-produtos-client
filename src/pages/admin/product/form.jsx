import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAlert from '../../../hooks/alert';
import { Formik } from "formik";
import * as yup from "yup";
import { Button, Col, Form, Row } from "react-bootstrap";
import Spinner from '../../../components/elements/spinner';
import InputCurrency from "../../../components/elements/inputCurrency";
import { getAllCategoriesRequest } from '../../../services/category';
import { getAllChargeTypesRequest } from '../../../services/chargeType';
import { getAllComplexityTypesRequest } from '../../../services/complexityType';
import { getAllCurrencyTypesRequest } from '../../../services/currencyType';
import { getAllExhaustedQuotaTypesRequest } from '../../../services/exhaustedQuotaType';
import { getAllInvoiceTypesRequest } from '../../../services/invoiceType';
import { getAllPeriodsRequest } from '../../../services/period';
import { getAllProductStatusRequest } from '../../../services/productStatus';
import { getAllProductTypesRequest } from '../../../services/productType';
import { getAllQuotaUnitsRequest } from '../../../services/quotaUnit';
import { getAllSaleTypesRequest } from '../../../services/saleType';
import { getAllWholesaleUnitsRequest } from '../../../services/wholesaleUnit';

export default function ProductForm({
    onSubmit,
    product = {
        name: "",
        categoryId: 0,
        productTypeId: 0,
        chargeTypeId: 0,
        isRecurring: false,
        isProportional: false,
        periodId: 0,
        statusId: 0,
        notify: false,
        notificationMessage: null,
        complexityTypeId: 0,
        saleTypeId: 0,
        invoiceTypeId: 0,
        currencyTypeId: 0,
        price: 0.00,
        priceWithOutTraffic: 0.00,
        wholesalePrice: 0.00,
        wholesaleUnitId: 0,
        quotaLimit: 0,
        quotaUnitId: 0,
        exhaustedQuotaTypeId: 0,
        telecomTax: 0.00,
        svaTax: 0.00,
        hidden: false,
        legacyCode: "",
        hlr: "",
        supplierProducts: [],
        chieldProducts: []
    }
}) {
    const { t } = useTranslation("products");
    const navigate = useNavigate();
    const sweetAlert = useAlert();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    //#region Tipos
    const [categories, setCategories] = useState([]);
    const [chargeTypes, setChargeTypes] = useState([]);
    const [complexityTypes, setComplexityTypes] = useState([]);
    const [currencyTypes, setCurrencyTypes] = useState([]);
    const [exhaustedQuotaTypes, setExhaustedQuotaTypes] = useState([]);
    const [invoiceTypes, setInvoiceTypes] = useState([]);
    const [periods, setPeriods] = useState([]);
    const [productStatus, setProductStatus] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
    const [quotaUnits, setQuotaUnits] = useState([]);
    const [saleTypes, setSaleTypes] = useState([]);
    const [wholesaleUnits, setWholesaleUnits] = useState([]);
    //#endregion

    useEffect(() => {
        getAllCategoriesRequest()
            .then(({ data }) => setCategories(data))
            .catch((error) => {
                console.error(error);
                sweetAlert.fireRequestError(error);
                navigate("/product");
            });

        getAllChargeTypesRequest()
            .then(({ data }) => setChargeTypes(data))
            .catch((error) => {
                console.error(error);
                sweetAlert.fireRequestError(error);
                navigate("/product");
            });

        getAllComplexityTypesRequest()
            .then(({ data }) => setComplexityTypes(data))
            .catch((error) => {
                console.error(error);
                sweetAlert.fireRequestError(error);
                navigate("/product");
            });

        getAllCurrencyTypesRequest()
            .then(({ data }) => setCurrencyTypes(data))
            .catch((error) => {
                console.error(error);
                sweetAlert.fireRequestError(error);
                navigate("/product");
            });

        getAllExhaustedQuotaTypesRequest()
            .then(({ data }) => setExhaustedQuotaTypes(data))
            .catch((error) => {
                console.error(error);
                sweetAlert.fireRequestError(error);
                navigate("/product");
            });

        getAllInvoiceTypesRequest()
            .then(({ data }) => setInvoiceTypes(data))
            .catch((error) => {
                console.error(error);
                sweetAlert.fireRequestError(error);
                navigate("/product");
            });

        getAllPeriodsRequest()
            .then(({ data }) => setPeriods(data))
            .catch((error) => {
                console.error(error);
                sweetAlert.fireRequestError(error);
                navigate("/product");
            });

        getAllProductStatusRequest()
            .then(({ data }) => setProductStatus(data))
            .catch((error) => {
                console.error(error);
                sweetAlert.fireRequestError(error);
                navigate("/product");
            });

        getAllProductTypesRequest()
            .then(({ data }) => setProductTypes(data))
            .catch((error) => {
                console.error(error);
                sweetAlert.fireRequestError(error);
                navigate("/product");
            });

        getAllQuotaUnitsRequest()
            .then(({ data }) => setQuotaUnits(data))
            .catch((error) => {
                console.error(error);
                sweetAlert.fireRequestError(error);
                navigate("/product");
            });

        getAllSaleTypesRequest()
            .then(({ data }) => setSaleTypes(data))
            .catch((error) => {
                console.error(error);
                sweetAlert.fireRequestError(error);
                navigate("/product");
            });

        getAllWholesaleUnitsRequest()
            .then(({ data }) => setWholesaleUnits(data))
            .catch((error) => {
                console.error(error);
                sweetAlert.fireRequestError(error);
                navigate("/product");
            })
            .finally(() => setLoading(false));
    }, []);

    const handleSubmit = (values) => {
        setSubmitting(true);
        let data = { ...values };
        data.supplierProducts = [values.supplierProductId];
        onSubmit(data).finally(() => setSubmitting(false));
    };

    const schema = yup.object().shape({
        name: yup.string().required(),
        categoryId: yup.string().oneOf(categories),
        productTypeId: yup.string().oneOf(productTypes),
        chargeTypeId: yup.string().oneOf(chargeTypes),
        isRecurring: yup.bool().required(),
        isProportional: yup.bool().required(),
        periodId: yup.string().oneOf(periods),
        statusId: yup.string().oneOf(productStatus),
        notify: yup.bool().required(),
        // notificationMessage: yup.string().when("notify", {
        //     is: true,
        //     then: yup.string().required("Must enter notification message")
        // }),
        complexityTypeId: yup.string().oneOf(complexityTypes),
        saleTypeId: yup.string().oneOf(saleTypes),
        invoiceTypeId: yup.string().oneOf(invoiceTypes),
        currencyTypeId: yup.string().oneOf(currencyTypes),
        price: yup.number().min(0.00),
        priceWithOutTraffic: yup.number().min(0.00),
        wholesalePrice: yup.number().min(0.00),
        wholesaleUnitId: yup.string().oneOf(wholesaleUnits),
        quotaLimit: yup.number().min(0),
        quotaUnitId: yup.string().oneOf(quotaUnits),
        exhaustedQuotaTypeId: yup.string().oneOf(exhaustedQuotaTypes),
        telecomTax: yup.number().min(0.00),
        svaTax: yup.number().min(0.00),
        hidden: yup.bool().required(),
        supplierProductId: yup.string().required().uuid()
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
            initialValues={product}
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
                            {t("form.labelCategory")}:{" "}
                            <span style={{ color: "var(--tc-red)" }}>*</span>
                        </Form.Label>
                        <Col>
                            <Form.Select
                                name="categoryId"
                                value={values.categoryId}
                                onChange={handleChange}
                                isValid={touched.categoryId && !errors.categoryId}
                                isInvalid={touched.categoryId && errors.categoryId}
                            >
                                <option value="">
                                    {t("form.selectAnOption")}
                                </option>
                                {categories.map(({ id, name }) => (
                                    <option key={id} value={id}>
                                        {name}
                                    </option>
                                ))}
                            </Form.Select>
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
                                {productTypes.map(({ id, name }) => (
                                    <option key={id} value={id}>
                                        {name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column md={3} className="d-flex justify-content-end">
                            {t("form.labelChargeType")}:{" "}
                            <span style={{ color: "var(--tc-red)" }}>*</span>
                        </Form.Label>
                        <Col>
                            <Form.Select
                                name="chargeTypeId"
                                value={values.chargeTypeId}
                                onChange={handleChange}
                                isValid={touched.chargeTypeId && !errors.chargeTypeId}
                                isInvalid={touched.chargeTypeId && errors.chargeTypeId}
                            >
                                <option value="">
                                    {t("form.selectAnOption")}
                                </option>
                                {chargeTypes.map(({ id, name }) => (
                                    <option key={id} value={id}>
                                        {name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column md={3} className="d-flex justify-content-end">
                            {t("form.labelIsRecurring")}:{" "}
                            <span style={{ color: "var(--tc-red)" }}>*</span>
                        </Form.Label>
                        <Col>
                            <Form.Check
                                type="switch"
                                name="isRecurring"
                                checked={values.isRecurring}
                                onChange={handleChange}
                                label={values.isRecurring ? t("form.yes") : t("form.no")}
                                isValid={touched.isRecurring && !errors.isRecurring}
                                isInvalid={touched.isRecurring && errors.isRecurring}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column md={3} className="d-flex justify-content-end">
                            {t("form.labelIsProportional")}:{" "}
                            <span style={{ color: "var(--tc-red)" }}>*</span>
                        </Form.Label>
                        <Col>
                            <Form.Check
                                type="switch"
                                name="isProportional"
                                checked={values.isProportional}
                                onChange={handleChange}
                                label={values.isProportional ? t("form.yes") : t("form.no")}
                                isValid={touched.isProportional && !errors.isProportional}
                                isInvalid={touched.isProportional && errors.isProportional}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column md={3} className="d-flex justify-content-end">
                            {t("form.labelPeriod")}:{" "}
                            <span style={{ color: "var(--tc-red)" }}>*</span>
                        </Form.Label>
                        <Col>
                            <Form.Select
                                name="periodId"
                                value={values.periodId}
                                onChange={handleChange}
                                isValid={touched.periodId && !errors.periodId}
                                isInvalid={touched.periodId && errors.periodId}
                            >
                                <option value="">
                                    {t("form.selectAnOption")}
                                </option>
                                {periods.map(({ id, billCicle, dayCicle }) => (
                                    <option key={id} value={id}>
                                        {billCicle ? t("form.labelBillCicle") : `${dayCicle} ${t("form.labelDays")}`}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column md={3} className="d-flex justify-content-end">
                            {t("form.labelStatus")}:{" "}
                            <span style={{ color: "var(--tc-red)" }}>*</span>
                        </Form.Label>
                        <Col>
                            <Form.Select
                                name="statusId"
                                value={values.statusId}
                                onChange={handleChange}
                                isValid={touched.statusId && !errors.statusId}
                                isInvalid={touched.statusId && errors.statusId}
                            >
                                <option value="">
                                    {t("form.selectAnOption")}
                                </option>
                                {productStatus.map(({ id, name }) => (
                                    <option key={id} value={id}>
                                        {name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column md={3} className="d-flex justify-content-end">
                            {t("form.labelNotify")}:{" "}
                            <span style={{ color: "var(--tc-red)" }}>*</span>
                        </Form.Label>
                        <Col>
                            <Form.Check
                                type="switch"
                                name="notify"
                                checked={values.notify}
                                onChange={handleChange}
                                label={values.notify ? t("form.yes") : t("form.no")}
                                isValid={touched.notify && !errors.notify}
                                isInvalid={touched.notify && errors.notify}
                            />
                        </Col>
                    </Form.Group>
                    {values.notify ?
                        (
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label column md={3} className="d-flex justify-content-end">
                                    {t("form.labelNotificationMessage")}:{" "}
                                    <span style={{ color: "var(--tc-red)" }}>*</span>
                                </Form.Label>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        name="notificationMessage"
                                        value={values.notificationMessage}
                                        onChange={handleChange}
                                        isValid={touched.notificationMessage && !errors.notificationMessage}
                                        isInvalid={touched.notificationMessage && errors.notificationMessage}
                                    />
                                </Col>
                            </Form.Group>
                        ) : null}
                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column md={3} className="d-flex justify-content-end">
                            {t("form.labelComplexityType")}:{" "}
                            <span style={{ color: "var(--tc-red)" }}>*</span>
                        </Form.Label>
                        <Col>
                            <Form.Select
                                name="complexityTypeId"
                                value={values.complexityTypeId}
                                onChange={handleChange}
                                isValid={touched.complexityTypeId && !errors.complexityTypeId}
                                isInvalid={touched.complexityTypeId && errors.complexityTypeId}
                            >
                                <option value="">
                                    {t("form.selectAnOption")}
                                </option>
                                {complexityTypes.map(({ id, name }) => (
                                    <option key={id} value={id}>
                                        {name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column md={3} className="d-flex justify-content-end">
                            {t("form.labelSaleType")}:{" "}
                            <span style={{ color: "var(--tc-red)" }}>*</span>
                        </Form.Label>
                        <Col>
                            <Form.Select
                                name="saleTypeId"
                                value={values.saleTypeId}
                                onChange={handleChange}
                                isValid={touched.saleTypeId && !errors.saleTypeId}
                                isInvalid={touched.saleTypeId && errors.saleTypeId}
                            >
                                <option value="">
                                    {t("form.selectAnOption")}
                                </option>
                                {saleTypes.map(({ id, name }) => (
                                    <option key={id} value={id}>
                                        {name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column md={3} className="d-flex justify-content-end">
                            {t("form.labelInvoiceType")}:{" "}
                            <span style={{ color: "var(--tc-red)" }}>*</span>
                        </Form.Label>
                        <Col>
                            <Form.Select
                                name="invoiceTypeId"
                                value={values.invoiceTypeId}
                                onChange={handleChange}
                                isValid={touched.invoiceTypeId && !errors.invoiceTypeId}
                                isInvalid={touched.invoiceTypeId && errors.invoiceTypeId}
                            >
                                <option value="">
                                    {t("form.selectAnOption")}
                                </option>
                                {invoiceTypes.map(({ id, name }) => (
                                    <option key={id} value={id}>
                                        {name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column md={3} className="d-flex justify-content-end">
                            {t("form.labelCurrencyType")}:{" "}
                            <span style={{ color: "var(--tc-red)" }}>*</span>
                        </Form.Label>
                        <Col>
                            <Form.Select
                                name="currencyTypeId"
                                value={values.currencyTypeId}
                                onChange={handleChange}
                                isValid={touched.currencyTypeId && !errors.currencyTypeId}
                                isInvalid={touched.currencyTypeId && errors.currencyTypeId}
                            >
                                <option value="">
                                    {t("form.selectAnOption")}
                                </option>
                                {currencyTypes.map(({ id, name }) => (
                                    <option key={id} value={id}>
                                        {name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column md={3} className="d-flex justify-content-end">
                            {t("form.labelPrice")}:{" "}
                            <span style={{ color: "var(--tc-red)" }}>*</span>
                        </Form.Label>
                        <Col>
                            <InputCurrency
                                type="tel"
                                name="price"
                                currency={currencyTypes.find(x => x.id == values.currencyTypeId) !== undefined
                                    ? currencyTypes.find(x => x.id == values.currencyTypeId).type
                                    : "BRL"}
                                value={values.price}
                                onChange={handleChange}
                                isValid={touched.price && !errors.price}
                                isInvalid={touched.price && errors.price}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column md={3} className="d-flex justify-content-end">
                            {t("form.labelPriceWithOutTraffic")}:{" "}
                            <span style={{ color: "var(--tc-red)" }}>*</span>
                        </Form.Label>
                        <Col>
                            <InputCurrency
                                type="tel"
                                name="priceWithOutTraffic"
                                currency={currencyTypes.find(x => x.id == values.currencyTypeId) !== undefined
                                    ? currencyTypes.find(x => x.id == values.currencyTypeId).type
                                    : "BRL"}
                                value={values.priceWithOutTraffic}
                                onChange={handleChange}
                                isValid={touched.priceWithOutTraffic && !errors.priceWithOutTraffic}
                                isInvalid={touched.priceWithOutTraffic && errors.priceWithOutTraffic}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column md={3} className="d-flex justify-content-end">
                            {t("form.labelWholesalePrice")}:{" "}
                            <span style={{ color: "var(--tc-red)" }}>*</span>
                        </Form.Label>
                        <Col>
                            <InputCurrency
                                type="tel"
                                name="wholesalePrice"
                                currency={currencyTypes.find(x => x.id == values.currencyTypeId) !== undefined
                                    ? currencyTypes.find(x => x.id == values.currencyTypeId).type
                                    : "BRL"}
                                value={values.wholesalePrice}
                                onChange={handleChange}
                                isValid={touched.wholesalePrice && !errors.wholesalePrice}
                                isInvalid={touched.wholesalePrice && errors.wholesalePrice}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column md={3} className="d-flex justify-content-end">
                            {t("form.labelWholesaleUnit")}:{" "}
                            <span style={{ color: "var(--tc-red)" }}>*</span>
                        </Form.Label>
                        <Col>
                            <Form.Select
                                name="wholesaleUnitId"
                                value={values.wholesaleUnitId}
                                onChange={handleChange}
                                isValid={touched.wholesaleUnitId && !errors.wholesaleUnitId}
                                isInvalid={touched.wholesaleUnitId && errors.wholesaleUnitId}
                            >
                                <option value="">
                                    {t("form.selectAnOption")}
                                </option>
                                {wholesaleUnits.map(({ id, name }) => (
                                    <option key={id} value={id}>
                                        {name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column md={3} className="d-flex justify-content-end">
                            {t("form.labelQuotaLimit")}:{" "}
                            <span style={{ color: "var(--tc-red)" }}>*</span>
                        </Form.Label>
                        <Col>
                            <Form.Control
                                type="tel"
                                name="quotaLimit"
                                value={values.quotaLimit}
                                onChange={handleChange}
                                isValid={touched.quotaLimit && !errors.quotaLimit}
                                isInvalid={touched.quotaLimit && errors.quotaLimit}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column md={3} className="d-flex justify-content-end">
                            {t("form.labelQuotaUnit")}:{" "}
                            <span style={{ color: "var(--tc-red)" }}>*</span>
                        </Form.Label>
                        <Col>
                            <Form.Select
                                name="quotaUnitId"
                                value={values.quotaUnitId}
                                onChange={handleChange}
                                isValid={touched.quotaUnitId && !errors.quotaUnitId}
                                isInvalid={touched.quotaUnitId && errors.quotaUnitId}
                            >
                                <option value="">
                                    {t("form.selectAnOption")}
                                </option>
                                {quotaUnits.map(({ id, name }) => (
                                    <option key={id} value={id}>
                                        {name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column md={3} className="d-flex justify-content-end">
                            {t("form.labelExhaustedQuotaType")}:{" "}
                            <span style={{ color: "var(--tc-red)" }}>*</span>
                        </Form.Label>
                        <Col>
                            <Form.Select
                                name="exhaustedQuotaTypeId"
                                value={values.exhaustedQuotaTypeId}
                                onChange={handleChange}
                                isValid={touched.exhaustedQuotaTypeId && !errors.exhaustedQuotaTypeId}
                                isInvalid={touched.exhaustedQuotaTypeId && errors.exhaustedQuotaTypeId}
                            >
                                <option value="">
                                    {t("form.selectAnOption")}
                                </option>
                                {exhaustedQuotaTypes.map(({ id, name }) => (
                                    <option key={id} value={id}>
                                        {name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column md={3} className="d-flex justify-content-end">
                            {t("form.labelTelecomTax")}:{" "}
                            <span style={{ color: "var(--tc-red)" }}>*</span>
                        </Form.Label>
                        <Col>
                            <InputCurrency
                                type="tel"
                                name="telecomTax"
                                currency={currencyTypes.find(x => x.id == values.currencyTypeId) !== undefined
                                    ? currencyTypes.find(x => x.id == values.currencyTypeId).type
                                    : "BRL"}
                                value={values.telecomTax}
                                onChange={handleChange}
                                isValid={touched.telecomTax && !errors.telecomTax}
                                isInvalid={touched.telecomTax && errors.telecomTax}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column md={3} className="d-flex justify-content-end">
                            {t("form.labelSvaTax")}:{" "}
                            <span style={{ color: "var(--tc-red)" }}>*</span>
                        </Form.Label>
                        <Col>
                            <InputCurrency
                                type="tel"
                                name="svaTax"
                                currency={currencyTypes.find(x => x.id == values.currencyTypeId) !== undefined
                                    ? currencyTypes.find(x => x.id == values.currencyTypeId).type
                                    : "BRL"}
                                value={values.svaTax}
                                onChange={handleChange}
                                isValid={touched.svaTax && !errors.svaTax}
                                isInvalid={touched.svaTax && errors.svaTax}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column md={3} className="d-flex justify-content-end">
                            {t("form.labelHidden")}:{" "}
                            <span style={{ color: "var(--tc-red)" }}>*</span>
                        </Form.Label>
                        <Col>
                            <Form.Check
                                type="switch"
                                name="hidden"
                                checked={values.hidden}
                                onChange={handleChange}
                                label={values.hidden ? t("form.yes") : t("form.no")}
                                isValid={touched.hidden && !errors.hidden}
                                isInvalid={touched.hidden && errors.hidden}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column md={3} className="d-flex justify-content-end">
                            {t("form.labelLegacyCode")}:
                        </Form.Label>
                        <Col>
                            <Form.Control
                                type="text"
                                name="legacyCode"
                                value={values.legacyCode}
                                onChange={handleChange}
                                isValid={touched.legacyCode && !errors.legacyCode}
                                isInvalid={touched.legacyCode && errors.legacyCode}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column md={3} className="d-flex justify-content-end">
                            {t("form.labelHlr")}:
                        </Form.Label>
                        <Col>
                            <Form.Control
                                type="text"
                                name="hlr"
                                value={values.hlr}
                                onChange={handleChange}
                                isValid={touched.hlr && !errors.hlr}
                                isInvalid={touched.hlr && errors.hlr}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column md={3} className="d-flex justify-content-end">
                            {t("form.labelSupplierProduct")}:{" "}
                            <span style={{ color: "var(--tc-red)" }}>*</span>
                        </Form.Label>
                        <Col>
                            <Form.Control
                                type="text"
                                name="supplierProductId"
                                value={values.supplierProductId}
                                onChange={handleChange}
                                isValid={touched.supplierProductId && !errors.supplierProductId}
                                isInvalid={touched.supplierProductId && errors.supplierProductId}
                            />
                        </Col>
                    </Form.Group>
                    <Row className="mt-5">
                        <Col className="d-flex justify-content-center">
                            {product?.id === undefined ? (
                                <Button type="submit" variant="primary">
                                    {t("form.labelBtnCreate")} {submitting && <Spinner />}
                                </Button>
                            ) : (
                                <Button type="submit" variant="warning">
                                    {t("form.labelBtnUpdate")} {submitting && <Spinner />}
                                </Button>
                            )}
                        </Col>
                    </Row>
                </Form>
            )}
        </Formik>
    );
};