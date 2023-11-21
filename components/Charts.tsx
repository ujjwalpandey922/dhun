import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Charts = ({
  amount,
}: {
  amount: {
    category_6: number;
    category_7: number;
    category_8: number;
    category_9: number;
    category_10: number;
  };
}) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        position: "bottom",
        color: "#F0C3F1",
        grid: {
          display: true,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: () => `₹`,
          stepSize: 50,
        },
        color: "#F0C3F1",
        grid: {
          display: true,
        },
      },
    },
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 0,
        bottom: 20,
      },
    },
    elements: {
      line: {
        borderWidth: 2,
      },
    },
  };

  const labels = [
    "Custom",
    "Category 1",
    "Category 2",
    "Category 3",
    "Category 4",
  ];

  const data = {
    labels,
    datasets: [
      {
        data: [
          amount.category_6,
          amount.category_7,
          amount.category_8,
          amount.category_9,
          amount.category_10,
        ],
        backgroundColor: "#F0C3F1",
        barThickness: 30,
      },
    ],
  };
  return (
    <div className="w-full">
       {/* @ts-ignore */}
      <Bar options={options} data={data} />
    </div>
  );
};

export default Charts;
