import imageUrl from "../assets/icons/bas/sunrise.png";

function Sunrise({ sunrise }: { sunrise: string }) {
  return (
    <div className="flex flex-row justify-start">
      <img src={imageUrl} alt="sunrise icon" className="w-6 h-6" />
      <p className="ml-2 text-md">{sunrise}</p>
    </div>
  );
}
export default Sunrise;
