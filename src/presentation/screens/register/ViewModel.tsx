import React, { useState } from 'react'

export const RegisterViewModel = () => {
    const [values, setValues] = useState({
        names:'',
        surnames: '',
        email: '',
        phone: '',
        password: '',
        repeatPassword: ''

    });

    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value })
    }

    const register = () => {
        console.log(JSON.stringify(values))
    }

    return {
        ...values,
        onChange,
        register,
    }
}

export default RegisterViewModel;