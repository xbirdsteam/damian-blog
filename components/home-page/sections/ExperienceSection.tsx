// interface ExperienceSectionProps {
//   data: HomeData;
// }

export default function ExperienceSection() {
  return (
    <section className="container mx-auto px-4 py-[50px] space-y-[50px] mlg:py-20 mlg:space-y-20">
      <h1 className="text-neutral-primary-text text-[36px] leading-[120%] mlg:text-[56px] font-bold mlg:max-w-[60%]">
        Experience the Art of Authentic Italian Cooking
      </h1>

      <div className="space-y-6">
        {/* Top Row with Border */}
        <div className="flex flex-col space-y-6">
          <div className="grid grid-cols-1 mlg:grid-cols-[1fr_2fr] mlg:gap-32">
            {/* Left: Category Title */}
            <h2 className="text-neutral-text-disable uppercase font-bold text-xl">
              ITALIAN CUISINE
            </h2>

            {/* Right: Title */}
            <h2 className="text-neutral-primary-text text-xl font-bold">
              Experience the Art of Authentic Italian Cooking
            </h2>
          </div>

          <div className="w-full h-px bg-neutral-primary-text/10" />
        </div>

        {/* Description */}
        <div className="grid grid-cols-1 mlg:grid-cols-[1fr_2fr] mlg:gap-32">
          <div /> {/* Empty left column to maintain alignment */}
          <p className="text-neutral-primary-text text-base">
            Embark on a flavorful journey through the world of Italian cuisine.
            From handmade pasta to timeless Tuscan recipes, Chef Damian blends
            tradition with creativity to deliver unforgettable culinary
            experiences.
          </p>
        </div>
      </div>
    </section>
  );
}
