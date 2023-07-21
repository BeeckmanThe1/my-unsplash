import React from 'react'
import {Button, Form, Input} from 'antd'
import {useLoginUser} from "../../client/react-query/user.api";

const Login = () => {
    const [form] = Form.useForm()
    const {mutate: login} = useLoginUser()
    const onSubmit = () => {
        const formValues = form.getFieldsValue()
        login({user: formValues})
    }

    return <>
        <h1>Login</h1>
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

export default Login