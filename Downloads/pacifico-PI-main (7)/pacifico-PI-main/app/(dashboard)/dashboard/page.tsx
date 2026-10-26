import { MetricCard } from "@/features/dashboard/components/sales/MetricCard";
import { SalesOverviewChart } from "@/features/dashboard/components/sales/OverviewChart";
import { SalesByBranchChart } from "@/features/dashboard/components/sales/SalesByBranchChart";
import { TopProductsChart } from "@/features/dashboard/components/sales/TopProductsChart";
import { DollarSign, Receipt, TrendingUp, Package } from "lucide-react";

const Page = () => {
  return (
    <div className="p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Ventas</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Ventas Totales" value="$182,450" icon={DollarSign} />
        <MetricCard title="Transacciones" value="1,437" icon={Receipt} />
        <MetricCard title="Ticket Promedio" value="$127" icon={TrendingUp} />
        <MetricCard title="Productos Vendidos" value="674" icon={Package} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesOverviewChart />
        <SalesByBranchChart />

        <div className="lg:col-span-2">
          <TopProductsChart />
        </div>
      </div>
    </div>
  )
}

export default Page