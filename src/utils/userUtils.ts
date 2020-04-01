import User from "../store/User";

export const getUserUuid = (user: User | null): string | null => (user && user.login) ? user.login.uuid : null;