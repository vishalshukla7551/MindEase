"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import SpotlightCard from "@/app/components/animations/SpotlightCard/SpotlightCard";
import BlurText from "@/app/components/animations/BlurText/BlurText";
import Link from 'next/link'
export default function HealthFeatureCards() {
  const sectionInView = true; // Replace with intersection observer logic if needed
    const router = useRouter();

  const handleCheck = async () => {


// Simulate an async task (e.g. API call)

    const res = await fetch("https://chatbot-fitness.onrender.com/health", {
      method: "GET",
    });

    const data = await res.json();

    router.push(`/se/components/health-result?status=${data.status}&time=${encodeURIComponent(data.timestamp)}`);
  };

  return (
    <>
      {/* Animated Heading */}
      <motion.div initial={{ opacity: 0, y: 20 }}
        animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mt-16 mb-12 flex justify-center items-center">
          <BlurText
            text="Explore Health & Fitness Features"
            delay={100}
            animateBy="words"
            direction="top"
            className="text-5xl font-extrabold text-white text-center"
          />
        </div>
      </motion.div>

      {/* Animated Cards Grid */}
     <motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
  transition={{ duration: 1.2, delay: 0.5 }}
>
  <div className="flex justify-center mb-100 mt-20">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl w-full">
       {/* Diet Plan */}
          <Link href="/se/components/Diet-plan">
        <SpotlightCard
   className="w-full h-full min-h-[26rem] p-4 rounded-xl shadow-md transition-transform duration-300 transform hover:scale-105 flex flex-col items-center text-center bg-[#111] border border-[#222] cursor-pointer"
  spotlightColor="rgba(0, 229, 255, 0.2)"
>
              <Image src="/diet.png" alt="Diet icon" width={70} height={70} className="mb-4" />
              <h3 className="text-3xl font-semibold text-purple-700 mb-3">Create Diet Plan</h3>
             <p className="text-lg text-gray-400 mb-2">
  {`Generate a personalized meal plan tailored to your body type, fitness goals, dietary preferences, and age. Whether you're bulking, cutting, or maintaining, your nutrition roadmap starts here.`}
</p>

            </SpotlightCard>
    </Link>
    <div onClick={handleCheck}>
       <SpotlightCard
  className="w-full h-full min-h-[26rem] p-4 rounded-xl shadow-md transition-transform duration-300 transform hover:scale-105 flex flex-col items-center text-center bg-[#111] border border-[#222] cursor-pointer"
  spotlightColor="rgba(0, 229, 255, 0.2)"
>
              <Image src="/healthcare.png" alt="Health check icon" width={70} height={70} className="mb-4" />
              <h1 className="text-3xl font-semibold text-purple-700 mb-3">Health Check</h1>
           <p className="text-lg text-gray-400 mb-2">
  {`Begin with a quick self-assessment of your physical and emotional well-being. 
  This helps you stay mindful, track your mood patterns, and ensure you're maintaining 
  a healthy balance in your daily life.`}
</p>

            </SpotlightCard>
  </div>
          {/* Workout Plan */}
         <Link href="/se/components/Workout-Plan">
 <SpotlightCard
   className="w-full h-full min-h-[26rem] p-4 rounded-xl shadow-md transition-transform duration-300 transform hover:scale-105 flex flex-col items-center text-center bg-[#111] border border-[#222] cursor-pointer"
  spotlightColor="rgba(0, 229, 255, 0.2)"
>
              <Image src="/weightlifting.png" alt="Workout icon" width={70} height={70} className="mb-4" />
              <h3 className="text-3xl font-semibold text-purple-700 mb-3">Create Workout Plan</h3>
            <p className="text-lg text-gray-400 mb-2">
 {` Craft a customized workout routine designed around your goals—be it fat loss, muscle gain, or improved stamina. Get plans suited for home, gym, or hybrid setups, with smart progression tracking.`}
</p>

            </SpotlightCard>
         </Link>

        </div>
        </div>
      </motion.div>
      </>
  );
}
