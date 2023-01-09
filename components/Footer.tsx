import Image from "next/image";

export default function Footer() {
  return (
    <div className="mx-5 md:mx-20 mb-8 mt-auto">
      <div className="bg-gray-300 min-h-[1px] mb-8" />

      <div className="flex flex-col items-center justify-center gap-10 mb-8">
        <Image src={"/logo.svg"} width={200} height={200} alt="logo" />
        <h2 className="text-2xl text-center md:text-5xl">
          Download the app to order <span className="text-orange-400">now</span>
        </h2>
        <div className="flex items-center justify-center">
          <a href="" target={"_blank"}>
            <Image
              src={"/jewgle.png"}
              height={100}
              width={200}
              alt="Instagram"
              className="cursor-pointer"
            />
          </a>
          <a href="" target={"_blank"}>
            <Image
              src={"/apple.png"}
              height={100}
              width={160}
              alt="Instagram"
              className="cursor-pointer"
            />
          </a>
        </div>
      </div>

      <div className="bg-gray-300 min-h-[1px] mb-8" />

      <div className="flex items-center justify-between">
        <ul className="font-thin grid grid-rows-2 grid-cols-2 md:grid-rows-1 md:grid-cols-4 place-content-center gap-5">
          <li className="hover:underline underline-offset-8 cursor-pointer">
            Support
          </li>
          <li className="hover:underline underline-offset-8 cursor-pointer">
            Terms
          </li>
          <li className="hover:underline underline-offset-8 cursor-pointer">
            Privacy
          </li>
          <li className="hover:underline underline-offset-8 cursor-pointer">
            <a href="https://github.com/SaminYaser-work/fast-food-next">
              Github
            </a>
          </li>
        </ul>

        <div className="flex items-center justify-center gap-5">
          <a href="https://www.instagram.com" target={"_blank"}>
            <Image
              src={"/insta.svg"}
              height={20}
              width={20}
              alt="Instagram"
              className="cursor-pointer w-8"
            />
          </a>
          <a href="https://www.twitter.com" target={"_blank"}>
            <Image
              src={"/twit.svg"}
              height={20}
              width={20}
              alt="Instagram"
              className="cursor-pointer w-8"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
