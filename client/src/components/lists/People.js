import { List } from "antd";
import { useQuery } from "@apollo/client";
import { GET_PEOPLE } from "../../queries";
import Person from "../listItems/Person";
import Cars from "../lists/Cars";

const getStyles = () => ({
    list: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
    }
});

const People = () => {
    const styles = getStyles();
    
    const {loading, error, data} = useQuery(GET_PEOPLE);
    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`


    return (
        <List grid={{gutter: 20, column: 1} } style={styles.list}>
            {data.people.map(({firstName, lastName, id}) => (
                <List.Item key={id}>
                    <Person firstName={firstName} lastName={lastName} id={id} />
                    <List.Item>
                        <Cars ownerId={id} />
                    </List.Item>
                 
                </List.Item>
          ))} 
        </List>
)

}

export default People;