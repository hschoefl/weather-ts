import imageUrl from "../assets/icons/bas/sunset.png";

function Sunset({ sunset }: { sunset: string }) {
  return (
    <div className="flex flex-row justify-start">
      <img src={imageUrl} alt="sunset icon" className="w-8 h-8" />
      <p className="ml-2 text-md text-2xl">{sunset} Uhr</p>
    </div>
  );
}
export default Sunset;
