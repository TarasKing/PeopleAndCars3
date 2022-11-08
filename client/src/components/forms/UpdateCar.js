import { useMutation } from "@apollo/client";
import { Form, Input, Button } from "antd";
import React, {useState, useEffect} from 'react';
import { UPDATE_CAR } from "../../queries";

const UpdateCar = props => {
    const { id, make, model, year, price, personId } = props;
    const [updateCar] = useMutation(UPDATE_CAR);
    const [form] = Form.useForm();
    const [, forceUpdate] = useState();

    useEffect(() => {
        forceUpdate({});
    }, []);

    const onFinish = values => {
        const { make, model, year, price, personId } = values;

        updateCar({
            variables: {
                id,
                make,
                model,
                year,
                price,
                personId
            }
        })
     
        props.onButtonClick();
    }

    return (
        <Form
            form={form}
            name="update-car-form"
            layout="inline"
            onFinish={onFinish}
            initialValues={{
                make: make,
                model: model,
                year: year,
                price: price,
                personId: personId
                }}>
            <Form.Item name="make"
                rules={[{ required: true, message: 'Please input make of the car' }]}>
                <Input placeholder="Make" />
            </Form.Item>
            <Form.Item name="model"
                rules={[{ required: true, message: 'Please input your model' }]}>
                <Input placeholder="Model" />
            </Form.Item>
            <Form.Item name="year"
                rules={[{ required: true, message: 'Please input your year' }]}>
                <Input placeholder="Year" />
            </Form.Item>
            <Form.Item name="price"
                rules={[{ required: true, message: 'Please input your price' }]}>
                <Input placeholder="Price" />
            </Form.Item>
            <Form.Item name="personId"
                rules={[{ required: true, message: 'Please input your personId' }]}>
                <Input placeholder="PersonId" />
            </Form.Item>

            <Form.Item shouldUpdate={true}>
                {() => (
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={
                            !form.isFieldTouched('make') && !form.isFieldTouched('model') && !form.isFieldTouched('year') && !form.isFieldTouched('price') && !form.isFieldTouched('personId') ||
                            form.getFieldsError().filter(({ errors }) => errors.length).length
                        }>
                        Update Car
                    </Button>
                )}
                
            </Form.Item>
            <Button type="danger" onClick={props.onButtonClick}>Cancel</Button>
        </Form>
    )
}

export default UpdateCar