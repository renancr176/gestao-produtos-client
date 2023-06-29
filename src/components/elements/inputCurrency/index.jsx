import React from 'react';
import {Form} from 'react-bootstrap';

import { onlyNumbers, formatCurrency } from "../../../utils/helpers";

export default function InputCurrency({onChange, value = 0.00, currency = "BRL", language = "pt-BR", ...rest}) {
    const handleType = (event) => {
        let newValue = parseInt(onlyNumbers(event.target.value), 10) / 100;
        if (onlyNumbers(event.key).length > 0)
            newValue = parseInt(`${onlyNumbers(event.target.value)}${onlyNumbers(event.key)}`, 10) / 100;
        else if((event.keyCode === 8 || event.key === "Backspace")
            || (event.keyCode === 46 || event.key === "Delete")){
            newValue = onlyNumbers(event.target.value);
            newValue = parseInt(newValue.substring(0, newValue.length - 1), 10) / 100;
        }
		event.target.value = newValue;
        onChange(event);
    }
    
    return (
        <Form.Control 
            {...rest}
            onKeyDown={handleType}
            value={formatCurrency(value, currency, language)}
            />
    )
}
