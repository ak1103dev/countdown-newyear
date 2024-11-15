import { useState, useEffect } from 'react';

const App = () => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const countdownDate = new Date(`January 1, ${currentYear + 1} 00:00:00`).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeRemaining({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-b from-blue-500 to-purple-500 text-white">
      <div className="mx-auto">
        <h1 className="text-6xl font-bold mb-8">Happy New Year {new Date().getFullYear() + 1}!</h1>
        <div className="text-4xl font-bold mb-4">
          {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m {timeRemaining.seconds}s
        </div>
        <p className="text-xl">Until the new year</p>
      </div>
      <div className="mt-8 text-sm text-gray-400">
        Powered by Claude
      </div>
    </div>
  );
};

export default App;