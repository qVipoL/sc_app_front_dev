const emailRegEx = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

export const isLoginFormValid = (formData) => {
    let errors = {}
    if(!emailRegEx.test(formData.email)){
        errors.email = 'Email Not Valid'
    }
    if(formData.password.length < 8){
        errors.password = 'Password Not Valid'
    }
    return errors
}

export const isRegisterFormValid = (formData) => {
    let errors = {}
    if(!emailRegEx.test(formData.email)){
        errors.email = 'Email Not Valid'
    }
    if(formData.password.length < 8){
        errors.password = 'Password Too Short'
    }
    if(formData.password !== formData.confirmPassword){
        errors.confirmPassword = 'Passwords Should Match'
    }
    if(formData.handle.length < 8 ){
        errors.handle = 'User-Name Too Short'
    }
    return errors
}