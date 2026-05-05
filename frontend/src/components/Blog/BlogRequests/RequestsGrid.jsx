import RequestItem from "./RequestItem";

const RequestsGrid = ({ Requests }) => {
  return (
    <div className="h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 py-4 gap-4">
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
        </div>
    </div>
  );
};

export default RequestsGrid;
