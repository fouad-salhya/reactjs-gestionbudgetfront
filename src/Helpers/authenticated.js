export const isAuthenticated = () => {

    const jwt = localStorage.getItem('JWT');

    if(jwt) {

        return JSON.parse(jwt)

    }
        return false

}