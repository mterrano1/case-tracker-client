import React, { useContext, useState } from "react";
import { useParams } from 'react-router-dom';
import { UserContext } from '../components/UserContext';
import DeleteCaseButton from '../components/DeleteCaseButton';
import CaseAssignmentForm from '../components/CaseAssignmentForm';
import CloseCaseForm from '../components/CloseCaseForm';
import CommentForm from '../components/CommentForm';
import Comments from '../components/Comments';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { Grid, Box } from "@mui/material";



const Case = () => {
    const { id } = useParams();
    const {user, userCases} = useContext(UserContext);
    const [commentResponse, setCommentResponse] = useState(false);
    const [newComment, setNewComment] = useState('');


    const addComment = (comment) => {
        setNewComment(comment)
    }


    const filterCase = userCases.filter(userCase => userCase.id === parseInt(id))
    const displayedCases = filterCase.map(displayedCase => (
        <Container component="main" maxWidth="xs" key={displayedCase.id}>
        <CssBaseline />
          <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          >
            <Card sx={{ maxWidth: 500 }} key={displayedCase.id}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {displayedCase.department}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {displayedCase.allegation_type}
              </Typography>
              <Typography variant="body2">
                Status: {displayedCase.status}
              </Typography>
              <Typography variant="body2">
                {displayedCase.status === 'Closed' ? `Resolution : ${displayedCase.resolution}` : null}
              </Typography><br/><br/>
              <Typography variant="body2">
                {displayedCase.allegation}
              </Typography><br/>
                <Comments caseId={displayedCase.id} newComment={newComment} setCommentResponse={setCommentResponse} commentResponse={commentResponse} />
              <Box componenet={CardActions} >
                <Grid item xs={12}>
                  {commentResponse ?
                  <CommentForm caseId={displayedCase.id} user={user} addComment={addComment} /> :
                  ''
                  }
                </Grid>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    {user.role === 'Manager' && displayedCase.status === "Unassigned" ?
                      <CaseAssignmentForm caseId={displayedCase.id} /> : null}
                  </Grid>
                  <Grid item xs={12}>
                    {user.role === 'Manager' ? <DeleteCaseButton caseId={displayedCase.id} /> : null}
                  </Grid>
                  <Grid item xs={12}>
                    {user.role === 'Researcher' && displayedCase.status === "Open" ? 
                    <CloseCaseForm caseId={displayedCase.id} /> : null}
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
            </Card>
          </Box>
        </Container>
    ))
  return (
    <div>{displayedCases}</div>
  );
}

export default Case;