import React, {useState} from 'react';
import { EditOutlined } from "@ant-design/icons";
import { Card } from "antd";
import RemovePerson from "../buttons/RemovePerson";
import UpdatePerson from '../forms/UpdatePerson';


const getStyles = () => ({
    card: {
        minWidth: "1100px",
    }
});


const Person = props => { 
    const {firstName, lastName, id} = props;
    const styles = getStyles();

    const [editMode, setEditMode] = useState(false);
    
    const handleButtonClick = () => {
        setEditMode(!editMode);
    }

    
    return (
        <>
            {editMode
                ?
                <UpdatePerson onButtonClick={handleButtonClick}
                    id={id}
                    firstName={firstName}
                    lastName={lastName}
                     />

                : 
                <Card
                    style={styles.card}
                    actions={[
                    <EditOutlined key='edit' onClick={ handleButtonClick} />,    
                    <RemovePerson id={id} />
                ]}>
                    {firstName} {lastName}
                    
                </Card>
            }

        </>
   ) 
}

export default Person