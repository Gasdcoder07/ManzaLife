import TestimonialsGrid from "./TestimonialsGrid";

const TestimonialsSection = () => {
  return (
    <section
        id="testimonials"
        className="min-h-screen bg-zinc-950 pt-5">
          <div className="container mx-auto flex flex-col px-6 py-4 md:px-20 lg:px-32 gap-12">
              <h3 className="text-white text-4xl">
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-orange-800">
                      Testimonios {" "}
                  </span>
                  de nuestros visitantes
              </h3>

              <TestimonialsGrid/>

          </div>
    </section>
  )
};

export default TestimonialsSection;