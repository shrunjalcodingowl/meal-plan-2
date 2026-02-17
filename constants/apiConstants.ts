

export const BASE_API = "https://api.egmealplan.com"
export const IMAGE_BASE_API = "https://api.egmealplan.com/api"
export const IMAGE_BASE_API2 = "https://api.egmealplan.com/api/uploads/"


export const API_CONSTANTS = {
    login : BASE_API + "/api/mobile/auth/login",
    verifyOtp : BASE_API + "/api/mobile/auth/verify-otp",
    resendOtp : BASE_API + "/api/mobile/auth/resend-otp",
    signUp : BASE_API + "/api/mobile/auth/signup",
    forgotPassword : BASE_API + "/api/mobile/auth/forgot-password",
    updatePassword : BASE_API + "/api/mobile/auth/update-password",
    getProfile : BASE_API + "/api/mobile/auth/profile",
    saveProfile : BASE_API + "/api/mobile/auth/save-profile",
    addressList : BASE_API + "/api/mobile/address/list",
    cityList : BASE_API + "/api/mobile/cities",
    zonesList : BASE_API + "/api/mobile/zones",
    districtList : BASE_API + "/api/mobile/districts",
    addAddress : BASE_API + "/api/mobile/address/add",
    deleteAddress : BASE_API + "/api/mobile/address/delete",
    defaultAddress : BASE_API + "/api/mobile/address/make-default",
    homeData : BASE_API + "/api/mobile/home",
    exploreData : BASE_API + "/api/mobile/packages",
    exploreDetails : BASE_API + "/api/mobile/packages/details",
    wishlist : BASE_API + "/api/mobile/wishlist/list",
    wishlistAdd : BASE_API + "/api/mobile/wishlist/toggle",
    addToCart : BASE_API + "/api/mobile/cart/add",
    cartList : BASE_API + "/api/mobile/cart/view",
    removeCart : BASE_API + "/api/mobile/cart/remove",
    paymentInit : BASE_API + "/api/mobile/payment/initiate",
    deleteUser: BASE_API + "/api/mobile/auth/delete-user",
}