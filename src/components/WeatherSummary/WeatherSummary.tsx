import React, { useEffect, useState } from 'react';
import { getOpenAIResponse } from '../../RestServices/RestServices';
import './WeatherSummary.scss'
import ReactSelectCreatable from 'react-select/creatable';
import Spinner from '../Spinner/Spinner';
const WeatherSummary = ({ weather, units }: { weather: any, units: string }) => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [prof, setProf] = useState('white collor employee');
  const [loading, setLoading] = useState(false);
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const aiResponse = await getOpenAIResponse(input);
      setResponse(aiResponse.choices[0].text);
    } catch (error) {
      setResponse("Please try again later")
    } finally{
      setLoading(false)
    }

  };
  useEffect(() => {
    if (weather) setInput(`You are a weather assistant, you will get a person's professsion and weather data, based on the following data you 
          should suggest how the weather might impact the person's work and give some suggestions within 80 words or less, profession: ${prof} temp:${weather.main.temp} ${(units === 'metric' ? "C" : ' F')} humidity: ${weather.main.humidity} description: ${weather?.weather?.[0].description} place:${weather.name}`)
  }, [weather, prof])
  return (
    <div className='weather-summary-container'>
      <h1 className='weather-summary-heading'>Weather AI Assistant</h1>
      <div className='weather-summary-control'>

        <form className='weather-summary-form' onSubmit={handleSubmit}>
          <div className='summary-select' >
            <ReactSelectCreatable
              isClearable
              placeholder='Type  or Select your profession from options below'
              options={[
                { value: 'farmer', label: 'Farmer' },
                { value: 'salary man', label: 'Salary man' },
                { value: 'brick layer', label: 'Brick Layer' },
                { value: 'ceo', label: 'CEO' },
              ]}
              onChange={(item) => {
                if (item?.value) setProf(item?.value)

              }
              }
            />
          </div>
          <br />
          <button className='summary-button' type="submit">Generate</button>
        </form>

      </div>
      <div className='ai-response'>

        <p>{ loading ? <Spinner/> : response}</p>
      </div>
    </div>
  )
}

export default WeatherSummary
