"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { type TLineGraphProps } from "@/types/componentTypes";
import { useEffect, useState } from "react";

const chartConfig = {
  totalasset: {
    label: "총 자산",
    color: "hsl(var(--chart-1))",
  },
  totalhanasalary: {
    label: "하나월급통장",
    color: "hsl(var(--chart-2))",
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
    const tempStartD = startDate.split("-");
    const tempEndD = end.split("-");
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
      const tempStartD = startDate.split("-");
      const startYear = Number(tempStartD[0]);
      const startMonth = Number(tempStartD[1]);

      const months = getMonths(endDate);

      let currentBalance = balance;
      let currentTotalAsset = totalAsset;

      const pensionStartMonths = getMonths(pensionStart + "-01") + 120;
      const biggerMonth =
        months > pensionStartMonths ? months : pensionStartMonths;
      const data = [];
      for (let i = 0; i <= biggerMonth; i++) {
        const year = startYear + Math.floor((startMonth + i - 1) / 12);
        const month = ((startMonth + i - 1) % 12) + 1;
        const formattedMonth = `${year}년 ${month}월`;

        if (year == Number(pensionStart) && month == 1) {
          data.push({
            yearMonth: formattedMonth,
            description: "국민연금 수령년도",
            totalAsset: currentTotalAsset,
            totalHanaSalary: currentBalance,
          });
        } else if (i == 0) {
          data.push({
            yearMonth: formattedMonth,
            description: "현재",
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
      const essentialData = [
        data[0],
        data.find((d) => d.description === "국민연금 수령년도"),
        data.find((d) => d.totalAsset < 0),
        data[data.length - 1],
      ].filter((item) => item !== undefined);
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
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="description" // X축에 description 표시
          tickLine={false}
          axisLine={false}
          tickMargin={0}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value / 10000}만원`}
        />
        <ChartTooltip
          cursor={false}
          content={(props: TooltipProps<number, string>) => {
            if (props.active && props.payload && props.payload.length > 0) {
              const data = props.payload[0].payload; // 데이터 포인트 가져오기
              return (
                <div
                  style={{
                    background: "white",
                    border: "1px solid #ccc",
                    padding: "10px",
                    borderRadius: "4px",
                  }}
                >
                  <strong>{data.yearMonth}</strong>
                  <p>{data.description}</p>
                  <p>총 자산: {data.totalAsset.toLocaleString()}원</p>
                  <p>하나월급통장: {data.totalHanaSalary.toLocaleString()}원</p>
                </div>
              );
            }
            return null; // 툴팁이 활성화되지 않은 경우 아무것도 렌더링하지 않음
          }}
        />

        <Line
          dataKey="totalAsset"
          name="총 자산"
          type="natural"
          stroke="var(--color-totalasset)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="totalHanaSalary"
          name="하나월급통장"
          type="natural"
          stroke="var(--color-totalhanasalary)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
