import imageUrl from '../assets/icons/bas/sunset.png'

function Sunset({ sunset }: { sunset: string }) {
  return (
    <div className='flex flex-row justify-between'>
      <img src={imageUrl} alt='sunset icon' className='w-6 h-6' />
      <p>{sunset}</p>
    </div>
  )
}
export default Sunset
