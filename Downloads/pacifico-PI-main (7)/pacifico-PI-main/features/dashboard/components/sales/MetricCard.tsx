import { LucideIcon } from "lucide-react";

type MetricCardProps = {
    title: string;
    value: string;
    icon: LucideIcon;
};

export function MetricCard({ title, value, icon: Icon }: MetricCardProps) {
    return (
        <div className="bg-white border border-neutral-200 rounded-2xl p-5 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-neutral-500">
                <Icon size={18} />
                <span className="text-sm">{title}</span>
            </div>
            <span className="text-2xl font-bold text-neutral-900">{value}</span>
        </div>
    );
}