import React from 'react'
import { Form, Input, Button } from 'antd'
import {useRegisterUser} from "../../client/react-query/user.api";

const Register = () => {
    const [form] = Form.useForm()

    const {mutate: registerUser} = useRegisterUser()
    const onSubmit = () => {
        const formValues = form.getFieldsValue()
        registerUser({user: formValues})
    }

    return <>
        <h1>Register</h1>
        <Form form={form}>
            <Form.Item name={'username'} label={'Username'}>
                <Input />
            </Form.Item>
            <Form.Item name={'password'} label={'Password'}>
                <Input type={'password'}/>
            </Form.Item>
            <Button onClick={onSubmit} >Submit</Button>
        </Form>
    </>
}

export default Register