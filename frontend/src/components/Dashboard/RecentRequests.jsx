const RecentRequests = ({ isEnglish, Requests }) => {
    const requestStatus = {
        pending: {
            label: {
                "en": "Pending",
                "es": "Pendiente"
            },
            color: "text-yellow-500 dark:text-yellow-600"
        },
        approved: {
            label: {
                "en": "Approved",
                "es": "Aprobada"
            },
            color: "text-green-500 dark:text-green-700"
        },
        rejected: {
            label: {
                "en": "Rejected",
                "es": "Rechazada"
            },
            color: "text-red-600 dark:text-red-700"
        }
    };

    return (
        <div className="h-36 bg-[#fcfcfc] dark:bg-[#0d0d0f] border border-neutral-300 dark:border-neutral-800 rounded-xl shadow-xl px-2 py-3 flex flex-col gap-2.5">
            <p className="text-xl px-3 font-semibold">
                {isEnglish ? "Recent requests" : "Solicitudes recientes"}
            </p>

            {/* Tabla */}
            <div className="flex-1 overflow-auto custom-scrollbar">
                <table className="w-full table-fixed text-left rounded overflow-hidden">
                    <thead className="bg-zinc-100 dark:bg-zinc-950 text-neutral-600 dark:text-neutral-200">
                        <tr>
                            <th className="px-3 py-1.5">
                                {isEnglish ? "Author" : "Autor"}
                            </th>
                            <th className="px-3 py-1.5">
                                {isEnglish ? "Request type" : "Tipo de solicitud"}
                            </th>
                            <th className="px-3 py-1.5">
                                {isEnglish ? "Description" : "Descripción"}
                            </th>
                            <th className="w-32 px-3 py-1.5">
                                {isEnglish ? "Status" : "Estado"}
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                        {Requests?.map((item, index) => {
                            let status = requestStatus[item.status]?.label?.[isEnglish ? "en" : "es"] || item.status;
                            let statusColor = requestStatus[item.status]?.color || "";

                            return (
                                <tr key={index}>
                                    <td className="px-3 py-1.5 truncate">
                                        {item.username}
                                    </td>
                                    <td className="px-3 py-1.5 truncate">
                                        {item.request_type}
                                    </td>
                                    <td className="px-3 py-1.5 truncate">
                                        {item.details}
                                    </td>
                                    <td className={`px-3 py-1.5 ${statusColor} truncate`}>
                                        {status}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentRequests;
