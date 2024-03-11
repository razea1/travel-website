import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

interface IVacation {
  idVacation: number;
  destination: string;
  likes: number;
}

function VacationReportPage(): JSX.Element {
  const [vacations, setVacations] = useState<IVacation[]>([]);

  useEffect(() => {
    axios.get<IVacation[]>("http://localhost:3001/api/vacations").then((response) => {
      setVacations(response.data);
    });
  }, []);

  const prepareChartData = () => {
    const chartData = {
      labels: vacations.map((vacation) => vacation.destination),
      datasets: [
        {
          label: "Number of Likes",
          data: vacations.map((vacation) => vacation.likes),
          backgroundColor: "rgba(75,192,192,0.6)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 1,
        },
      ],
    };
    return chartData;
  };

  return (
    <div>
      <h2>Vacation Likes Report:</h2>
      <div className="VacationReportPage">
        <Bar
          data={prepareChartData()}
          options={{
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
            },
            scales: {
              x: {
                ticks: {
                  autoSkip: false,
                  maxRotation: 90,
                  minRotation: 90,
                },
              },
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default VacationReportPage;
