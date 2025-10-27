import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react';

// ไอคอน (ใช้ SVG inline)
const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
  </svg>
);

const PauseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
  </svg>
);

const ResetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.185a.75.75 0 0 0-.75.75v.75c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-4.5a.75.75 0 0 0-.75-.75v-.75a.75.75 0 0 0-.75-.75h-.75A11.25 11.25 0 0 0 3.5 10.059v.75a.75.75 0 0 0 .75.75h.75a.75.75 0 0 0 .75-.75v-.75Z" clipRule="evenodd" />
    <path fillRule="evenodd" d="M19.245 13.941a7.5 7.5 0 0 1-12.548 3.364l-1.903-1.903h3.185a.75.75 0 0 0 .75-.75v-.75a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0-.75.75v4.5a.75.75 0 0 0 .75.75v.75c0 .414.336.75.75.75h.75a11.25 11.25 0 0 0 19.25-3.309v-.75a.75.75 0 0 0-.75-.75h-.75a.75.75 0 0 0-.75.75v.75Z" clipRule="evenodd" />
  </svg>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.948 1.52l-.082.281c-.083.28-.15.558-.22.832l-.091.352a.75.75 0 0 1-1.449.115l-.01-.027c-.07-.179-.153-.355-.244-.526l-.028-.052c-.246-.468-.691-.877-1.23-.877a.75.75 0 0 0-.612.321l-.004.007c-.02.03-.04.06-.06.09l-.028.045c-.08.128-.148.263-.206.402l-.018.042c-.22.51-.52.993-.868 1.43l-.015.019c-.06.075-.11.146-.152.21l-.01.015c-.17.26-.314.53-.427.817l-.007.017c-.12.29-.187.59-.187.9v.28c0 .308.067.608.187.9l.007.017c.113.287.257.557.427.817l.01.015c.042.064.092.135.152.21l.015.019c.348.437.648.92.868 1.43l.018.042c.058.139.126.274.206.402l.028.045c.02.03.04.06.06.09l.004.007c.16.26.47.447.802.447.539 0 .984-.409 1.23-.877l.028-.052c.09-.17.174-.347.244-.526l.01-.027a.75.75 0 0 1 1.449.115l.091.352c.07.274.137.552.22.832l.082.281c.249.857 1.03.1.52 1.948 1.52h1.844c.917 0 1.699-.663 1.948-1.52l.082-.281c.083-.28.15-.558.22-.832l.091-.352a.75.75 0 0 1 1.449-.115l.01.027c.07.179.153.355.244.526l.028.052c.246.468.691.877 1.23.877.332 0 .642-.187.802-.447l.004-.007c.02-.03.04-.06.06-.09l.028-.045c.08-.128.148-.263.206-.402l.018-.042c.22-.51.52-.993.868-1.43l.015-.019c.06-.075.11-.146.152-.21l.01-.015c.17-.26.314-.53.427-.817l.007-.017c.12-.29.187-.59.187-.9v-.28c0-.308-.067-.608-.187-.9l-.007-.017c-.113-.287-.257-.557-.427-.817l-.01-.015c-.042-.064-.092-.135-.152-.21l-.015-.019c-.348-.437-.648-.92-.868-1.43l-.018-.042c-.058-.139-.126-.274-.206-.402l-.028-.045c-.02-.03-.04-.06-.06-.09l-.004-.007a.75.75 0 0 0-.802-.447c-.539 0-.984.409-1.23.877l-.028.052c-.09.17-.174.347-.244.526l-.01.027a.75.75 0 0 1-1.449-.115l-.091-.352c-.07-.274-.137-.552-.22-.832l-.082-.281c-.249-.857-1.03-1.52-1.948-1.52H11.08Z" clipRule="evenodd" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const FullscreenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
  </svg>
);

const ExitFullscreenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
  </svg>
);


/**
 * Settings Modal Component
 */
