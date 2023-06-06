import { Suspense, useContext, useEffect } from "react";
import {PageSettingsContext} from '../../contexts/PageContext';
import Fallback from "../../pages/public/fallback";


export default function RouteElement({
	element,
	routeItems,
	pageSettings={
        breadcrumb: true,
        footer: true,
        header: true,
        sidebar: false,
        title: "Telecall"
    }
}) {
	const pageCtx = useContext(PageSettingsContext);
	useEffect(() => {
		pageCtx.setRouteItems(routeItems);
		pageCtx.setPageHeader(pageSettings.header);
		pageCtx.setPageFooter(pageSettings.footer);
		document.title = pageSettings.title;
		return () => {
			pageCtx.setRouteItems([]);
			pageCtx.setPageHeader(true);
			pageCtx.setPageFooter(true);
			document.title = "Telecall";
		}
	}, [pageCtx, pageSettings, routeItems]);

	return (
		<Suspense fallback={<Fallback />}>
				{element}
		</Suspense>
	);
}
