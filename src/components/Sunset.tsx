import imageUrl from "../assets/icons/bas/sunset.png";

function Sunset({ sunset }: { sunset: string }) {
  return (
    <div className="flex flex-row justify-start">
      <img src={imageUrl} alt="sunset icon" className="w-6 h-6" />
      <p className="ml-2 text-md">{sunset}</p>
    </div>
  );
}
export default Sunset;
