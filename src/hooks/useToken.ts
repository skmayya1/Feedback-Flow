export const useToken = () => {
    if (typeof window === 'undefined') {
        return null;
    }

    const cookieString = document.cookie;
    const myCookie = cookieString
        .split('; ')
        .find(cookie => cookie.startsWith('accesskey='));
    const accessKeyValue = myCookie ? myCookie.split('=')[1] : null;

    return accessKeyValue;
}
