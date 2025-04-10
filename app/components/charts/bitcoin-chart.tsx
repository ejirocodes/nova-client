import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { ChartContainer } from "~/components/ui/chart";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { ArrowDown, ArrowUp } from "lucide-react";
import type { BitcoinPricePeriod, BitcoinHistoryPoint } from "~/lib/client";
import {
  abbreviateVolume,
  formatCurrency,
} from "~/lib/utils/currency-formatter";
import { formatShortDateTime } from "~/lib/utils/date-formatter";

interface BitcoinChartProps {
  priceData?: {
    currentPrice: number;
    priceChange: number;
    percentChange: number;
    historicalData: BitcoinHistoryPoint[];
  };
  isLoading?: boolean;
  error?: string | null;
  onPeriodChange: (period: BitcoinPricePeriod) => void;
  period: BitcoinPricePeriod;
}

const TIME_PERIODS = {
  "24h": "24 hours",
  "7d": "7 days",
  "30d": "30 days",
  "90d": "90 days",
};

export default function BitcoinChart({
  priceData,
  isLoading = false,
  error = null,
  onPeriodChange,
  period,
}: BitcoinChartProps) {
  const currentPrice = priceData?.currentPrice || null;
  const priceChange = priceData?.priceChange || 0;
  const percentChange = priceData?.percentChange || 0;
  const data = priceData?.historicalData || [];

  return (
    <Card className="bg-[#121212] border-0 rounded-none text-white w-full py-2">
      <CardHeader className="px-0 pt-1 pb-2">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            {currentPrice && (
              <>
                <h1 className="text-4xl font-bold mb-1">
                  {formatCurrency(currentPrice)}
                </h1>
                <span
                  className={`flex items-center text-lg ${
                    priceChange >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {priceChange >= 0 ? (
                    <ArrowUp className="w-5 h-5 mr-1" />
                  ) : (
                    <ArrowDown className="w-5 h-5 mr-1" />
                  )}
                  {formatCurrency(Math.abs(priceChange))} (
                  {percentChange.toFixed(2)}%)
                </span>
              </>
            )}
          </div>
          <Tabs
            defaultValue={period}
            onValueChange={(value) =>
              onPeriodChange(value as BitcoinPricePeriod)
            }
          >
            <TabsList className="bg-[#252525]">
              {Object.entries(TIME_PERIODS).map(([key, label]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="data-[state=active]:bg-[#333] text-gray-300 data-[state=active]:text-white"
                >
                  {key}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="p-0 pt-4 w-full">
        {isLoading && (
          <div className="flex justify-center items-center h-[500px] text-gray-400">
            Loading chart data...
          </div>
        )}
        {error && (
          <div className="flex justify-center items-center h-[500px] text-red-400">
            {error}
          </div>
        )}
        {!isLoading && !error && data.length > 0 && (
          <div className="h-[500px] w-full">
            <ChartContainer
              config={{
                price: {
                  label: "Price",
                  color: "hsl(328, 100%, 54%)",
                },
                volume: {
                  label: "Volume",
                  color: "hsl(180, 70%, 35%)",
                },
              }}
              className="h-full w-full"
            >
              <ResponsiveContainer width="100%" height={460}>
                <ComposedChart
                  data={data}
                  margin={{ top: 10, right: 45, left: 10, bottom: 40 }}
                >
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="hsl(328, 100%, 54%)"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="hsl(328, 100%, 54%)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#333"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="time"
                    tickFormatter={(time) => {
                      const date = new Date(time);
                      if (period === "24h") {
                        return date.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        });
                      }
                      return date.toLocaleDateString([], {
                        month: "short",
                        day: "numeric",
                      });
                    }}
                    stroke="#666"
                    tick={{ fill: "#999" }}
                    axisLine={{ stroke: "#444" }}
                    height={40}
                    tickMargin={10}
                  />
                  <YAxis
                    yAxisId="left"
                    domain={["auto", "auto"]}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    stroke="#666"
                    tick={{ fill: "#999" }}
                    axisLine={{ stroke: "#444" }}
                    width={50}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    domain={["auto", "auto"]}
                    tickFormatter={abbreviateVolume}
                    stroke="#666"
                    tick={{ fill: "#999" }}
                    axisLine={{ stroke: "#444" }}
                    width={60}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-[#252525] border border-gray-700 p-3 rounded shadow-lg">
                            <p className="text-gray-300">
                              {formatShortDateTime(payload[0].payload.time)}
                            </p>
                            <p className="text-[hsl(328,100%,54%)] font-semibold">
                              Price: {formatCurrency(payload[0].payload.price)}
                            </p>
                            <p className="text-[hsl(180,70%,35%)]">
                              Volume:{" "}
                              {abbreviateVolume(payload[0].payload.volume)}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="hsl(328, 100%, 54%)"
                    fillOpacity={1}
                    fill="url(#colorPrice)"
                    yAxisId="left"
                  />
                  <Bar
                    dataKey="volume"
                    fill="hsl(180, 70%, 35%)"
                    yAxisId="right"
                    barSize={20}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
