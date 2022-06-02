import Moralis from "moralis";

export const login = async () => {
    let user = Moralis.User.current();

    if (!user) {
        await Moralis.authenticate({
            signingMessage: "Log in for customizer",
        })
            .then((userResponse) => {
                user = userResponse;
            })
    }

    return user;
};

export const logout = async () => {
    await Moralis.User.logOut();
}