import { DeleteOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { REMOVE_PERSON, GET_PEOPLE } from '../../queries'

const RemovePerson = props => { 
    const { id } = props
    const [removePerson] = useMutation(REMOVE_PERSON, {
            update: (cache, { data: { removePerson } }) => {
                const data = cache.readQuery({ query: GET_PEOPLE });
                    cache.writeQuery({
                        query: GET_PEOPLE,
                        data: {
                            ...data,
                            people: data.people.filter(person => person.id !== id)
                        }
                    });
                }

    })

    const handleButtonClick = () => {
        let result = window.confirm("Are you sure you want to delete this person?")
        if (result) {
            removePerson({
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

export default RemovePerson