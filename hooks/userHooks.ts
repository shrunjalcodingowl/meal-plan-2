import { useSelector } from "react-redux"


export const useDetailHooks = () => {

    const {  token, userDetails, isLogin } = useSelector(state => state.userData)
    return{
        token, userDetails, isLogin
    }
}