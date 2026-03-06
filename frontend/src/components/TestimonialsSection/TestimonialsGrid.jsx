import TestimonialCard from "./TestimonialCard";
import { TestimonialItems } from "./TestimonialItems";

const TestimonialsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-8">
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