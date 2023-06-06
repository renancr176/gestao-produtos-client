import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

export default function useAlert() {
	const { t } = useTranslation("common");
	const mountHtml = (message) => {
		if (!message) {
			return;
		}

		const isArrayWithOneElement = Array.isArray(message) && message.length === 1;
		if (isArrayWithOneElement) {
			return `<p>${message[0]}<p>`;
		}

		const isArrayWithMultipleElements = Array.isArray(message) && message.length > 1;
		if (isArrayWithMultipleElements) {
			const listItems = message.map((item) => `<li>${item}</li>`).join("");
			return `<ul style="text-align:left;">${listItems}</ul>`;
		}

		const defaultMessage = `<p>${message}<p>`;
		return defaultMessage;
	};

	async function fireRequestError(error, title = null) {
		let message = "";
		if (error.response?.data) {
			const errors = error.response.data.errors;
			message = errors?.map((err) => err.message);
		} else {
			message = t("UnexpectedError");
		}
		return await Swal.fire({
			title: title ? title : t("Error"),
			html: mountHtml(message),
			icon: "error",
			confirmButtonText: "Ok",
		});
	}

	async function fireSuccess(message, title = null) {
		return await Swal.fire({
			title: title ? title : t("Success"),
			html: mountHtml(message),
			icon: "success",
			confirmButtonText: "Ok",
		});
	}

	async function fireInfo(message, title) {
		return await Swal.fire({
			title: title ? title : "",
			html: mountHtml(message),
			icon: "info",
			confirmButtonText: "Ok",
		});
	}

	async function fireError(message, title = null) {
		return await Swal.fire({
			html: mountHtml(message),
			title: title ? title : t("Error"),
			icon: "error",
			confirmButtonText: "Ok",
		});
	}

	return {
		fireRequestError,
		fireSuccess,
		fireError,
		fireInfo,
	};
}
