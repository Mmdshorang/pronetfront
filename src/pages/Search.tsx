import { useState } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardContent,
  Typography,
  Rating,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

interface SearchResult {
  id: string;
  name: string;
  type: 'employee' | 'company';
  position?: string;
  company?: string;
  skills?: string[];
  rating: number;
  industry?: string;
}

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [results] = useState<SearchResult[]>([
    {
      id: '1',
      name: 'علی محمدی',
      type: 'employee',
      position: 'توسعه‌دهنده فرانت‌اند',
      company: 'شرکت فناوری اطلاعات',
      skills: ['React', 'TypeScript', 'Material-UI'],
      rating: 4.5,
    },
    {
      id: '2',
      name: 'شرکت توسعه نرم‌افزار',
      type: 'company',
      industry: 'توسعه نرم‌افزار',
      rating: 4.2,
    },
    {
      id: '3',
      name: 'مریم احمدی',
      type: 'employee',
      position: 'طراح رابط کاربری',
      company: 'شرکت فناوری اطلاعات',
      skills: ['UI/UX', 'Figma', 'Adobe XD'],
      rating: 4.8,
    },
  ]);

  const filteredResults = results.filter((result) => {
    const matchesSearch = result.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === 'all' || result.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        جستجو
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            placeholder="جستجو..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>نوع</InputLabel>
            <Select
              value={filter}
              label="نوع"
              onChange={(e) => setFilter(e.target.value)}
            >
              <MenuItem value="all">همه</MenuItem>
              <MenuItem value="employee">کارمند</MenuItem>
              <MenuItem value="company">شرکت</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {filteredResults.map((result) => (
          <Grid item xs={12} md={6} key={result.id}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                >
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {result.name}
                    </Typography>
                    {result.type === 'employee' && (
                      <>
                        <Typography color="textSecondary" gutterBottom>
                          {result.position}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {result.company}
                        </Typography>
                      </>
                    )}
                    {result.type === 'company' && (
                      <Typography color="textSecondary">
                        {result.industry}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Rating value={result.rating} readOnly precision={0.5} />
                    <Typography sx={{ ml: 1 }}>
                      {result.rating.toFixed(1)}
                    </Typography>
                  </Box>
                </Box>

                {result.skills && (
                  <Box sx={{ mt: 2 }}>
                    {result.skills.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                      />
                    ))}
                  </Box>
                )}

                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      // TODO: Implement view profile
                      console.log('View profile:', result.id);
                    }}
                  >
                    مشاهده پروفایل
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Search; 