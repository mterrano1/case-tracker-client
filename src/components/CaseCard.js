import React from "react";
import { useNavigate } from 'react-router-dom';
import { TableRow, TableCell } from '@mui/material/';

const CaseCard = ({ userCase }) => {
    const navigate = useNavigate();
    const {id, allegation_type, department, status, days_ago} = userCase;
    const [hover, setHover] = React.useState(false);

    const handleClick = (e) => {
        navigate(`/cases/${id}`)
    }

    const styles = {
        tableRow: {
            cursor: 'pointer'
        },
        tableRowHover: {
            backgroundColor: '#eee',
            cursor: 'pointer'
        }
    };

    const handleMouseEnter = () => {
        setHover(true);
    };

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