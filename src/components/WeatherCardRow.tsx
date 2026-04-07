interface WeatherCardRowProps {
  imageUrl?: string
  imageText?: string
  text: string
  isRealImage?: boolean
}

function WeatherCardRow({
  imageUrl,
  imageText,
  text,
  isRealImage = true,
}: WeatherCardRowProps) {
  console.log(isRealImage)
  return (
    <div className={`flex flex-row text-2xl`}>
      {isRealImage ? (
        <img src={imageUrl} alt={imageText} className='h-8 w-8' />
      ) : (
        <p>{imageText}</p>
      )}
      <p className='ml-2 text-2xl'>{text}</p>
    </div>
  )
}

export default WeatherCardRow

//  <div className={`flex flex-row text-2xl`}>
//           <img src={imageHumidity} alt="Humidity icon" className="w-8 h-8" />
//           <p className="ml-2 text-2xl">{relative_humidity_2m_max} %</p>
//         </div>
