"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

type SalesData = {
    mes: string;
    ventas: number;
};

const data: SalesData[] = [
    { mes: "Ene", ventas: 4200 },
    { mes: "Feb", ventas: 3800 },
    { mes: "Mar", ventas: 5100 },
    { mes: "Abr", ventas: 4600 },
    { mes: "May", ventas: 5300 },
    { mes: "Jun", ventas: 7200 },
    { mes: "Jul", ventas: 6300 },
    { mes: "Ago", ventas: 3200 },
    { mes: "Sep", ventas: 6800 },
    { mes: "Oct", ventas: 6100 },
    { mes: "Nov", ventas: 6900 },
    { mes: "Dic", ventas: 7100 },
];

export function SalesOverviewChart() {
    return (
        <div className="bg-white border border-neutral-200 rounded-2xl p-5">
            <h2 className="text-sm font-semibold text-neutral-700 mb-4">Resumen de Ventas</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                    <XAxis dataKey="mes" tick={{ fontSize: 12, fill: "#737373" }} />
                    <YAxis tick={{ fontSize: 12, fill: "#737373" }} />
                    <Tooltip
                        contentStyle={{ borderRadius: "12px", border: "1px solid #e5e5e5", fontSize: "13px" }}
                    />
                    <Line
                        type="monotone"
                        dataKey="ventas"
                        stroke="#0891b2"
                        strokeWidth={2}
                        dot={{ r: 4, fill: "#0891b2" }}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}