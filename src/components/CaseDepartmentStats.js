import React from "react";
import { Doughnut } from 'react-chartjs-2';
import Switch from '@mui/material/Switch';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// Register the chart.js plugins for the chart type and options
ChartJS.register(ArcElement, Tooltip, Legend);

const CaseDepartmentStats = ({ allCases, checked, onChange }) => {
  const theme = useTheme();
  if (!allCases) return null;
  
  // Calculate the total number of cases and the percentage breakdown by department
  const total = Object.values(allCases).reduce((acc, val) => acc + val, 0);
  const percentages = Object.keys(allCases).reduce((acc, key) => {
    acc[key] = Math.round(allCases[key] / total * 100);
    return acc;
  }, {});
  
  // Calculate the remaining percentage and add it to the last department
  const remainingPercentage = 100 - Object.values(percentages).reduce((acc, val) => acc + val, 0);
  percentages[Object.keys(percentages)[Object.keys(percentages).length - 1]] += remainingPercentage;
  // Convert the percentages object to an array of values
  const totalCases = Object.values(allCases)
  const percentValues = Object.values(percentages);
  const percentKeys = Object.keys(percentages)

  // Change the switch's value when it is toggled
  const handleChange = (e) => {
    onChange(e.target.checked)
  }

  const data = {
    datasets: [
      {
        data: totalCases,
        backgroundColor: ['#3F51B5', '#e53935', '#FB8C00', '#1E88E5', '#81C784'],
        borderWidth: 1,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF'
      }
    ],
    labels: percentKeys
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

  // Define the devices array for displaying the department breakdown
  const devices = [
    {
      title: percentKeys[0],
      value: percentValues[0],
      color: '#3F51B5'
    },
    {
      title: percentKeys[1],
      value: percentValues[1],
      color: '#E53935'
    },
    {
      title: percentKeys[2],
      value: percentValues[2],
      color: '#FB8C00'
    },
    {
      title: percentKeys[3],
      value: percentValues[3],
      color: '#1E88E5'
    },
    {
      title: percentKeys[4],
      value: percentValues[4],
      color: '#81C784'
    }
  ];

  // Displays a chart of allegations by department
  return (
    <Card>
      <Switch checked={checked} onChange={handleChange} />
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