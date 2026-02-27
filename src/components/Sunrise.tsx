import imageUrl from "../assets/icons/bas/sunrise.png";

function Sunrise({ sunrise }: { sunrise: string }) {
  return (
    <div className="flex flex-row justify-start text-2xl">
      <img src={imageUrl} alt="sunrise icon" className="w-8 h-8" />
      <p className="ml-2 text-2xl">{sunrise} Uhr</p>
    </div>
  );
}
export default Sunrise;
