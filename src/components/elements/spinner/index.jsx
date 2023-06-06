import React from 'react'
import { FaSpinner } from "react-icons/fa";

export default function Spinner({className, ...rest}) {
  return (
    <FaSpinner className={["animate-spin", className].join(" ")} {...rest}/>
  )
}
