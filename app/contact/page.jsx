"use client";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Send } from "lucide-react";
import { useTheme } from '../_context/ThemeContext';
import Navbar from "../components/Navbar";

export default function ContactForm() {
  const { isDark } = useTheme();
  const formRef = useRef();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .sendForm(
        "service_t71r3hz",
        "template_suuor5x",
        formRef.current,
        "kCoag6Kq8nKvvS18Q"
      )
      .then(
        (result) => {
          setStatus("Message sent successfully!");
          formRef.current.reset();
          setLoading(false);
        },
        (error) => {
          setStatus("Failed to send message. Try again.");
          setLoading(false);
        }
      );
  };

  const bgClass = isDark
    ? "bg-gray-800/40 border-gray-700 text-white placeholder-gray-400"
    : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500";

  return (
    <div className={`flex flex-col min-h-screen ${isDark ? "bg-gradient-to-br from-gray-900 via-black to-gray-900" : "bg-gray-100"}`}>
      <Navbar />
      <section className="flex-1 flex items-center justify-center px-4 py-8">
        <div
          className={`max-w-lg w-full p-8 rounded-2xl backdrop-blur-sm shadow-2xl border ${bgClass}`}
        >
          <h2 className={`text-4xl font-bold text-center mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
            Contact Us
          </h2>
          <p className={`mb-8 text-center ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            Have questions or feedback? Send us a message and we'll get back to you!
          </p>

          <form ref={formRef} onSubmit={sendEmail} className="flex flex-col gap-4">
            <input
              type="text"
              name="user_name"
              placeholder="Your Name"
              required
              className={`border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${bgClass}`}
            />
            <input
              type="email"
              name="user_email"
              placeholder="Your Email"
              required
              className={`border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${bgClass}`}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              required
              rows={5}
              className={`border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all ${bgClass}`}
            ></textarea>
            <button
              type="submit"
              disabled={loading}
              className={`flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Sending..." : "Send Message"} <Send className="w-5 h-5" />
            </button>
          </form>

          {status && (
            <p
              className={`mt-4 text-center font-medium ${
                status.includes("successfully") ? "text-green-400" : "text-red-400"
              }`}
            >
              {status}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}