"use client";
import { useGetAboutQuery } from "@/redux/features/settings/settingsApi";
import { Spin } from "antd";

export default function AboutUs() {
  const { data: aboutResponse, isLoading } = useGetAboutQuery();

  if (isLoading) {
    return (
      <div className="text-center min-h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  // aboutResponse.data contains your HTML string like "<p>about grass</p>"
  const htmlContent = aboutResponse?.data || "<p>No content available.</p>";

  return (
    <div className="text-center shadow-xl min-h-screen lg:px-80 py-32">
      <h3 className="text-2xl md:text-4xl font-bold text-primary mb-12">
        About Us
      </h3>
      <div
        className="text-left max-w-3xl mx-auto"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
}
