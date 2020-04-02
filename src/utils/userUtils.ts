import User from "../store/User";

export const getUserUuid = (user: User | null): string | null => (user && user.login) ? user.login.uuid : null;

export const randomMeToUser = (response: any): User => {
    const user = response.results[0];
    return {
        name: {
            title: user.name.title,
            first: user.name.first,
            last: user.name.last
        },
        email: user.email,
        login: {
            uuid: user.login.uuid,
            username: user.login.username
        },
        picture: user.picture.thumbnail
    };
};