import React from "react";
import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const CaseDepartmentStats = ({ allCases }) => {
  const theme = useTheme();
  if (!allCases) return null;
  
  const total = Object.values(allCases).reduce((acc, val) => acc + val, 0);
  const percentages = Object.keys(allCases).reduce((acc, key) => {
    acc[key] = Math.round(allCases[key] / total * 100);
    return acc;
  }, {});
  
  const remainingPercentage = 100 - Object.values(percentages).reduce((acc, val) => acc + val, 0);
  
  percentages[Object.keys(percentages)[Object.keys(percentages).length - 1]] += remainingPercentage;

  const percentValues = Object.values(percentages);

  const data = {
    datasets: [
      {
        data: percentValues,
        backgroundColor: ['#3F51B5', '#e53935', '#FB8C00', '#1E88E5', '#81C784'],
        borderWidth: 1,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF'
      }
    ],
    labels: ['Business Banking', 'Home Mortgage', 'Local Branch', 'Phone Bank', 'Wealth Management']
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const devices = [
    {
      title: 'Business Banking',
      value: percentValues[0],
      color: '#3F51B5'
    },
    {
      title: 'Home Mortgage',
      value: percentValues[1],
      color: '#E53935'
    },
    {
      title: 'Local Branch',
      value: percentValues[2],
      color: '#FB8C00'
    },
    {
      title: 'Phone Bank',
      value: percentValues[3],
      color: '#1E88E5'
    },
    {
      title: 'Wealth Management',
      value: percentValues[3],
      color: '#81C784'
    }
  ];

  return (
    <Card>
      <CardHeader title="Allegations by Department" style={{textAlign: "center"}} />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 600,
            position: 'relative'
          }}
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          {devices.map(({
            color,
            title,
            value
          }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h4"
              >
                {value}
                %
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CaseDepartmentStats;