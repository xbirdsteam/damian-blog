import Image from "next/image";
import MileStoneItem from "./MileStoneItem";
import ScrollToView from "./ScrollToView";
import WhereIAm from "./WhereIAm";

export default function AboutMe() {
  return (
    <section className="bg-neutral-primary-text py-20 min-h-screen relative">
      <div className="container mx-auto">
        <div className="space-y-[60px">
          <h1 className="flex flex-col text-display-b-56">
            <span className="text-neutral-text-secondary">About me,</span>{" "}
            <span className="text-white">Hi I&lsquo;m Damian</span>
          </h1>

          {/* Vision and Mission */}
          <article className="grid grid-cols-2 gap-[100px]">
            <div>
              <h2 className="text-heading-b-20 text-neutral-text-secondary mb-4">
                MY VISION
              </h2>
              <p className="text-white">
                I envision a world where sustainability, innovation, and
                culinary excellence redefine not just how we eat, but how we
                connect with our planet and each other. A future where how
                systems are ethical, plant-based and environmentally conscious.
                I believe we can create incredible food that thrives without
                compromising the planet. As a plant-based trailblazer and
                eco-innovator, my vision is to inspire global change through
                creative, delicious and seamlessly functioning gastronomy into a
                vehicle for impact—not just on our plates, but in our world at
                large.
              </p>
            </div>

            <div>
              <h2 className="text-heading-b-20 text-neutral-text-secondary mb-4">
                MY MISSION
              </h2>
              <p className="text-white">
                I envision a world where sustainability, innovation, and
                culinary excellence redefine not just how we eat, but how we
                connect with our planet and each other. A future where how
                systems are ethical, plant-based and environmentally conscious.
                I believe we can create incredible food that thrives without
                compromising the planet. As a plant-based trailblazer and
                eco-innovator, my vision is to inspire global change through
                creative, delicious and seamlessly functioning gastronomy into a
                vehicle for impact—not just on our plates, but in our world at
                large.
              </p>
            </div>
          </article>

          {/* Milestones */}
          <article className="flex gap-[100px]">
            <div className="w-[410px] aspect-[0.82] relative">
              <Image
                src="https://s3-alpha-sig.figma.com/img/9505/0dae/843774222bcb00405f1d57a17e155000?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=DUiQ5pJC-qT~5nYAB1VKgw9QuJjopTC82MmEepZCEnI3BMhmSzIc3wdpRd8L7EhKDi53KAes-OcaqGJ97kouj1n~PTNfM~YyMWbYD15Z9KEbb7~YS~A4bBo~Sefqm2qvtlgIE4AV68kroKyXqY72DMOqPvd6vY0Fl08Mn3HzWMGPem1mEnWIgZkRkoVMOZ7-jnkoyFOhsjBX440zDYp9c6wKCM~jpTtl6ZDPscToEbgQ~-WjUNNS7BIFQVuShOueST4GKM9kbLPjhuclRCuQQd4X3ZClPGCGDADqg~vkDACxDREICrgGvq02JSu77aZ0HfCywQeVKDb7Uu27N2QIhQ__"
                alt="Milestones"
                fill
                sizes="100%"
                className="object-cover object-top"
              />
            </div>
            {/* Milestones content */}
            <div className="flex-1 relative overflow-hidden">
              <MileStoneItem />
              <MileStoneItem />
              <div
                className="absolute h-[170px] w-full bottom-0 left-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(13, 13, 13, 0) 0%, #0D0D0D 80%)",
                }}
              />
              <ScrollToView />
            </div>
          </article>
        </div>
      </div>
      <WhereIAm />
    </section>
  );
}
