"use client";

import "../public/icon.scss";
import Image from 'next/image';
import Link from 'next/link';
import Hyperspeed from "./components/animations/Hyperspeed/hyperspeed";
import { TypewriterEffect } from "./components/ui/typewriter-effect";
import SpotlightCard from "./components/animations/SpotlightCard/SpotlightCard";
import BlurText from "./components/animations/BlurText/BlurText";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function LandingPage() {
  const hyperspeedRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(hyperspeedRef, { margin: "-100px", once: false });
  const sectionInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const [showMainContent, setShowMainContent] = useState(false);
  const [hyperspeedActive, setHyperspeedActive] = useState(false);
  const [typewriterFinished, setTypewriterFinished] = useState(false);

  
 useEffect(() => {
  let timer: ReturnType<typeof setTimeout>;

  if (typewriterFinished && isInView) {
    setHyperspeedActive(true); // start hyperspeed first

    timer = setTimeout(() => {
      setShowMainContent(true); // show content a bit after hyperspeed
    }, 1500); // delay the content for smoothness
  }

  if (!isInView) {
    setHyperspeedActive(false);
  }

  return () => clearTimeout(timer);
}, [typewriterFinished, isInView]);


  const words = [
    { text: "Your" },
    { text: "Companion" },
    { text: "for" },
    { text: "Better" },
    { text: "Mental", className: "text-blue-500 dark:text-blue-500" },
    { text: "Health.", className: "text-blue-500 dark:text-blue-500" },
  ];

  return (
    <div className="w-full h-full overflow-x-hidden relative">
      <div className="fixed top-4 left-0 right-0 z-20 px-6 flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-extrabold text-white">MindEase</h1>
      </div>

      {/* SECTION 1: Hyperspeed Background */}
    <section ref={hyperspeedRef} className="relative h-screen w-full">
  {/* Hyperspeed comes after typewriter finishes */}
  {hyperspeedActive && (
    <div className="absolute inset-0 z-0">
            <Hyperspeed
  effectOptions={{
    length: 200, // reduce from 400
    speedUp: 1.2, // slightly slower
    movingAwaySpeed: [30, 50],
    movingCloserSpeed: [-80, -120],
    carLightsLength: [10, 40],
    fov: 70, // reduce FOV for performance
    totalSideLightSticks: 10,
    lightPairsPerRoadWay: 20,
    distortion: "turbulentDistortion",
    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      sticks: 0x03b3c3,
      shoulderLines: 0xffffff,
      brokenLines: 0xffffff,
      leftCars: [0xd856bf],
      rightCars: [0x03b3c3],
    }
  }}
/>
          </div>
        )}

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-6">
    <TypewriterEffect
      words={words}
      className="mb-6"
      onFinished={() => setTypewriterFinished(true)}
    />

    {/* Main content appears after delay */}
    {showMainContent && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <p className="text-lg max-w-xl mb-6">
          Track your mood, manage stress, and discover personalized self-care routines.
        </p>
        <Link href="/start_page" className="max-w-xs inline-block">
        <button className="cursor-pointer px-6 py-3 bg-purple-600 text-white rounded-2xl shadow-md hover:bg-purple-700 hover:scale-110 hover:shadow-purple-500 hover:shadow-xl transition-all duration-300 ease-in-out">
            Start Your Journey
          </button>
        </Link>
      </motion.div>
    )}
  </div>
</section>

      {/* SECTION 2 */}
      <section ref={sectionRef} className="h-screen w-full flex flex-col justify-center items-center bg-black px-8 md:px-20">
       <motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
  transition={{ duration: 0.8 }}
>
          <div className="flex justify-center items-center mb-12">
            <BlurText
              text="Explore Our Features"
              delay={100}
              animateBy="words"
              direction="top"
              className="text-5xl font-extrabold text-white text-center"
            />
          </div>
        </motion.div>

      <motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
  transition={{ duration: 1.2, delay: 0.5 }}
