import { Pagination } from "react-bootstrap";

export default function PaginationMenu({
	pageIndex,
	totalPages,
	nextPage,
	prevPage,
	setPage,
	nPagesToShow,
}) {
	const pagesToSelect =
		totalPages >= 1 && pageIndex > 0
			? [...Array(nPagesToShow).keys()]
					.map((i) => i + pageIndex - Math.floor(nPagesToShow / 2))
					.filter((i) => i > 0 && i <= totalPages)
			: [1];

	return (
		<Pagination>
			<Pagination.First disabled={pageIndex === 1} onClick={() => setPage(1)} />
			<Pagination.Prev disabled={pageIndex === 1} onClick={prevPage} />
			{pagesToSelect.map((item) => (
				<Pagination.Item
					key={item}
					active={pageIndex === item}
					onClick={() => setPage(item)}
				>
					{item}
				</Pagination.Item>
			))}
			<Pagination.Next disabled={pageIndex === totalPages} onClick={nextPage} />
			<Pagination.Last
				disabled={pageIndex === totalPages}
				onClick={() => setPage(totalPages)}
			/>
		</Pagination>
	);
}
