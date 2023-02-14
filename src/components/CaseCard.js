import React from "react";
import { useNavigate } from 'react-router-dom';
import { TableRow, TableCell } from '@mui/material/';

const CaseCard = ({ userCase }) => {
    const navigate = useNavigate();
    // Destructure the userCase object
    const {id, allegation_type, department, status, days_ago} = userCase;
    // Set up a state variable to keep track of whether the user is hovering over the table row
    const [hover, setHover] = useState(false);

    // Navigates to the individual case page when the row is clicked
    const handleClick = (e) => {
        navigate(`/cases/${id}`)
    }

    // Define styles for the table row
    const styles = {
        tableRow: {
            cursor: 'pointer'
        },
        tableRowHover: {
            backgroundColor: '#eee',
            cursor: 'pointer'
        }
    };

    // Handle mouse enter event
    const handleMouseEnter = () => {
        setHover(true);
    };
    // Handle mouse leave event
    const handleMouseLeave = () => {
        setHover(false);
    };
    
    return (
        <TableRow 
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={hover ? styles.tableRowHover : styles.tableRow}
        >
            <TableCell>{allegation_type}</TableCell>
            <TableCell>{department}</TableCell>
            <TableCell>{status}</TableCell>
            <TableCell>{`created ${days_ago}`}</TableCell>
        </TableRow>
    );
};

export default CaseCard;