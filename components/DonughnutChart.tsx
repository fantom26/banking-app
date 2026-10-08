'use client'

import { ArcElement, Chart as ChartJS, ChartData, Legend, Tooltip } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

function DoughnutChart({ data }: { data: ChartData<'doughnut'> }) {
  return (
    <Doughnut
      data={data}
      options={{
        cutout: '60%',
        plugins: {
          legend: {
            display: false
          }
        }
      }}
    />
  )
}

export default DoughnutChart
