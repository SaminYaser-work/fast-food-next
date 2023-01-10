import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import Outlets from "../components/Outlets";
import { motion, useScroll } from "framer-motion";

const Home: NextPage = () => {
  const emailRef = React.useRef<HTMLInputElement>(null);
  const messageRef = React.useRef<HTMLTextAreaElement>(null);
  const { scrollYProgress } = useScroll();

  const focusInput = (e: React.MouseEvent<HTMLElement>) => {
    if (e.currentTarget.id === "p_email") {
      emailRef.current?.focus();
    } else if (e.currentTarget.id === "p_mes") {
      messageRef.current?.focus();
    }
  };

  // bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-slate-100 via-rose-300 to-rose-500
  return (
    <div className="w-full flex justify-center items-center scroll-smooth">
      <main className="flex flex-col overflow-hidden min-w-full gap-10">
        <section className="bg-gradient-to-b from-white via-amber-200  to-amber-300 shadow-[0px_10px_20px] shadow-amber-300 flex flex-col md:flex-row justify-center items-center min-h-screen">
          <div className="text-black flex flex-col item-center justify-center mx-2 text-center">
            <div className="flex flex-col place-items-center">
              <h1 className="text-3xl md:text-6xl mb-2 md:max-w-lg font-medium">
                Best{" "}
                <span className="text-red-500 font-black">Fried Chicken </span>{" "}
                You Have Ever Tasted
              </h1>
              <p className="text-base md:text-3xl text-slate-600">
                No dead chickens, <i>We promise!*</i>
              </p>

              <a href="#locations">
                <button
                  type="button"
                  className="bg-rose-500 px-4 py-2 text-white text-3xl mt-10 rounded-xl w-fit shadow-lg hover:bg-rose-600 transition duration-200 ease-in-out hover:shadow-xl hover:scale-[1.1]"
                >
                  Order Now &rarr;
                </button>
              </a>
            </div>
          </div>

          <div className="grid place-content-center mt-10 md:mt-0">
            <div className="mb-4 relative object-contain w-96 h-56 md:w-[40rem] md:h-[20rem]">
              <Image
                className="hero_shadow"
                src={"/hero.png"}
                objectFit="contain"
                fill
                alt="image of fried chicken"
              />
            </div>
          </div>
          <Image
            src={"/darr.svg"}
            alt="icon"
            width={30}
            height={30}
            className="animate-bounce mt-10 md:hidden"
          />
        </section>

        <section
          id="howitworks"
          className="mx-5 md:mx-20 grid place-content-center min-h-screen"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between md:gap-10">
            <motion.p
              initial={{ opacity: 0, x: -200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ ease: "easeInOut" }}
              className="bg-pink-500 md:hidden text-white px-4 py-2 rounded-full w-fit mb-4 md:mb-10 font-thin text-sm"
            >
              How it Works
            </motion.p>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "tween" }}
              className="bg-pink-600 rounded-3xl"
            >
              <Image
                className="w-[25rem] rotate-[10deg]"
                src={"/mobile.png"}
                height={500}
                width={500}
                alt="image of fried chicken"
              />
            </motion.div>
            <motion.div
              whileInView={{ x: [100, 0] }}
              transition={{ ease: "easeInOut" }}
              className="text-center md:text-left mt-8 md:max-w-xs"
            >
              <p className="bg-pink-500 text-white hidden md:block px-4 py-2 rounded-full w-fit mb-2 md:mb-10 font-thin text-sm">
                How it Works
              </p>
              <h4 className="text-3xl md:text-5xl mb-2">We are near you!</h4>
              <p className="font-thin text-xl md:text-2xl">
                Our vans are everywhere, we observe your every step. Rebelling
                is futile.
              </p>
            </motion.div>
          </div>
        </section>

        <section id="locations">
          <Outlets />
        </section>

        <section
          id="support"
          className="mx-5 md:mx-20 grid place-content-center my-16"
        >
          <div className="flex flex-col items-center justify-center gap-2 bg-slate-100 p-10 rounded-2xl shadow-lg">
            <h4 className="text-2xl md:text-4xl mb-5">Get in touch with us!</h4>
            <label htmlFor="email" className="hidden"></label>
            <div
              onClick={focusInput}
              id="p_email"
              className="border-2 rounded-md px-4 py-2 bg-white w-full focus-within:border-purple-400"
            >
              <input
                type="email"
                name="email"
                ref={emailRef}
                placeholder="youremail@mail.com"
                className="focus:outline-none font-thin"
              />
            </div>
            <label htmlFor="issue" className="hidden"></label>
            <div
              id="p_mes"
              onClick={focusInput}
              className="border-2 rounded-md px-4 py-2 bg-white w-full focus-within:border-purple-400"
            >
              <textarea
                className="focus:outline-none font-thin w-full resize-none"
                placeholder="Your Message"
                name="issue"
                ref={messageRef}
              ></textarea>
            </div>
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded-md w-full"
              type="button"
            >
              Send &rarr;
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
