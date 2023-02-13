import React, { useContext, useEffect, useState } from "react";
import { UserContext } from '../components/UserContext';
import { Bar } from 'react-chartjs-2';
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement)


const TopPerformers = () => {
  const theme = useTheme();
  const {user, loggedIn} = useContext(UserContext);
  const [userList, setuserList] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
      fetch('http://localhost:3000/users', {
          headers: {
              "Content-Type": "application/json",
              "Authorization": token
          }
      })
      .then(r => r.json())
      .then(data => setuserList(data))
  }, []);

    if (!userList) return null;
    const sortedArray = userList.sort((a, b) => b.closed_case_count - a.closed_case_count);
    const topFive = sortedArray.slice(0, 5);
    const closedCaseCounts = topFive.map(object => object.closed_case_count);
    const openCaseCounts = topFive.map(object => object.open_case_count);
    const topNames = topFive.map(object => object.first_name + " " + object.last_name);

  const data = {
    datasets: [
      {
        backgroundColor: '#3F51B5',
        barPercentage: 0.5,
        barThickness: 30,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: closedCaseCounts,
        label: 'Closed Cases',
        maxBarThickness: 30
      },
      {
        backgroundColor: '#e53935',
        barPercentage: 0.5,
        barThickness: 30,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: openCaseCounts,
        label: 'Open Cases',
        maxBarThickness: 30
      }
    ],
    labels: topNames
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    xAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
          beginAtZero: true,
          min: 0
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: theme.palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: theme.palette.divider
        }
      }
    ],
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

  return (
    <Card>
      <CardHeader title="Top 5 Performers" style={{textAlign: "center"}} />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <Bar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default TopPerformers;