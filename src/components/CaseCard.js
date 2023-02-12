import React from "react";
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TableRow, TableCell, colors } from '@mui/material/';

const CaseCard = ({ userCase }) => {
    const {id, allegation_type, department, status, days_ago} = userCase;
    
    const theme = createTheme({
        palette: {
            primary: colors.blue,
        },
    });
    
    return (
        <ThemeProvider theme={theme}>
            <TableRow component={Link} to={`/cases/${id}`} style={{
                backgroundColor: 'white',
                transition: 'background-color 0.3s',
                '&:hover': {
                    backgroundColor: '#f2f2f2',
                }
            }}>
                <TableCell>{allegation_type}</TableCell>
                <TableCell>{department}</TableCell>
                <TableCell>{status}</TableCell>
                <TableCell>{`created ${days_ago}`}</TableCell>
            </TableRow>
        </ThemeProvider>
    );
};

export default CaseCard;




// import React from "react";
// import { Link } from 'react-router-dom';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { ListItem, ListItemText, Grid, colors } from '@mui/material/';

// const CaseCard = ({ userCase }) => {
//     const {id, allegation_type, department, status, days_ago} = userCase;
    
//     const theme = createTheme({
//         palette: {
//             primary: colors.blue,
//         },
//     });
    
//     return (
//         <ThemeProvider theme={theme}>
//             <ListItem component={Link} to={`/cases/${id}`} style={{
//                 backgroundColor: 'white',
//                 transition: 'background-color 0.3s',
//                 '&:hover': {
//                     backgroundColor: '#f2f2f2',
//                 }
//             }}>
//                 <Grid container alignItems="center">
//                     <Grid item xs={3}>
//                         <ListItemText primary={allegation_type} />
//                     </Grid>
//                     <Grid item xs={3}>
//                         <ListItemText primary={department} />
//                     </Grid>
//                     <Grid item xs={3}>
//                         <ListItemText primary={status} />
//                     </Grid>
//                     <Grid item xs={3}>
//                         <ListItemText secondary={`created ${days_ago}`} />
//                     </Grid>
//                 </Grid>
//             </ListItem>
//         </ThemeProvider>
//     );
// };

// export default CaseCard;





// import React from "react";
// import { Link } from 'react-router-dom';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { ListItem, ListItemText, Grid, colors } from '@mui/material/';

// const CaseCard = ({ userCase }) => {
//     const {id, allegation_type, department, status, days_ago} = userCase;
    
//     const theme = createTheme({
//         palette: {
//             primary: colors.blue,
//         },
//     });
    
//     return (
//         <ThemeProvider theme={theme}>
//             <ListItem component={Link} to={`/cases/${id}`}>
//                 <Grid container alignItems="center">
//                     <Grid item xs={6}>
//                         <ListItemText primary={allegation_type} secondary={department} />
//                     </Grid>
//                     <Grid item xs={6}>
//                         <ListItemText primary={status} secondary={`created ${days_ago}`} />
//                     </Grid>
//                 </Grid>
//             </ListItem>
//         </ThemeProvider>
//     );
// };

// export default CaseCard;



// import React from "react";
// import { Link } from 'react-router-dom';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { ListItem, ListItemText, Grid, colors } from '@mui/material/';

// const CaseCard = ({ userCase }) => {
//     const {id, allegation_type, department, status, days_ago} = userCase

//     const theme = createTheme({
//         palette: {
//             primary: colors.blue,
//         },
//     });

//     return (
//         <ThemeProvider theme={theme}>
//             <Grid item xs={12}>
//                 <ListItem button component={Link} to={`/cases/${id}`}>
//                     <ListItemText primary={allegation_type} secondary={department} />
//                     <ListItemText primary={status} secondary={`${days_ago} days ago`} />
//                 </ListItem>
//             </Grid>
//         </ThemeProvider>
//     )
// }
// export default CaseCard;




// import React from "react";
// import { Link } from 'react-router-dom';
// import { ListItem, ListItemText, Typography, Box, makeStyles } from '@mui/material/';

// const useStyles = makeStyles(theme => ({
//   root: {
//     padding: theme.spacing(2),
//     '&:hover': {
//       backgroundColor: theme.palette.action.hover,
//     },
//     '&:focus': {
//       backgroundColor: theme.palette.action.selected,
//     },
//   },
// }));

// const CaseCard = ({ userCase }) => {
//     const classes = useStyles();
//     const {id, allegation_type, department, status, days_ago} = userCase
//     return (
//         <Link to={`/cases/${id}`} style={{ textDecoration: 'none' }}>
//             <ListItem button className={classes.root}>
//                 <Box mr={2}>
//                     <Typography variant="subtitle1">{allegation_type}</Typography>
//                     <Typography variant="body2">{department}</Typography>
//                 </Box>
//                 <ListItemText
//                     primary={status}
//                     secondary={`${days_ago} days ago`}
//                 />
//             </ListItem>
//         </Link>
//     )
// };

// export default CaseCard;


// import React from "react";
// import { Link } from 'react-router-dom';
// import { ListItem, ListItemText } from '@mui/material/';

// const CaseCard = ({ userCase }) => {
//     const {id, allegation_type, department, status, days_ago} = userCase
//     return (
//         <ListItem button component={Link} to={`/cases/${id}`}>
//             <ListItemText primary={allegation_type} secondary={department} />
//             <ListItemText primary={status} secondary={`${days_ago} days ago`} />
//         </ListItem>
//     )
// }
// export default CaseCard;


// import React from "react";
// import { Link } from 'react-router-dom';

// const CaseCard = ({ userCase }) => {
//     const {id, allegation_type, department, status, days_ago} = userCase


//     return (

//         <li>
//             <Link to={`/cases/${id}`}>
//                 <p>{allegation_type}</p>
//                 <p>{department}</p>
//                 <p>{status}</p>
//                 <p>{days_ago}</p>
//             </Link>
//         </li>
//     )
// }

// export default CaseCard;