import { date } from "yup";

export const onlyNumbers = (text) => {
    return text?.toString().replace(/\D/g, "");
};

export const maskCpf = (cpf) => {
    cpf = onlyNumbers(cpf);
    return `${cpf.substring(0, 3)}.${cpf.substring(3, 6)}.${cpf.substring(6, 9)}-${cpf.substring(9, 11)}`;
};

export const maskCnpj = (cnpj) => {
    cnpj = onlyNumbers(cnpj);
    return `${cnpj.substring(0, 2)}.${cnpj.substring(2, 5)}.${cnpj.substring(5, 8)}/${cnpj.substring(8, 12)}-${cnpj.substring(12, 14)}`;
};

export const maskPhone = (phone) => {
    phone = onlyNumbers(phone);
    return phone.length <= 8
       ? `${phone.padEnd(8, "0").substring(0, 4)}-${phone.padEnd(8, "0").substring(4, 8)}`
       : (phone.length === 9 
            ? `${phone.substring(0,5)}-${phone.substring(5,9)}`
            : (phone.length === 10 
                ? `(${phone.substring(0, 2)}) ${phone.substring(2, 6)}-${phone.substring(6, 10)}`
                : (phone.length === 11
                    ?  `(${phone.substring(0, 2)}) ${phone.substring(2, 7)}-${phone.substring(7, 11)}`
                    : `+${phone.padEnd(13, "0").substring(0, 2)} (${phone.padEnd(13, "0").substring(2, 4)}) ${phone.padEnd(13, "0").substring(4, 9)}-${phone.padEnd(13, "0").substring(9, 13)}`)));
};

export const formatCurrency = (number = 0.0, currency = "BRL", language = "pt-BR") => {
    return new Intl.NumberFormat(language, { style: 'currency', currency: currency }).format(parseFloat(number).toFixed(2));
}

export const formatDate = (date = new Date(), language = "pt-BR", options = {}) => {
    date = date.toString().replace(/GMT.*/, "GMT");
    date = new Date(date);
    options.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return  language.startsWith("en")
    ? date.toLocaleDateString("en-US", options)
    : date.toLocaleDateString("pt-BR", options);
}

export const formatDateTime = (date = new Date(), language = "pt-BR", dateOptions = {}, timeOptions = {}) => {
    date = date.toString().replace(/GMT.*/, "GMT");
    date = new Date(date);
    dateOptions.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    timeOptions.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return language.startsWith("en")
    ? `${date.toLocaleDateString("en-US", dateOptions)} ${date.toLocaleTimeString("en-US", timeOptions)}` 
    : `${date.toLocaleDateString("pt-BR", dateOptions)} ${date.toLocaleTimeString("pt-BR", timeOptions)}` ;
}

export const stringToCurrencyNum = (value) => {
    return (parseInt(onlyNumbers(value), 10) / 100).toFixed(2);
}

export const apiErrorResponseToHtml = (apiErrorList = []) => {
    let html = "";
    apiErrorList.map(error => {
        html += `<p>${error.message}</p>`;
    });
    return html;
}

export const formatNumber = (value, language="pt-BR", minFractionDigits, maxFractionDigits) => {
    return value.toLocaleString(
		language.startsWith("en") ? "en-US" : "pt-BR",
		{ minimumFractionDigits: minFractionDigits, maximumFractionDigits: maxFractionDigits }
    )
}

export const scrollWithOffset = (el, yOffset=-80) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
}

export const removeDiacritics = (text) => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}