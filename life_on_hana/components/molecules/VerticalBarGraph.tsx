'use client';

import { Bar, BarChart, Cell, LabelList, XAxis } from 'recharts';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { type TVerticalBarGraphProps } from '@/types/componentTypes';

export function VerticalBarGraph(items: { items: TVerticalBarGraphProps[] }) {
  if (!items) return;
  const chartData = [];

  for (let i = items.items.length - 1; i >= 0; i--) {
    const one = items.items[i];
    chartData.push({
      month:
        i == 0 ? '이번 달' : Number(one.month.toString().slice(5, 7)) + '월',
      totalExpense: one.totalExpense,
      formattedExpense: Math.round(one.totalExpense / 10000) + '만원',
    });
  }

  function createChartConfig(
    data: { month: string; totalExpense: number }[]
  ): ChartConfig {
    return data.reduce((config, item, index) => {
      config[item.month] = {
        label: item.month,
        color:
          index === data.length - 1
            ? 'var(--hanapurple)'
            : 'var(--hanalightpurple)',
      };
      return config;
    }, {} as ChartConfig);
  }

  const chartConfig = createChartConfig(chartData) satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className='h-[12rem] w-full'>
      <BarChart
        accessibilityLayer
        data={chartData}
        margin={{
          top: 20,
        }}
      >
        {/* <CartesianGrid vertical={false} /> */}
        <XAxis
          dataKey='month'
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          className='font-SCDream4 text-[.9rem]'
        />
        <Bar dataKey='totalExpense' radius={8}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={chartConfig[entry.month].color} />
          ))}
          <LabelList
            dataKey='formattedExpense'
            position='top'
            style={{ fill: 'black' }}
            offset={12}
            fontSize={10}
            className='font-SCDream4 text-[.9375rem]'
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
