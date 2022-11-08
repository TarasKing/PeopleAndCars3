import React, {useState, useEffect} from 'react';
import { Button, Form, Input } from 'antd'
import { v4 as uuidv4 } from 'uuid';
import { useMutation } from '@apollo/client';
import { ADD_PERSON, GET_PEOPLE } from '../../queries';


const AddPeople = () => { 

    const [id] = useState(uuidv4());
    const [addPerson] = useMutation(ADD_PERSON)

    const [form] = Form.useForm();
    const [, forceUpdate] = useState();

    useEffect(() => { 
        forceUpdate({});
    }, []);

    const onFinish = values => {
        const { firstName, lastName } = values;
        
        addPerson({
            variables: {
                id,
                firstName,
                lastName
            },
            update: (cache, { data: { addPerson } }) => {
                const data = cache.readQuery({ query: GET_PEOPLE });
                cache.writeQuery({
                    query: GET_PEOPLE,
                    data: {
                        ...data,
                        people: [...data.people, addPerson]
                    }
                });
            }
        })
    }

    return (
        <>
            <h2>Add People form</h2>
        <Form
            form={form}
            name='add-person-form'
            size='large'
            layout='inline'
            onFinish={onFinish}
            style={{ marginBottom: '40px' }} >
            <Form.Item name="firstName"
                rules={[{ required: true, message: 'Please input your first name' }]}
            >
                <Input placeholder="First Name" />
            </Form.Item>
            <Form.Item name="lastName"
            rules={[{ required: true, message: 'Please input your last name' }]}>
                <Input placeholder="Last Name" />
            </Form.Item>
            <Form.Item shouldUpdate={true}>
                {() => (
                    <Button
                        type='primary'
                        htmlType='submit'
                        disabled={
                            !form.isFieldsTouched(true) ||
                            form.getFieldError().filter(({ error }) => error.length).length
                        }>
                        Add Contact
                    </Button>
                )}
            </Form.Item>

        </Form>
        </>
        
    )
}

export default AddPeople