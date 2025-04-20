const useAuth = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const isLoggedIn = !!token;
    const isAdmin = role === "admin";

    return { token, role, isLoggedIn, isAdmin };
};

export default useAuth;
