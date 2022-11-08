import { useMutation } from "@apollo/client";
import { Form, Input, Button } from "antd";
import React, {useState, useEffect} from 'react';
import { UPDATE_PERSON } from "../../queries";

const UpdatePerson = props => {
    const { firstName, lastName, id } = props;
    const [updatePerson] = useMutation(UPDATE_PERSON);
    const [form] = Form.useForm();
    const [, forceUpdate] = useState();

    useEffect(() => {
        forceUpdate({});
    }, []);

    const onFinish = values => {
        const { firstName, lastName } = values;

        updatePerson({
            variables: {
                id,
                firstName,
                lastName
            }
        })
     
        props.onButtonClick();
    }

    return (
        <Form
            form={form}
            name="update-person-form"
            layout="inline"
            onFinish={onFinish}
            initialValues={{
                    firstName: firstName,
                    lastName: lastName
                }}>
            <Form.Item name="firstName"
                rules={[{ required: true, message: 'Please input your first name' }]}>
                <Input placeholder="First Name" />
            </Form.Item>
            <Form.Item name="lastName"
                rules={[{ required: true, message: 'Please input your last name' }]}>
                <Input placeholder="Last Name" />
            </Form.Item>
            <Form.Item shouldUpdate={true}>
                {() => (
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={
                            !form.isFieldTouched('fistName') && !form.isFieldTouched('lastName') ||
                            form.getFieldsError().filter(({ errors }) => errors.length).length
                        }>
                        Update Contact
                    </Button>
                )}
                
            </Form.Item>
            <Button type="danger" onClick={props.onButtonClick}>Cancel</Button>
        </Form>
    )
}

export default UpdatePerson