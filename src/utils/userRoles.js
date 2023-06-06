const USER_ROLES = {
	ADMIN: "Admin",
};

const requireAll = (...roles) => {
	return roles.join("|");
};

const splitRoles = (roles) => {
	return roles.split("|");
};

const userHasRole = (role, userRoles) => {
	const splittedRole = splitRoles(role);
	const res = splittedRole?.every((r) => userRoles.includes(r));
	return res;
};

const verifyRoles = (requiredRoles, userRoles) => {
	const res = requiredRoles?.some((role) => userHasRole(role, userRoles));
	return res;
};

export { USER_ROLES, requireAll, splitRoles, verifyRoles, userHasRole };