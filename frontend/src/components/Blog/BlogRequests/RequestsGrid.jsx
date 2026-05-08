import RequestItem from "./RequestItem";

const RequestsGrid = ({ Requests }) => {
  return (
    <div className="h-full">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 py-4 gap-4">
            {
                Requests?.map((request, index) => {
                    return (
                        <RequestItem
                            key={index}
                            type={request.request_type}
                            title={request.title}
                            description={request.description}/>
                    )
                })
            }

            {
                Requests?.length === 0 && (
                    <h3 className="text-xl font-medium">No tienes solicitudes.</h3>
                )
            }
        </div>
    </div>
  );
};

export default RequestsGrid;
