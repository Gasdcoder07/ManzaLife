import { useState } from "react";
import ReviewGrid from "../../components/Blog/BlogReview/ReviewGrid";
import { useLanguage } from "../../context/LanguageContext";
import { useRequests } from "../../hooks/useRequests";
import ReviewSkeleton from "../../components/Blog/BlogReview/ReviewSkeleton";

const Review = () => {
    const { idioma } = useLanguage();
    const isEnglish = idioma === "en";

    const { requests, loading } = useRequests();

    if (loading) return <ReviewSkeleton/>

    console.log(requests);

  return (
    <div className="mt-4">
        <h3 className="text-2xl">
            {isEnglish ? 'Requests review' : 'Revisión de solicitudes'}
        </h3>

        <ReviewGrid
            isEnglish={isEnglish}
            Reviews={requests}/>
    </div>
  );
};

export default Review;
