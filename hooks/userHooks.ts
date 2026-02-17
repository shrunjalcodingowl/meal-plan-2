import { useSelector } from "react-redux"


export const useDetailHooks = () => {

    const {  token, userDetails, isLogin, selectedAddress } = useSelector(state => state.userData)
    return{
        token, userDetails, isLogin, selectedAddress
    }
}