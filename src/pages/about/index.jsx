import { lazy } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import Tile from "@/assets/images/tile-matrix.svg";

const ReactVivus = lazy(() => import("react-vivus"));

export default function About() {
  const matches = useMediaQuery("(min-width:1280px)");

  return (
    <div className="relative w-full min-h-screen font-inter px-4 md:px-5 py-12 xl:py-16">
      <div className="max-w-[960px] w-full mx-auto">
        <h1 className="w-fit h-fit px-4 py-3 mx-auto capitalize text-sm md:text-base text-green text-center font-bold bg-green/5 border border-green rounded-full animate-in fade-in-50 slide-in-from-top-7 duration-1000">
          tentang kami
        </h1>
        <div className="text-justify text-black text-sm md:text-base space-y-7 mt-10">
          <p className="leading-7 animate-in fade-in-50 slide-in-from-bottom-7 duration-1000">
            <span className="text-green font-bold">Infobencana</span> adalah
            sebuah platform yang bertujuan untuk menyediakan informasi bencana
            alam secara akurat, tepat waktu, dan terpadu. Platform ini hadir
            sebagai solusi dari permasalahan yang kerap dihadapi masyarakat
            Indonesia, yakni akses terhadap informasi yang seringkali kurang
            akurat dan tidak tepat waktu ketika bencana terjadi. Infobencana
            mengatasi masalah ini dengan mengintegrasikan, mengolah, dan
            menyebarkan data bencana alam yang relevan dan kredibel dengan
            efisien. Dengan tujuan agar kami dapat memastikan bahwa masyarakat
            selalu mendapatkan informasi terbaru yang di butuhkan pada saat yang
            tepat.
          </p>
          <p className="leading-7 animate-in fade-in-50 slide-in-from-bottom-7 duration-1000">
            Kami meyakini bahwa teknologi memiliki peran yang sangat penting
            untuk membantu masyarakat menghadapi permasalahan tersebut.
            Infobencana merupakan wujud dari upaya kami untuk memberikan
            fitur-fitur informatif, seperti peta bencana, daftar orang yang
            hilang akibat bencana, dan laporan terbaru mengenai bencana alam
            yang sedang berlangsung. Kami juga menyediakan ruang bagi pengguna
            untuk berdiskusi, memberikan masukan, serta memberikan kemudahan
            dalam akses informasi donasi bagi mereka yang terdampak bencana.
            Infobencana hadir dengan satu tujuan yang teguh membantu sesama.
            Kami yakin bahwa dengan informasi yang akurat dan akses mudah ke
            sumber daya yang dibutuhkan, kita dapat bersama-sama mengatasi
            tantangan bencana alam dan menjaga keselamatan masyarakat Indonesia.
          </p>
        </div>
      </div>
      {matches ? (
        <ReactVivus
          id="svg-tile"
          option={{
            file: Tile,
            animTimingFunction: "EASE",
            type: "oneByOne",
            onReady: console.log,
          }}
          callback={console.log}
          className="absolute bottom-0 inset-x-0 opacity-25 h-[140px] overflow-hidden"
        />
      ) : (
        false
      )}
    </div>
  );
}
