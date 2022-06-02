import Moralis from "moralis";

export const login = async () => {
    let user = Moralis.User.current();
    let error = "";

    if (!user) {
        await Moralis.authenticate({
            signingMessage: "Log in for customizer",
        })
            .then((userResponse) => {
                user = userResponse;
            })
            .catch(loginError => {
                error = loginError;
            });
    }
    return {user, error};
};

export const logout = async () => {
    await Moralis.User.logOut();
}