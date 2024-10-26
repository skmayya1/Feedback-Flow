export const useToken = () => {
    const cookieString = document.cookie;
    const myCookie = cookieString
        .split('; ')
        .find(cookie => cookie.startsWith('accesskey='));
    const accessKeyValue = myCookie ? myCookie.split('=')[1] : null;
    return accessKeyValue;
}
