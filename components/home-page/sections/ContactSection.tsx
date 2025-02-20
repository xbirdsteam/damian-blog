/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { HomeData } from "@/types/home";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Textarea } from "../../ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";

interface ContactSectionProps {
  data: HomeData;
}

export default function ContactSection({ data }: ContactSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    industry: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recaptchaValue) {
      toast.error("Please verify that you are not a robot");
      return;
    }

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          template: "contact",
          formData: {
            name: formData.name,
            email: formData.email,
            industry: formData.industry,
            message: formData.message,
          },
          receiver_email: data.contact_receiver_email,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      toast.success("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        industry: "",
        message: "",
      });
      setRecaptchaValue(null);
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.message.trim() !== "" &&
      recaptchaValue !== null
    );
  };

  return (
    <section id="contact">
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

            <form onSubmit={handleSubmit} className="space-y-6">
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
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    required
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
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label
                  className="text-paragraph-b-14 text-neutral-text-secondary"
                  htmlFor="industry"
                >
                  Choose your industry
                </label>
                <Select
                  value={formData.industry}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, industry: value }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose" />
                  </SelectTrigger>

                  <SelectContent className="max-h-[300px] overflow-y-auto">
                    {data.contact_industry_options.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
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
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div className="flex justify-center">
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_SITE_KEY!}
                  onChange={(value) => setRecaptchaValue(value)}
                />
              </div>

              <div className="flex justify-center">
                <Button
                  type="submit"
                  withArrow
                  className="w-max"
                  disabled={isSubmitting || !isFormValid()}
                >
                  {isSubmitting ? "Sending..." : "Send message"}
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
