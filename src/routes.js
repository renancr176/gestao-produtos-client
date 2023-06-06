import { Routes, Route } from "react-router-dom";

import { USER_ROLES, requireAll } from "./utils/userRoles";
import RequiredAuth from "./utils/requiredAuth";
import RouteElement from "./components/routeElement";

//#region Public Pages
import Home from "./pages/public/home";
import NotFound from "./pages/public/errors/notFound";
import SignIn from "./pages/public/auth/signIn";
//#endregion

//#region Admin Pages
import AdminHome from './pages/admin/index';
//#endregion

const PageRoutes = [
    {
		path: "/health/live",
		name: "health-check",
		pageSettings: {
			header: false,
			footer: false,
			title: "Health - Telecall",
		},
		element: <span>Telecall is Healthy!</span>,
	},
    {
		path: "",
		name: "home",
		pageSettings: {
			header: true,
			footer: true,
			title: "Telecall - O melhor plano de celular para a sua empresa",
		},
		element: <Home />,
		children: [
            {
				path: "auth",
				name: "auth",
				pageSettings: {
					header: false,
					footer: false,
					title: "",
				},
				children: [
					{
						path: "signin",
						name: "signin",
						element: <SignIn />,
					},
				],
			},
            //#region Admin Pages
			{
				roles: [USER_ROLES.ADMIN],
				path: "admin",
				name: "admin.index",
				pageSettings: {
					header: true,
					footer: true,
				},
				element: <AdminHome />,
				children: [
                    
                ]
            }
            //#endregion
        ]
    }
];

export default function AppRoutes() {
	function mountRoute(
		{ path, element, name, roles, children, pageSettings },
		fatherRouteItems = [],
		fatherPageSettings = {}
	) {
		const settings = { ...fatherPageSettings, ...pageSettings };

		const routeItem = { path, name };
		const routeItems = name
			? [...fatherRouteItems, routeItem]
			: fatherRouteItems;

		const routePath = routeItems.map((x) => x.path).join("/");

		const hasRoles = roles && roles.length > 0;

		if (children) {
			return (
				<Route
					key={routePath}
					path={path}
					element={hasRoles && <RequiredAuth requiredRoles={roles} />}
				>
					{element && (
						<Route
							key={routePath + "/"}
							path=""
							element={
								<RouteElement
									element={element}
									routeItems={routeItems}
									pageSettings={settings}
								/>
							}
						/>
					)}
					{children.map((route) => mountRoute(route, routeItems, settings))}
					<Route key={routePath + "/*"} path="*" element={<NotFound />} />
				</Route>
			);
		}

		if (hasRoles) {
			return (
				<Route key={routePath} element={<RequiredAuth requiredRoles={roles} />}>
					<Route
						path={path}
						element={
							<RouteElement
								element={element}
								routeItems={routeItems}
								pageSettings={settings}
							/>
						}
					/>
				</Route>
			);
		}

		return (
			<Route
				key={routePath}
				path={path}
				element={
					<RouteElement
						element={element}
						routeItems={routeItems}
						pageSettings={settings}
					/>
				}
			/>
		);
	}

	return (
		<Routes>
			{PageRoutes.map((route) => mountRoute(route))}
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}