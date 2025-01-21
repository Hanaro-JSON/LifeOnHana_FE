'use client';

import { Bar, BarChart, Cell, LabelList, XAxis } from 'recharts';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { type TVerticalBarGraphProps } from '@/types/componentTypes';

export function VerticalBarGraph(items: { items: TVerticalBarGraphProps[] }) {
  const chartData = [];

  for (let i = 0; i < items.items.length; i++) {
    const one = items.items[i];
    chartData.push({
      month:
        i == items.items.length - 1
          ? '이번 달'
          : Number(one.month.toString().slice(4, 6)) + '월',
      totalExpense: one.totalExpense,
      formattedExpense: one.totalExpense / 10000 + '만원',
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
    <ChartContainer config={chartConfig} className='h-[10rem] w-full'>
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
          className='font-SCDream3 font-bold'
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
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
