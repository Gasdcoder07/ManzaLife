"use client"

import {
     BarChart,
     Bar,
     XAxis,
     YAxis,
     CartesianGrid,
     Tooltip,
     ResponsiveContainer,
}   from "recharts";

const data = [
    { name: "Labubu Vaca", ventas: 4000 },
    { name: "Labubu Lily", ventas: 3000 },
    { name: "Labubu Dorado", ventas: 2000 },
    { name: "Labubu Arcoiris", ventas: 2780 },
    { name: "Labubu Radillo", ventas: 1890 },
    { name: "Labubu Rojo", ventas: 2390 },
    { producto: "Labubu Morado", ventas: 3490 },
];

export const TopProductsChart = () => {
    return (
        <div className="w-full bg-white border border-neutral-200 rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-semibold mb-4">Productos más vendidos</h3>

            <div className="w-full h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{ top: 0, right: 16, left: 16, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" />
                        <YAxis
                            type="category"
                            dataKey="name"
                            width={110}
                            tick={{ fontSize: 12 }}
                        />
                        <Tooltip
                            formatter={(value) => [`${Number(value)} unidades`, "Vendidas"]}
                        />
                        <Bar dataKey="ventas" fill="#0891b2" radius={[0, 6, 6, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};