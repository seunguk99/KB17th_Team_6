import Chart from 'chart.js/auto';

// 차트 데이터 생성 함수
export const createChartData = (income, expense) => ({
  labels: ['수입', '지출'],
  datasets: [
    {
      data: [income, expense],
      backgroundColor: ['#4CAF50', '#FF5252'], // 초록색(수입), 빨간색(지출)
      hoverBackgroundColor: ['#66BB6A', '#FF1744'],
    },
  ],
});

// 차트 옵션
export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
};

export { Chart };
