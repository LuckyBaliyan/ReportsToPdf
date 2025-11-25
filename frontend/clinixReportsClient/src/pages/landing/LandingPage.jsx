import { useGSAP } from '@gsap/react';
import React, { useEffect } from 'react'
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { useRef } from 'react';


const LandingPage = () => {

  const headingRef = useRef(null);
  const imageRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
   
    gsap.fromTo(
      [headingRef.current,btnRef.current],
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    );

   
    gsap.to(imageRef.current, {
      rotation: 360,
      duration: 30, 
      repeat: -1,
      ease: "linear",
      transformOrigin:'center center'
    });
  }, []);

  return (
    <main className='w-full h-full'>
     <section className='w-full h-screen flex flex-col gap-6 items-center justify-center'>
       <div className='relative z-40'>
          <h1 ref={headingRef} className='text-6xl lg:text-[23vh] z-40 leading-[0.95]  tracking-tighter text-center mb-10'>
          Clarity in Numbers <br />
          Calm in Action
          </h1>
       </div>

       <img ref={imageRef} className='absolute top-30 left-[30%] z-10 origin-center' src="/logo.png" alt="" />
        
        <div ref={btnRef} className="hidden z-50 md:flex items-center gap-3 cursor-pointer">
          <Link
            to="/reports/create"
            className="px-6 py-4 cursor-pointer bg-[#36E278] font-bold text-black rounded-md text-sm  hover:bg-[#36e278e7] transition"
          >
           Get Started
          </Link>
        </div>
     </section>
    </main>
  )
}

export default LandingPage;