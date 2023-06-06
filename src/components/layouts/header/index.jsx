import { useContext, useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { GoSignOut } from "react-icons/go";
import { RiUserLine, RiUserShared2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { USER_ROLES } from "../../../utils/userRoles";

import styles from "./index.module.css";

export default function Header() {
	const [scrollY, setScrollY] = useState(0);
	const [borderStyle, setBorderStyle] = useState("none");

	const { t } = useTranslation("header");

	const { user, hasRoles, signOut, getUserAreaPath } = useContext(AuthContext);

	function handleScroll() {
		setScrollY(window.scrollY);
	}

	useEffect(() => {
		function watchScroll() {
			window.addEventListener("scroll", handleScroll);
		}
		watchScroll();
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	});

	useEffect(() => {
		if (scrollY > 30) {
			setBorderStyle("1px solid var(--tcColor1)");
		} else {
			setBorderStyle("none");
		}
	}, [scrollY, setBorderStyle]);

	const loginUrl = "/auth/signIn";
	const logoutRedirect = "/";
	const accountUrl = getUserAreaPath();

	return (
		<>
			<div className={styles.headerTop}>
				<Container fluid="xxl" className={styles.headerTopCointainer}>
					<div>
						{user ? (
							<span>
								<Link to={accountUrl}>
									{user.name ? user.name.split(" ").shift() : user.userName}
								</Link>
								,{" "}
								<Link
									to={logoutRedirect}
									onClick={signOut}
									style={{ marginLeft: 0 }}
								>
									{t("signOut")} <GoSignOut />
								</Link>
							</span>
						) : (
							<Link to={loginUrl}>
								{t("headerTop.login")} <RiUserShared2Line />
							</Link>
						)}
					</div>
				</Container>
			</div>
			<Navbar
				expand="lg"
				sticky="top"
				className={styles.headerMain}
				style={{ padding: "1.5rem 0", borderBottom: borderStyle }}
			>
				<Container>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Brand as={Link} className={styles.logo} to="/">
						<img src="/imgs/telecall-logo.svg" alt="Telecall" />
					</Navbar.Brand>
					<Navbar.Collapse
						className={styles.collapseArea}
						id="basic-navbar-nav"
					>
						{user && hasRoles([USER_ROLES.ADMIN]) ? (
							<Nav>
								<Nav.Link href="/admin">Home</Nav.Link>
							</Nav>
						) : null}
						<Nav className={styles.navTopHiddenLinks}>
							<NavDropdown.Divider />
							{user ? (
								<>
									<Nav.Link href={accountUrl}>
										{user.name ? user.name.split(" ").shift() : user.userName}{" "}
										<RiUserLine />
									</Nav.Link>
									<Nav.Link href={logoutRedirect} onClick={signOut}>
										{t("signOut")} <GoSignOut />
									</Nav.Link>
								</>
							) : (
								<Nav.Link href={loginUrl}>
									{t("headerTop.login")} <RiUserShared2Line />
								</Nav.Link>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
}
