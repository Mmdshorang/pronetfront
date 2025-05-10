import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Rating,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Divider,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

interface Evaluation {
  id: string;
  employeeName: string;
  position: string;
  date: string;
  professionalSkills: number;
  teamwork: number;
  ethics: number;
  feedback: string;
}

const Evaluations = () => {
  const { user } = useAuth();
  const [evaluations] = useState<Evaluation[]>([
    {
      id: '1',
      employeeName: 'علی محمدی',
      position: 'توسعه‌دهنده فرانت‌اند',
      date: '1402/12/15',
      professionalSkills: 4.5,
      teamwork: 4.0,
      ethics: 4.8,
      feedback: 'کارمند بسیار متعهد و با تجربه‌ای است.',
    },
    {
      id: '2',
      employeeName: 'مریم احمدی',
      position: 'طراح رابط کاربری',
      date: '1402/12/10',
      professionalSkills: 4.8,
      teamwork: 4.5,
      ethics: 4.2,
      feedback: 'خلاقیت و نوآوری خوبی در کار دارد.',
    },
  ]);

  const [newEvaluation, setNewEvaluation] = useState({
    professionalSkills: 0,
    teamwork: 0,
    ethics: 0,
    feedback: '',
  });

  const handleRatingChange = (category: string, value: number) => {
    setNewEvaluation((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleSubmit = () => {
    // TODO: Implement submit evaluation
    console.log('Submit evaluation:', newEvaluation);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        ارزیابی‌ها
      </Typography>

      {user?.role === 'employee' ? (
        <Grid container spacing={3}>
          {evaluations.map((evaluation) => (
            <Grid item xs={12} md={6} key={evaluation.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {evaluation.employeeName}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {evaluation.position}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    تاریخ: {evaluation.date}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography component="legend">قابلیت‌های حرفه‌ای</Typography>
                    <Rating value={evaluation.professionalSkills} readOnly />
                  </Box>
                  <Box sx={{ mt: 1 }}>
                    <Typography component="legend">کار تیمی</Typography>
                    <Rating value={evaluation.teamwork} readOnly />
                  </Box>
                  <Box sx={{ mt: 1 }}>
                    <Typography component="legend">اخلاق و روابط اجتماعی</Typography>
                    <Rating value={evaluation.ethics} readOnly />
                  </Box>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    {evaluation.feedback}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            ارزیابی جدید
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Typography component="legend">قابلیت‌های حرفه‌ای</Typography>
              <Rating
                value={newEvaluation.professionalSkills}
                onChange={(_, value) =>
                  handleRatingChange('professionalSkills', value || 0)
                }
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography component="legend">کار تیمی</Typography>
              <Rating
                value={newEvaluation.teamwork}
                onChange={(_, value) => handleRatingChange('teamwork', value || 0)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography component="legend">اخلاق و روابط اجتماعی</Typography>
              <Rating
                value={newEvaluation.ethics}
                onChange={(_, value) => handleRatingChange('ethics', value || 0)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="بازخورد"
                value={newEvaluation.feedback}
                onChange={(e) =>
                  setNewEvaluation((prev) => ({
                    ...prev,
                    feedback: e.target.value,
                  }))
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={
                  !newEvaluation.professionalSkills ||
                  !newEvaluation.teamwork ||
                  !newEvaluation.ethics ||
                  !newEvaluation.feedback
                }
              >
                ثبت ارزیابی
              </Button>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" gutterBottom>
            ارزیابی‌های قبلی
          </Typography>
          <Grid container spacing={3}>
            {evaluations.map((evaluation) => (
              <Grid item xs={12} md={6} key={evaluation.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {evaluation.employeeName}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      {evaluation.position}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      تاریخ: {evaluation.date}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Typography component="legend">قابلیت‌های حرفه‌ای</Typography>
                      <Rating value={evaluation.professionalSkills} readOnly />
                    </Box>
                    <Box sx={{ mt: 1 }}>
                      <Typography component="legend">کار تیمی</Typography>
                      <Rating value={evaluation.teamwork} readOnly />
                    </Box>
                    <Box sx={{ mt: 1 }}>
                      <Typography component="legend">اخلاق و روابط اجتماعی</Typography>
                      <Rating value={evaluation.ethics} readOnly />
                    </Box>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                      {evaluation.feedback}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default Evaluations; 