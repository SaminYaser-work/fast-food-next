import { useEffect, useState } from "react";
import { Geoapify, Feature } from "../api_types";
import { Pexels, Photo } from "../pexels";
// import useLocalStorage from "./hooks/useLocalStorage";
import Image from "next/image";
import Link from "next/link";

const LIMIT: number = 11;
const RANGE: number = 500;

type Coordinates = {
  lon: number;
  lat: number;
};

type Data = {
  info: Array<Feature>;
  images: Array<Photo>;
};

export default function Outlets() {
  const [outlets, setOutlets] = useState<Geoapify>();
  const [images, setImages] = useState<Pexels>();
  const [coords, setCoords] = useState<Coordinates>({ lon: 0, lat: 0 });

  const revealPosition = (position: GeolocationPosition) => {
    const { longitude, latitude } = position.coords;
    setCoords({ lon: longitude, lat: latitude });
    getLocations({ lon: longitude, lat: latitude });
  };

  const positionDenied = () => {
    console.log("Position denied");
  };

  const geoSettings = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000,
  };

  useEffect(() => {
    function report(state: string) {
      console.log(`Permission ${state}`);
    }

    navigator.permissions
      .query({ name: "geolocation" })
      .then((result) => {
        if (result.state === "granted" || result.state === "prompt") {
          report(result.state);
          navigator.geolocation.getCurrentPosition(
            revealPosition,
            positionDenied,
            geoSettings
          );
        } else if (result.state === "denied") {
          report(result.state);
          setCoords({
            lon: 0,
            lat: 0,
          });
        }

        result.addEventListener("change", () => {
          report(result.state);
        });

        return true;
      })
      .then(() => {
        console.log(coords);
      });
  }, []);

  const getLocations = ({ lon, lat }: Coordinates) => {
    (async () => {
      try {
        const data = await fetch(
          `https://api.geoapify.com/v2/places?categories=catering&filter=circle:${lon},${lat},${RANGE}&limit=${LIMIT}&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API}`,
          { cache: "force-cache" }
        );
        const json: Geoapify = await data.json();
        console.log(json);
        setOutlets(json);
      } catch (err) {
        console.error(err);
      }

      try {
        const response = await fetch(
          `https://api.pexels.com/v1/search?query=food&per_page=${LIMIT}`,
          {
            method: "GET",
            headers: {
              Authorization: process.env.NEXT_PUBLIC_PEXELS_API || "",
            },
            cache: "force-cache",
          }
        );

        if (response.ok) {
          const result: Pexels = await response.json();
          setImages(result);
          console.log(result);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  };

  return (
    <>
      <h2 className="text-5xl text-center">Outlets Near You</h2>
      <div className="md:mx-20 mx-5 grid place-content-center">
        {(outlets?.features && outlets?.features.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,250px)] grid-flow-row p-8 auto-rows-fr gap-5 text-white max-w-6xl">
            {outlets?.features &&
              outlets?.features.length > 0 &&
              outlets?.features.map((feature, index) => (
                <div
                  key={index}
                  className="shadow-lg bg-white text-black hover:-translate-y-2 hover:shadow-2xl ease-in-out duration-500 overflow-hidden rounded-xl transition-transform cursor-pointer"
                >
                  <Link href={`/outlet/${feature.properties.place_id}`}>
                    <Image
                      src={
                        images?.photos[index]?.src.tiny || "/placeholder.png"
                      }
                      width={230}
                      height={230}
                      className="w-full"
                      alt="food picture"
                    />

                    <div className="pl-3 mb-3">
                      <div className="flex items-center justify-start gap-2">
                        <p
                          className={`rounded-full my-3 text-white bg-blue-400 font-thin text-xs px-2 py-1 w-fit`}
                        >
                          {feature.properties.categories[1]
                            .split(".")[1]
                            .toUpperCase()}
                        </p>
                      </div>
                      <h5 className="text-2xl mb-2">
                        {feature.properties.name}
                      </h5>
                      <p className="font-thin text-sm text-slate-500">
                        {feature.properties.address_line2}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}

            <div
              className="p-10 shadow-lg bg-white text-black hover:bg-slate-100 transition-colors ease-in-out cursor-pointer overflow-hidden rounded-xl"
              onClick={() => {
                alert(
                  "I am poor and cannot afford to pay for more API calls :("
                );
              }}
            >
              <div className="flex items-center justify-center w-full h-full">
                <h5 className="text-2xl">View More &rarr;</h5>
              </div>
            </div>
          </div>
        )) || <p>Loading...</p>}
      </div>
    </>
  );
}