>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/mood-checkin" className="max-w-xs">
              <SpotlightCard className="custom-spotlight-card p-6 rounded-2xl shadow-md transition-transform duration-300 transform hover:scale-105 min-h-[23rem] flex flex-col items-center text-center" spotlightColor="rgba(0, 229, 255, 0.2)">
                <Image src="/dial.png" alt="Mood dial icon" width={64} height={64} className="mb-4" />
                <h3 className="text-2xl font-semibold text-purple-700 mb-3">Daily Mood Check-ins</h3>
                <p className="text-base text-gray-700 mb-2">
                  Log your emotions daily to track patterns and understand your triggers.
                  Visualize your mood history and gain insights into your mental health trends over time.
                </p>
              </SpotlightCard>
            </Link>

            <Link href="/se" className="max-w-xs">
              <SpotlightCard className="custom-spotlight-card p-6 rounded-2xl shadow-md transition-transform duration-300 transform hover:scale-105 min-h-[23rem] flex flex-col items-center text-center" spotlightColor="rgba(0, 229, 255, 0.2)">
                <Image src="/selfcare.png" alt="Self-care icon" width={64} height={64} className="mb-4" />
                <div className="max-w-xs">
                  <h3 className="text-2xl font-semibold text-purple-700 mb-3">Personalized Self-Care</h3>
                  <p className="text-base text-gray-700 mb-2">
                    Receive AI-recommended routines tailored to your current emotional state. Includes breathing exercises, gratitude prompts, guided meditation, and more.
                  </p>
                </div>
              </SpotlightCard>
            </Link>

            <Link href="/Chats" className="max-w-xs">
              <SpotlightCard className="custom-spotlight-card p-6 rounded-2xl shadow-md transition-transform duration-300 transform hover:scale-105 min-h-[23rem] flex flex-col items-center text-center" spotlightColor="rgba(0, 229, 255, 0.2)">
                <Image src="/chat.png" alt="Support icon" width={64} height={64} className="mb-4" />
                <div className="max-w-xs">
                  <h3 className="text-2xl font-semibold text-purple-700 mb-3">Anonymous Peer Support</h3>
                  <p className="text-base text-gray-700 mb-2">
                    Share your feelings anonymously in safe spaces moderated by our community. Chat with others going through similar experiences and never feel alone again.
                  </p>
                </div>
              </SpotlightCard>
            </Link>
          </div>
        </motion.div>
      </section>
   <AnimatedSection
  imageSrc="/Health-Tracking-apps.jpg"
  altText="Real-time tracking"
  title="Smarter Mental Health Support"
  content="🧠 Real-Time Monitoring: Our system continuously analyzes your emotional patterns to detect early signs of stress, anxiety, or burnout. Stay one step ahead with insights that evolve with you."
/>

<AnimatedSection
  imageSrc="/AI-in-personalized-healthcare.png.webp"
  altText="AI health suggestions"
  title="AI-Driven Suggestions"
  content="🧠 Receive personalized recommendations based on your current mental state — including exercises, reflections, and rest tips."
  reverse
/>

<AnimatedSection
  imageSrc="/anonymous-chatbot.png"
  altText="Anonymous chatbot"
  title="Anonymous Peer Chat Support"
  content="💬 Talk Freely, Stay Anonymous: Our chat bot offers a safe space to talk without judgment or identity. Whether you're venting, asking questions, or just need someone to listen — you're never alone."
  extraContent="🌐 AI-Powered Companion: Backed by smart natural language understanding, the bot supports meaningful conversations and can redirect you to helpful resources or community groups."
/>

    </div>
  );
}
type AnimatedSectionProps = {
  imageSrc: string;
  altText: string;
  title: string;
  content: string;
  extraContent?: string; // optional if not always passed
  reverse?:boolean
};
 function AnimatedSection({
  imageSrc,
  altText,
  title,
  content,
  extraContent,
  reverse = false,
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <section
      ref={ref}
      className={`w-full min-h-screen flex flex-col ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      } items-center text-center md:text-left p-10 bg-black`}
    >
      {/* Image with animation */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="md:w-1/2 flex justify-center"
      >
    
<Image src={imageSrc} alt={altText} width={400}  height={300} className="w-2/3 max-w-md rounded-xl shadow-lg" unoptimized />
      </motion.div>

      {/* Text with animation */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="md:w-1/2 flex flex-col items-center md:items-start p-5"
      >
        <h2 className="text-5xl font-bold text-white mb-4">{title}</h2>
        <p className="text-lg max-w-lg text-gray-300">{content}</p>
        {extraContent && (
          <p className="text-lg max-w-lg text-gray-300 mt-4">{extraContent}</p>
        )}
      </motion.div>
    </section>
  );
}
