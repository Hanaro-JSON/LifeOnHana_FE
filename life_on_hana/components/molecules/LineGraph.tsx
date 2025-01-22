'use client';

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from '@/components/ui/chart';
import { type TLineGraphProps } from '@/types/componentTypes';
import { useEffect, useState } from 'react';

const chartConfig = {
  totalasset: {
    label: '총 자산',
    color: 'var(--hanadeepgreen)',
  },
  totalhanasalary: {
    label: '하나월급통장',
    color: 'var(--hanapurple)',
  },
} satisfies ChartConfig;

export function LineGraph({
  totalAsset,
  walletAmount,
  startDate,
  endDate,
  pensionStart,
  balance,
}: TLineGraphProps) {
  const getMonths = (end: string) => {
    const tempStartD = startDate.split('-');
    const tempEndD = end.split('-');
    const months =
      Number(tempEndD[0]) * 12 +
      Number(tempEndD[1]) -
      (Number(tempStartD[0]) * 12 + Number(tempStartD[1]));
    return months;
  };

  const [chartData, setChartData] = useState<
    {
      yearMonth: string;
      description: string;
      totalAsset: number;
      totalHanaSalary: number;
    }[]
  >([]);

  useEffect(() => {
    const generateChartData = () => {
      const tempStartD = startDate.split('-');
      const startYear = Number(tempStartD[0]);
      const startMonth = Number(tempStartD[1]);

      const months = getMonths(endDate);

      let currentBalance = balance;
      let currentTotalAsset = totalAsset;

      // 국민연금 수령연도 이후 10년까지 그래프로 보여주고 싶다면,
      // const pensionStartMonths = getMonths(pensionStart + '-01') + 120;
      // const biggerMonth =
      //   months > pensionStartMonths ? months : pensionStartMonths;
      const data = [];
      for (let i = 0; i <= months; i++) {
        const year = startYear + Math.floor((startMonth + i - 1) / 12);
        const month = ((startMonth + i - 1) % 12) + 1;
        const formattedMonth = `${year}년 ${month}월`;

        if (year == Number(pensionStart) && month == 1) {
          data.push({
            yearMonth: formattedMonth,
            description: '국민연금 수령',
            totalAsset: currentTotalAsset,
            totalHanaSalary: currentBalance,
          });
        } else if (i == 0) {
          data.push({
            yearMonth: formattedMonth,
            description: '현재',
            totalAsset: currentTotalAsset,
            totalHanaSalary: currentBalance,
          });
        } else {
          data.push({
            yearMonth: formattedMonth,
            description: formattedMonth,
            totalAsset: currentTotalAsset,
            totalHanaSalary: currentBalance,
          });
        }
        currentBalance -= walletAmount;
        currentTotalAsset -= walletAmount;
        if (year >= Number(pensionStart)) currentBalance += 669523;
      }
      const essentialData = [data[0]];
      let essentialDataflag = true;
      for (let i = 0; i < data.length; i++) {
        if (essentialDataflag && data[i].totalAsset <= 0) {
          const temp = { ...data[i], description: '잔액부족' };
          essentialData.push(temp);
          essentialDataflag = false;
        } else if (data[i].description === '국민연금 수령') {
          essentialData.push(data[i]);
        }
      }
      essentialData.push(data[data.length - 1]);
      return essentialData;
    };

    const tempChartData = generateChartData();
    setChartData(tempChartData);
  }, [startDate, endDate, walletAmount]);

  return (
    <ChartContainer config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{ right: 10, left: 10, top: 20 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis dataKey='description' tickLine={false} axisLine={false} />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value / 100000}만원`}
        />
        <ChartTooltip
          cursor={false}
          content={(props: TooltipProps<number, string>) => {
            if (props.active && props.payload && props.payload.length > 0) {
              const data = props.payload[0].payload;
              return (
                <div
                  style={{
                    background: 'white',
                    border: '1px solid #ccc',
                    padding: '10px',
                    borderRadius: '4px',
                  }}
                >
                  <strong>{data.yearMonth}</strong>
                  <p>총 자산: {data.totalAsset / 10000}만원</p>
                  <p>하나월급통장: {data.totalHanaSalary / 10000}만원</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Legend />
        <Line
          dataKey='totalAsset'
          name='총 자산'
          type='natural'
          stroke='var(--color-totalasset)'
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey='totalHanaSalary'
          name='하나월급통장'
          type='natural'
          stroke='var(--color-totalhanasalary)'
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
