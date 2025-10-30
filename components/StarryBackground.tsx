import React, { useMemo } from 'react';

const StarryBackground: React.FC = () => {
  const stars = useMemo(() => {
    const starElements = [];
    for (let i = 0; i < 500; i++) {
      const style = {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 8}s`,
        animationDuration: `${3 + Math.random() * 5}s`,
        transform: `scale(${Math.random() * 0.5 + 0.5})`
      };
      starElements.push(<div key={i} className="star" style={style} />);
    }
    return starElements;
  }, []);

  return (
      <div className="dark-theme-bg">
        {stars}
      </div>
  );
};

export default StarryBackground;
