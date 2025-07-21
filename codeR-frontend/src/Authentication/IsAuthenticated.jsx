

export default function isAuthenticated(){
    return document.cookie.includes("refreshToken");
}