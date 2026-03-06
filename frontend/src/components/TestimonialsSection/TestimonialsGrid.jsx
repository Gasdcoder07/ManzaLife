import TestimonialCard from "./TestimonialCard";
import { TestimonialItems } from "./TestimonialItems";

const TestimonialsGrid = () => {
  return (
    <div className="grid grid-cols-3">
        {
            TestimonialItems.map((testimonial) => {
                return (
                    <TestimonialCard
                        key={testimonial.id}
                        img={testimonial.img}
                        nombre={testimonial.nombre}
                        ocupacion={testimonial.ocup}
                        testimonio={testimonial.test}/> 
                )
            })
        }
    </div>
  );
};

export default TestimonialsGrid;