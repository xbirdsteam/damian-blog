import { HomeData } from "@/types/home";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Checkbox } from "../../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Textarea } from "../../ui/textarea";

interface ContactSectionProps {
  data: HomeData;
}

export default function ContactSection({ data }: ContactSectionProps) {
  return (
    <section>
      <div className="grid grid-cols-1 mlg:grid-cols-12 gap-[50px] mlg:gap-0">
        {/* Left: Contact Form */}
        <div className="mlg:col-span-7 pt-[50px] mlg:space-y-10 mlg:pt-20 flex flex-col items-center">
          <div className="md:max-w-[555px] space-y-[30px] px-4 md:px-0">
            <div className="space-y-[10px] mlg:space-y-4">
              <h2 className="text-neutral-primary-text text-display-b-36 mlg:text-display-b-56 font-bold text-center">
                {data.contact_title}
              </h2>
              <p className="text-neutral-primary-text text-paragraph-r-14 mlg:text-base text-center">
                {data.contact_description}
              </p>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label
                    className="text-paragraph-b-14 text-neutral-text-secondary"
                    htmlFor="name"
                  >
                    Your name
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-1">
                  <label
                    className="text-paragraph-b-14 text-neutral-text-secondary"
                    htmlFor="email"
                  >
                    Your email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your email"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label
                  className="text-paragraph-b-14 text-neutral-text-secondary"
                  htmlFor="subject"
                >
                  Choose your industry
                </label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="media">Media</SelectItem>
                    <SelectItem value="food-service">Food Service</SelectItem>
                    <SelectItem value="hospitality">Hospitality</SelectItem>
                    <SelectItem value="entrepreneur">Entrepreneur</SelectItem>
                    <SelectItem value="startup">Start Up</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <label
                  className="text-paragraph-b-14 text-neutral-text-secondary"
                  htmlFor="message"
                >
                  Leave your message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Write something"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="robot" />
                <label
                  htmlFor="robot"
                  className="text-paragraph-r-14 mlg:text-base text-neutral-text-secondary cursor-pointer"
                >
                  I am not a robot
                </label>
              </div>

              <div className="flex justify-center">
                <Button type="submit" withArrow className="w-max">
                  Send message
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Right: Consultancy Info */}
        <div className="mlg:col-span-5 bg-neutral-primary-text text-white py-[50px] mlg:py-20 space-y-10 flex sm:justify-center">
          <div className="md:max-w-[333px] px-4 md:px-0 space-y-[30px] mlg:space-y-10">
            <h2 className="text-[56px] leading-[67.2px] font-bold">
              {data.contact_heading}
            </h2>
            <div className="space-y-[30px] mlg:space-y-10">
              <h3 className="text-xl font-bold">{data.contact_subheading}</h3>

              <div className="space-y-4">
                {data.contact_text.split("\n").map((paragraph, index) => (
                  <p key={index} className="text-base">
                    {paragraph}
                  </p>
                ))}
              </div>

              <Button
                href={data.contact_button_url}
                withArrow
                arrowColor="#0D0D0D"
                className="w-max !bg-white !text-neutral-primary-text"
              >
                View consultancy
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
