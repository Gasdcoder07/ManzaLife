import { useState } from "react";
import ReviewGrid from "../../components/Blog/BlogReview/ReviewGrid";
import { useLanguage } from "../../context/LanguageContext";

const Review = () => {
    const { idioma } = useLanguage();
    const isEnglish = idioma === "en";

    const [reviews, setReviews] = useState([]);

  return (
    <div className="mt-4">
        <h3 className="text-2xl">
            {isEnglish ? 'Requests review' : 'Revisión de solicitudes'}
        </h3>

        <ReviewGrid Reviews={reviews}/>
    </div>
  );
};

export default Review;
