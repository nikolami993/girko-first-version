import { useNavigate } from "react-router-dom";

export const useNavigateGroup = () => {
    const navigate = useNavigate();
    const navigateGroupUsers = () => {
        return navigate('/xxx')
    };
    return {
        navigateGroupUsers
    }
}
