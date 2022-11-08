import { DeleteOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { REMOVE_CAR, GET_CARS } from '../../queries'

const RemoveCar = props => { 
    const { id } = props
    const [removeCar] = useMutation(REMOVE_CAR, {
            update: (cache, { data: { removeCar } }) => {
                const data = cache.readQuery({ query: GET_CARS });
                    cache.writeQuery({
                        query: GET_CARS,
                        data: {
                            ...data,
                            people: data.cars.filter(car => car.id !== id)
                        }
                    });
                }

    })

    const handleButtonClick = () => {
        let result = window.confirm("Are you sure you want to delete this car?")
        if (result) {
            removeCar({
                variables: {
                    id
                }
            })
        }
    }

    return (
        <DeleteOutlined
            key="delete"
            onClick={handleButtonClick}
            style={ {color:"red"}} />
    )
}

export default RemoveCar