import React, {useState, useEffect} from 'react';
import '../../App.css';
import { Form, Input, Select } from 'antd'
import { useQuery } from "@apollo/client";
import { useMutation } from '@apollo/client';
import { ADD_CAR, GET_CARS, GET_PEOPLE } from "../../queries";
import { v4 as uuidv4 } from 'uuid';

const AddCars = () => { 

    // const {loading, error, dataPeop} = useQuery(GET_PEOPLE);
    // if (loading) return 'Loading...'
    // if (error) return `Error! ${error.message}`

    const [id] = useState(uuidv4());
    const [addCar] = useMutation(ADD_CAR)

    const [form] = Form.useForm();
    const [, forceUpdate] = useState();

    useEffect(() => { 
        forceUpdate({});
    }, []);

    const onFinish = values => {
        const { make, year, model, price, personId } = values;
        
        addCar({
            variables: {
                id,
                make,
                year,
                model,
                price,
                personId
            },
            update: (cache, { data: { addCar } }) => {
                const data = cache.readQuery({ query: GET_CARS });
                cache.writeQuery({
                    query: GET_CARS,
                    data: {
                        ...data,
                        cars: [...data.cars, addCar]
                    }
                });
            }
        })
    }








    return (<>
        <h2>Add Cars Form</h2>
        <Form
            name='add-car-form'
            size='large'
            layout='inline'
            style={{ marginBottom: '40px' }}>
            <Form.Item name="year"
            rules={[{ required: true, message: 'Year' }]}>
                <Input placeholder="Year" />
            </Form.Item>
            <Form.Item name="make"
            rules={[{ required: true, message: 'Make' }]}>
                <Input placeholder="Make" />
            </Form.Item>
            <Form.Item name="model"
            rules={[{ required: true, message: 'Model' }]}>
                <Input placeholder="Model" />
            </Form.Item>
            <Form.Item name="price"
            rules={[{ required: true, message: 'Price' }]}>
                <Input placeholder="Price" />
            </Form.Item>
                
            <Form.Item name="personId">
                <Select>
                    {/* {dataPeop.people.map(({ id, firstName, lastName }) => (
                        id === dataPeop.people.personId ?
                        <Select.Option value={id} key={id}>{firstName} {lastName}</Select.Option>
                        : null
                    ))}  */}
                   
                </Select>
            </Form.Item>
 
            


        </Form>
        </>
       

        
    )
}

export default AddCars