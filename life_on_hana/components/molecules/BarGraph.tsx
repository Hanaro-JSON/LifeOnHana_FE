"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getHistoryToKorean } from "@/utils/convertEnumtoString";
import { bluePurpleColors } from "@/utils/colors";
import { type TGraphProps } from "@/types/componentTypes";

export function BarGraph({
  type,
  expenseCategories,
  depositPercentage,
  savingsPercentage,
  loanPercentage,
  stockPercentage,
  realEstatePercentage,
}: TGraphProps) {
  const chartData =
    type === "mydata" && expenseCategories
      ? [
          {
            FOOD: expenseCategories.find((category) => category.category === "FOOD")?.percentage || 0,
            SNACK: expenseCategories.find((category) => category.category === "SNACK")?.percentage || 0,
            EDUCATION: expenseCategories.find((category) => category.category === "EDUCATION")?.percentage || 0,
            HOBBY: expenseCategories.find((category) => category.category === "HOBBY")?.percentage || 0,
            HEALTH: expenseCategories.find((category) => category.category === "HEALTH")?.percentage || 0,
            FIXED_EXPENSE: expenseCategories.find((category) => category.category === "FIXED_EXPENSE")?.percentage || 0,
            TRAVEL: expenseCategories.find((category) => category.category === "TRAVEL")?.percentage || 0,
            DEPOSIT: expenseCategories.find((category) => category.category === "DEPOSIT")?.percentage || 0,
            INTEREST: expenseCategories.find((category) => category.category === "INTEREST")?.percentage || 0,
            ETC: expenseCategories.find((category) => category.category === "ETC")?.percentage || 0,
          },
        ]
      : [
          {
            deposit: depositPercentage || 0,
            savings: savingsPercentage || 0,
            loan: loanPercentage || 0,
            stock: stockPercentage || 0,
            realEstate: realEstatePercentage || 0,
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
    <div className="flex justify-center w-full h-24 items-center">
      <ChartContainer config={chartConfig} className="h-24 w-full px-2">
        <BarChart
          accessibilityLayer
          data={chartData}
          layout="vertical"
          margin={{
            left: -60,
          }}
        >
          <XAxis type="number" hide domain={[0, 100]} />
          <YAxis
            dataKey="category"
            type="category"
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <ChartLegend content={<ChartLegendContent />} />

          {Object.entries(chartData[0]).map(([category, percentage], index) => {
            // Check if percentage is 0, if so, return null to skip rendering
            if (percentage === 0) return null;
            const filteredChartData = Object.entries(chartData[0]).filter(([, percentage]) => percentage > 0);
            const lengthOfFilteredData = filteredChartData.length;
            return (
              <Bar
                key={category}
                dataKey={category}
                stackId="a"
                fill={bluePurpleColors[index % bluePurpleColors.length]} // Assign colors dynamically
                radius={index === 0 ? [4, 0, 0, 4] : index === lengthOfFilteredData - 1 ? [0, 4, 4, 0] : [0, 0, 0, 0]}
              />
            );
          })}
        </BarChart>
      </ChartContainer>
    </div>
  );
}