const SettingsModal = ({ isOpen, onClose, onSave }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(25);

  if (!isOpen) return null;

  const handleSave = () => {
    const totalMinutes = (parseInt(hours, 10) || 0) * 60 + (parseInt(minutes, 10) || 0);
    onSave(totalMinutes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-lg p-6 w-11/12 max-w-sm shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">ตั้งค่าเวลา</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <CloseIcon />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="hours" className="block text-sm font-medium text-gray-300 mb-1">ชั่วโมง</label>
            <input
              type="number"
              id="hours"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              min="0"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="minutes" className="block text-sm font-medium text-gray-300 mb-1">นาที</label>
            <input
              type="number"
              id="minutes"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              min="0"
              max="59"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          ตกลง
        </button>
      </div>
    </div>
  );
};


/**
 * Main App Component
 */
export default function App() {
  const [totalMinutes, setTotalMinutes] = useState(25); // เวลาที่ตั้งค่า (นาที)
  const [secondsLeft, setSecondsLeft] = useState(totalMinutes * 60);
  const [isActive, setIsActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const intervalRef = useRef(null);
  const audioRef = useRef(null); // Ref สำหรับเสียง

  // โหลดเสียง
  useEffect(() => {
    audioRef.current = new Audio('https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg');
  }, []);

  // ตรวจสอบสถานะ fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsActive(false);
            playAlarm();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive]);

  useEffect(() => {
    // อัปเดตเวลาที่เหลือเมื่อ totalMinutes เปลี่ยน (และตัวจับเวลาไม่ได้ทำงาน)
    if (!isActive) {
      setSecondsLeft(totalMinutes * 60);
    }
  }, [totalMinutes]);

  const playAlarm = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSecondsLeft(totalMinutes * 60);
  };

  const handleSaveSettings = (newTotalMinutes) => {
    setTotalMinutes(newTotalMinutes);
    setIsActive(false); // หยุดเวลาเมื่อตั้งค่าใหม่
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error);
    }
  };

  // Format เวลา (HH:MM:SS หรือ MM:SS)
  const formatTime = () => {
    const hours = Math.floor(secondsLeft / 3600);
    const minutes = Math.floor((secondsLeft % 3600) / 60);
    const seconds = secondsLeft % 60;

    const showHours = totalMinutes * 60 >= 3600; // แสดงชั่วโมงถ้าตั้งค่าเกิน 1 ชม.

    const pad = (num) => (num < 10 ? '0' : '') + num;

    if (showHours) {
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    } else {
      return `${pad(minutes)}:${pad(seconds)}`;
    }
  };
  
  const showHours = totalMinutes * 60 >= 3600;
  const timerFontSizeClass = showHours 
    ? "text-7xl md:text-8xl" // เล็กลงเมื่อมีชั่วโมง
    : "text-8xl md:text-9xl"; // ขนาดเดิม

  // URL ของ Spotify Playlist (Lofi Beats)
  // แก้ไข: ต้องใช้ /embed/ format
  const spotifyPlaylistUrl = "https://open.spotify.com/embed/playlist/37i9dQZF1DZ06evO1tyMni?utm_source=generator&theme=0";


  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 font-sans">
        <main className="w-full max-w-md text-center">
          <h1 className="text-3xl font-bold text-gray-300 mb-6">Focus Timer</h1>

          {/* Timer Display */}
          <div className={`font-mono font-bold ${timerFontSizeClass} my-8`}>
            {formatTime()}
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={toggleTimer}
              className={`flex items-center justify-center w-24 h-14 rounded-lg font-semibold transition-all duration-200 shadow-lg ${
                isActive
                  ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isActive ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button
              onClick={resetTimer}
              className="flex items-center justify-center w-14 h-14 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-200"
              title="รีเซ็ต"
            >
              <ResetIcon />
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center w-14 h-14 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-200"
              title="ตั้งค่า"
            >
              <SettingsIcon />
            </button>
          </div>

          {/* ส่วนของ Spotify */}
          <div className="pt-4">
            <iframe
              title="Spotify Player"
              style={{ borderRadius: '12px' }}
              src={spotifyPlaylistUrl}
              width="100%"
              height="152"
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        </main>

        {/* Fullscreen Toggle Button - Bottom Right */}
        <button
          onClick={toggleFullscreen}
          className="fixed bottom-4 right-4 flex items-center justify-center w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-200 shadow-lg z-10"
          title={isFullscreen ? "ออกจากเต็มจอ" : "ขยายเต็มจอ"}
        >
          {isFullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
        </button>
      </div>

      <SettingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveSettings}
      />
    </>
  );
}
