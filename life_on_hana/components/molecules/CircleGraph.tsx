"use client";

import { Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { type TGraphProps } from "@/types/componentTypes";
import { bluePurpleColors } from "@/utils/colors";
import { getHistoryToKorean } from "@/utils/convertEnumtoString";

export function CircleGraph({
  type,
  expenseCategories,
  depositPercentage,
  savingsPercentage,
  loanPercentage,
  stockPercentage,
  realEstatePercentage,
}: TGraphProps) {
  if (type === "mydata" && !expenseCategories) {
    return <div>데이터가 없습니다.</div>;
  }

  const chartData =
    type === "mydata" && expenseCategories
      ? expenseCategories.map((category, index) => ({
          name: category.category,
          value: category.percentage || 0,
          fill: bluePurpleColors[index % bluePurpleColors.length],
        }))
      : [
          {
            name: "deposit",
            value: depositPercentage || 0,
            fill: bluePurpleColors[0],
          },
          {
            name: "savings",
            value: savingsPercentage || 0,
            fill: bluePurpleColors[1],
          },
          {
            name: "loan",
            value: loanPercentage || 0,
            fill: bluePurpleColors[2],
          },
          {
            name: "stock",
            value: stockPercentage || 0,
            fill: bluePurpleColors[3],
          },
          {
            name: "realEstate",
            value: realEstatePercentage || 0,
            fill: bluePurpleColors[4],
          },
        ];

  const chartConfig =
    type === "mydata"
      ? expenseCategories?.reduce((acc, category, index) => {
          acc[category.category] = {
            label: getHistoryToKorean(category.category),
            percent: category.percentage + "%",
            color: bluePurpleColors[index % bluePurpleColors.length],
          };
          return acc;
        }, {} as ChartConfig) || {}
      : ({
          deposit: {
            label: "예금",
            percent: depositPercentage + "%",
            color: bluePurpleColors[0],
          },
          savings: {
            label: "적금",
            percent: savingsPercentage + "%",
            color: bluePurpleColors[1],
          },
          loan: {
            label: "대출",
            percent: loanPercentage + "%",
            color: bluePurpleColors[2],
          },
          stock: {
            label: "주식",
            percent: stockPercentage + "%",
            color: bluePurpleColors[3],
          },
          realEstate: {
            label: "부동산",
            percent: realEstatePercentage + "%",
            color: bluePurpleColors[4],
          },
        } satisfies ChartConfig);

  return (
    <div>
      <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
        <PieChart>
          <Pie data={chartData} dataKey="value" />
          <ChartLegend
            content={<ChartLegendContent nameKey="name" />}
            className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
          />
        </PieChart>
      </ChartContainer>
    </div>
  );
}
