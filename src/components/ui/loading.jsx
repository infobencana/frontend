import Logo from "@/assets/images/circle-logo-filled.svg";

export function Loading() {
  return (
    <div className="absolute w-screen h-[100dvh] bg-white flex justify-center items-center z-20">
      <img
        src={Logo}
        alt="loading logo"
        className="absolute w-20 h-20 lg:w-[100px] lg:h-[100px] z-50"
        draggable={"false"}
      />
      <div className="pulse z-30">
        <div className="z-40"></div>
        <div className="z-40"></div>
      </div>
    </div>
  );
}
