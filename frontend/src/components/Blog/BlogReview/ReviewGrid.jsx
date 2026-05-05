const ReviewGrid = ({ Reviews }) => {
    return (
        <div className="h-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 py-4 gap-4">
                {
                    !Reviews || Reviews.length === 0 ? (
                        <p>No hay solicitudes pendientes de revisar</p>
                    )  : (
                        <p>Si hay</p>
                    )
                }
            </div>
        </div>
    );
};

export default ReviewGrid;
