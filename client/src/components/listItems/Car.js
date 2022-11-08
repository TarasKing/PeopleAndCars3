import React, {useState} from 'react';
import { EditOutlined } from "@ant-design/icons";
import { Card } from "antd";
import RemoveCar from "../buttons/RemoveCar";
import UpdateCar from '../forms/UpdateCar';


const getStyles = () => ({
    card: {
        minWidth: "1000px",
    }
});


const Car = props => { 
    const {id, make, model, year, price, personId} = props;
    const styles = getStyles();

    const [editMode, setEditMode] = useState(false);
    
    const handleButtonClick = () => {
        setEditMode(!editMode);
    }

    
    return (
        <>
            {editMode
                ?
                <UpdateCar onButtonClick={handleButtonClick}
                    id={id}
                    make={make}
                    model={model}
                    year={year}
                    price={price}
                    personId={personId}
                     />

                : 
                <Card
                    style={styles.card}
                    actions={[
                    <EditOutlined key='edit' onClick={ handleButtonClick} />,    
                    <RemoveCar id={id} />
                ]}>
                {make} {model} {year} {price} {personId}
                </Card>
            }

        </>
   ) 
}

export default Car