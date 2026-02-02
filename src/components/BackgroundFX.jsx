const meteors = [
  { top: "-10%", left: "15%", delay: "0s", duration: "12s", scale: 1 },
  { top: "-15%", left: "45%", delay: "2.5s", duration: "11s", scale: 0.85 },
  { top: "-12%", left: "70%", delay: "10s", duration: "13s", scale: 1.1 },
  { top: "-18%", left: "25%", delay: "15s", duration: "12s", scale: 0.95 },
  { top: "-14%", left: "85%", delay: "20s", duration: "11.6s", scale: 0.9 },
];

const stars = [
  // Left
  { id: 1, top: "15%", left: "10%", size: "3px" },
  { id: 2, top: "20%", left: "14%", size: "2.5px" },
  { id: 3, top: "25%", left: "14%", size: "2px" },
  { id: 4, top: "28%", left: "19%", size: "2.5px" },
  
  // Top middle 
  { id: 5, top: "12%", left: "45%", size: "2.5px" },
  { id: 6, top: "14%", left: "54%", size: "3px" },
  { id: 7, top: "22%", left: "50%", size: "2px" },
  
  // Right upper
  { id: 8, top: "18%", left: "75%", size: "2.5px" },
  { id: 9, top: "22%", left: "78%", size: "3px" },
  { id: 10, top: "27%", left: "82%", size: "2px" },
  { id: 11, top: "31%", left: "85%", size: "2.5px" },
  
  // Middle left
  { id: 12, top: "48%", left: "15%", size: "2.5px" },
  { id: 13, top: "52%", left: "19%", size: "2px" },
  { id: 14, top: "56%", left: "23%", size: "3px" },
  
  // Center
  { id: 15, top: "50%", left: "48%", size: "3px" },
  { id: 16, top: "55%", left: "53%", size: "2.5px" },
  { id: 17, top: "60%", left: "48%", size: "2px" },
  { id: 18, top: "55%", left: "43%", size: "2.5px" },
  
  // Right lower
  { id: 19, top: "65%", left: "78%", size: "2.5px" },
  { id: 20, top: "73%", left: "78%", size: "3px" },
  { id: 21, top: "73%", left: "85%", size: "2px" },
  
  // Bottom
  { id: 22, top: "78%", left: "32%", size: "2.5px" },
  { id: 23, top: "79%", left: "38%", size: "2px" },
  { id: 24, top: "80%", left: "43%", size: "3px" },
];


const BackgroundFX = () => {
  return (
    <div className="space-bg" aria-hidden="true">
      <div className="space-stars"></div>
      <div className="space-nebula"></div>
      <div className="space-constellations">
        {stars.map((star) => (
          <span
            key={`star-${star.id}`}
            className="constellation-star"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
            }}
          ></span>
        ))}
      </div>
      <div className="space-meteors">
        {meteors.map((meteor, index) => (
          <span
            key={index}
            className="meteor"
            style={{
              top: meteor.top,
              left: meteor.left,
              animationDelay: meteor.delay,
              animationDuration: meteor.duration,
              transform: `scale(${meteor.scale})`,
            }}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default BackgroundFX;
