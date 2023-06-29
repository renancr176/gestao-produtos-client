import { useCallback, useEffect, useState } from "react";
import useAlert from "./alert";

export default function usePagination(
	request,
	intialPageSize = 10,
	initialFilter = {}
) {
	const [requestParams, setRequestParams] = useState({
		pageIndex: 1,
		pageSize: intialPageSize,
		...initialFilter,
	});
	const [totalCount, setTotalCount] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState([]);

	const { fireRequestError } = useAlert();

	const fetchData = useCallback(async () => {
		try {
			const response = await request(requestParams);
			setData(response.data);
			setTotalCount(response.totalCount);
			setTotalPages(response.totalPages);
		} catch (error) {
			fireRequestError(error);
		}
	}, [request, requestParams]);

	useEffect(() => {
		setIsLoading(true);
		fetchData().finally(() => {
			setIsLoading(false);
		});
	}, [fetchData]);

	const nextPage = () => {
		setRequestParams((state) => ({
			...state,
			pageIndex: state.pageIndex + 1,
		}));
	};

	const prevPage = () => {
		setRequestParams((state) => ({
			...state,
			pageIndex: state.pageIndex - 1,
		}));
	};

	const setPage = (pageIndex) => {
		setRequestParams((state) => ({
			...state,
			pageIndex,
		}));
	};

	const setPageSize = (pageSize) => {
		setRequestParams((state) => ({
			...state,
			pageSize,
			pageIndex: 1,
		}));
	};

	const setFilter = (filter) => {
		setRequestParams((state) => ({
			pageIndex: 1,
			pageSize: state.pageSize,
			...filter,
		}));
	};

	return {
		pageIndex: requestParams.pageIndex,
		pageSize: requestParams.pageSize,
		totalCount,
		totalPages,
		data,
		nextPage,
		prevPage,
		setPage,
		setPageSize,
		setFilter,
		isLoading,
	};
}
