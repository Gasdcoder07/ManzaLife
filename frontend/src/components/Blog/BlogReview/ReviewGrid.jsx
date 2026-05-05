import ReviewItem from "./ReviewItem";

const ReviewGrid = ({ isEnglish, Reviews }) => {
    return (
        <div className="h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-4 gap-4">
                {
                    Reviews.map((review) => {
                        return (
                            <ReviewItem
                                key={review.id}
                                isEnglish={isEnglish}
                                username={review.username}
                                type={review.request_type}
                                date={review.created_at}
                                details={review.details}
                                status={review.status}/>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default ReviewGrid;
