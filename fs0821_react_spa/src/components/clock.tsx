import { useEffect, useState  } from 'react';
import './clock.css'; 
export default function Clock() {

    const [date, setDate] = useState<Date>(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date())
          }, 1000);        
        return function cleanup() {
            clearInterval(timer)
        }
    }, [])

    function rotateSeconds(): string {
        const seconds = date.getSeconds()
        const secondsDegrees = ((seconds / 60) * 360) + 90;
        return `rotate(${secondsDegrees}deg)`
      }
    
      function rotateMinutes() : string {
        const seconds = date.getSeconds()
        const mins = date.getMinutes()
        const minsDegrees = ((mins / 60) * 360) + (( seconds / 60 ) * 6) + 90;
        return `rotate(${minsDegrees}deg)`
      }
    
      function rotateHours(): string {
        const mins = date.getMinutes()
        const hour = date.getHours();
        const hourDegrees = ((hour / 12) * 360) + (( mins / 60 ) * 30) + 90;
        return `rotate(${hourDegrees}deg)`;  
      }    
    return (
        <>
            <div className="clock">
                <div className="outer-clock-face">
                <div className="marking marking-one"></div>
                <div className="marking marking-two"></div>
                <div className="marking marking-three"></div>
                <div className="marking marking-four"></div>
                <div className="inner-clock-face">
                    <div className="hand hour-hand" style={{transform: rotateHours()}}></div>
                    <div className="hand min-hand" style={{transform: rotateMinutes()}}></div>
                    <div className="hand second-hand" style={{transform: rotateSeconds()}}></div>
                </div>
                </div>
            </div>
        </>

    );
  }
