import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useLocalStorage from "../../components/hooks/useLocalStorage";
import { Geoapify } from "../../api_types";

const LEN = 300;

export default function () {
  const router = useRouter();
  const { id } = router.query;
  const [locId, setLocId] = useLocalStorage<string | string[] | undefined>(
    "locId",
    id
  );
  const [info, setInfo] = useState<Geoapify>();

  useEffect(() => {
    if (typeof id === "string") {
      setLocId(id);
      console.log("Using ID from URL");
    } else {
      console.log("Using ID from local storage");
    }
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.geoapify.com/v2/places?apiKey=${
            process.env.NEXT_PUBLIC_GEOAPIFY_API
          }&limit=1&filter=place:${id || locId}&categories=catering`,
          {
            method: "GET",
            headers: {},
          }
        );

        if (response.ok) {
          const result = await response.json();
          setInfo(result);
          console.log(result);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="my-20 mx-5 md:mx-20">
      <section className="flex flex-col-reverse md:flex-col justify-center items-center gap-10">
        <Link href={"/#locations"}>
          <button className="bg-rose-500 text-white px-4 py-2 rounded-lg font-thin">
            &larr; Go Back
          </button>
        </Link>
        {(info?.features && info?.features.length > 0 && (
          <div className="bg-gray-50 shadow-lg p-5 md:p-10 flex flex-col md:flex-row items-center justify-center gap-10">
            <div className="self-start">
              <div className="rounded-full font-bold bg-pink-600 px-4 py-1 text-white w-fit text-xs">
                {getCategory(info.features[0].properties.categories)}
              </div>
              <h1 className="text-3xl md:text-6xl mb-5 mt-3">
                {info.features[0].properties.name}
              </h1>
              <ul className="font-thin text-md md:text-xl">
                <li className="flex items-center justify-left gap-3">
                  <Image src={"/pin.svg"} alt="icon" width={20} height={20} />
                  <div>{info.features[0].properties.address_line2}</div>
                </li>
              </ul>
            </div>

            <Image
              width={LEN}
              placeholder="blur"
              blurDataURL="/gmap.svg"
              height={LEN}
              className="rounded-xl border-black border-2 shadow-lg"
              src={`https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=${LEN}&height=${LEN}&center=lonlat:${info.features[0].properties.lon},${info.features[0].properties.lat}&zoom=14&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API}&marker=lonlat:${info.features[0].properties.lon},${info.features[0].properties.lat};type:material;color:%23ff3421;icontype:awesome`}
              alt="map"
            />
          </div>
        )) || (
          <div className="bg-gray-50 shadow-lg p-20 text-3xl">Loading...</div>
        )}
      </section>
    </main>
  );
}

function getCategory(category: Array<string>): string {
  let res = "";
  if (category.length > 1) {
    res = category[1].split(".")[1];
    res = res.replace(/_/g, " ").toUpperCase();
  } else {
    res = category[0].toUpperCase();
  }
  return res;
}
