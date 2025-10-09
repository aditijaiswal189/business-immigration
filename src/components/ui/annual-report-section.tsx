"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", value: 80_000 },
  { month: "Feb", value: 120_000 },
  { month: "Mar", value: 70_000 },
  { month: "Apr", value: 90_000 },
  { month: "May", value: 110_000 },
  { month: "Jun", value: 160_000 },
  { month: "Jul", value: 140_000 },
  { month: "Aug", value: 100_000 },
];

function formatTick(n: number) {
  // 0, 10k, 20k...
  if (n === 0) return "0";
  return `${Math.round(n / 1000)}k`;
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const v = payload[0].value as number;
  return (
    <div className="rounded-md border border-border bg-card p-3 shadow-sm">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-sm font-medium text-foreground">
        {v.toLocaleString()}
      </div>
    </div>
  );
}

export default function AnnualReportSection() {
  return (
    <section className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="tracking-widest font-medium">
                + ANNUAL REPORT +
              </Badge>
            </div>

            <h2 className="text-4xl font-light text-primary-yellow leading-tight">
              Gain financial clarity with
              <br />
              advanced tools
            </h2>

            <p className="text-muted-foreground leading-relaxed max-w-prose">
              Welcome to Stravise, combine strategic thinking with creative
              execution to brands grow with purpose. As a full-service marketing
              consultancy, we partner with uncover insights, craft compelling
            </p>

            <Button variant="blackGold">
              View More →
            </Button>
          </div>

          {/* Right Column - Card with Recharts */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-foreground/80">
                Monthly Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data}
                    margin={{ top: 8, right: 12, left: 8, bottom: 0 }}
                  >
                    <CartesianGrid
                      stroke="var(--border)"
                      strokeDasharray="3 3"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="month"
                      tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                      axisLine={{ stroke: "var(--border)" }}
                      tickLine={{ stroke: "var(--border)" }}
                    />
                    <YAxis
                      tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                      tickFormatter={(v) => formatTick(v)}
                      ticks={[0, 10_000, 20_000, 30_000, 40_000, 50_000]}
                      domain={[0, 160_000]}
                      axisLine={{ stroke: "var(--border)" }}
                      tickLine={{ stroke: "var(--border)" }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="value"
                      radius={[6, 6, 0, 0]}
                      // Brand color via CSS var (swap to --primary if you prefer)
                      fill="var(--foreground)"
                      // Hover opacity
                      className="[&:hover]:opacity-80"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Feature List */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full border-2 border-border flex items-center justify-center">
                    <div className="w-2 h-2 bg-border rounded-full" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Smart wallet
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full border-2 border-border flex items-center justify-center">
                    <div className="w-2 h-2 bg-border rounded-full" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Profit planner
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-foreground flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6L5 9L10 3"
                        stroke="var(--primary-foreground)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-foreground font-medium">
                    Finance flow
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full border-2 border-border flex items-center justify-center">
                    <div className="w-2 h-2 bg-border rounded-full" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Expense explorer
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
