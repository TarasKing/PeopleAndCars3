import { List } from "antd";
import { useQuery } from "@apollo/client";
import { GET_CARS } from "../../queries";
import Car from "../listItems/Car";

const getStyles = () => ({
    list: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
    }
});

const Cars = ({ownerId}) => {
    const styles = getStyles();
    
    const {loading, error, data} = useQuery(GET_CARS);
    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`


    return (
        
        <List grid={{gutter: 20, column: 1} } style={styles.list}>
            {data.cars.map(({ id, make, model, year, price, personId }) => (
                ownerId === personId ?
                <List.Item key={id}>
                    <Car id={ id} make={make} model={model} year={year} price={price} personId={personId} />
                    </List.Item>
                : null
          ))} 
        </List>
)

}

export default Cars;