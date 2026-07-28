import React, { useEffect } from "react";
import Chart from "chart.js/auto";
import moment from "moment";

function LineChart({ data }) {
  let predictions = [];
  let times = [];
  moment.locale("es");

  data.forEach((element) => {
    predictions.push(element.predicciones);
    times.push(moment(element.time).format("lll"));
  });

  useEffect(() => {
    var themeColor = getComputedStyle(document.body)
      .getPropertyValue("--bs-theme")
      .trim();
    var themeColorRgb = getComputedStyle(document.body)
      .getPropertyValue("--bs-theme-rgb")
      .trim();
    var bodyBg = getComputedStyle(document.body)
      .getPropertyValue("--bs-body-bg")
      .trim();
    Chart.defaults.color = "#fff";
    const myChart = new Chart(document.getElementById("lineChart"), {
      type: "line",
      data: {
        labels: times,
        datasets: [
          {
            color: themeColor,
            backgroundColor: "rgba(" + themeColorRgb + ", .2)",
            borderColor: themeColor,
            borderWidth: 1.5,
            pointBackgroundColor: bodyBg,
            pointBorderWidth: 1.5,
            pointRadius: 4,
            pointHoverBackgroundColor: bodyBg,
            pointHoverBorderColor: themeColor,
            pointHoverRadius: 7,
            label: "BTC",
            data: predictions,
          },
        ],
      },
    });
    // when component unmounts
    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <div>
      <canvas id="lineChart"></canvas>
    </div>
  );
}

export default LineChart;
