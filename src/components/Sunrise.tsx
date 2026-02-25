import imageUrl from '../assets/icons/bas/sunrise.png'

function Sunrise({ sunrise }: { sunrise: string }) {
  return (
    <div className='flex flex-row justify-between'>
      <img src={imageUrl} alt='sunrise icon' className='w-6 h-6' />
      <p>{sunrise}</p>
    </div>
  )
}
export default Sunrise
