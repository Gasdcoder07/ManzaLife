const RequestsGrid = ({ haveRequests = false}) => {
  return (
    <div className="py-4">
        {
            haveRequests ? (
                <p>Tiene solicitudes</p>
            ) : (
                <p>No tienes solicitudes.</p>
            )
        }
    </div>
  );
};

export default RequestsGrid;
