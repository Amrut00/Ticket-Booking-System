import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { socket } from '../socket';

const LiveUsers = () => {
    const location = useLocation();
    const [counts, setCounts] = useState({ movies: 0, events: 0, sports: 0 });
  
    useEffect(() => {
      const currentPage = location.pathname.split('/')[1] || 'movies';
      
      socket.on('pageCounts', (newCounts) => {
        setCounts(newCounts);
      });
  
      socket.emit('joinPage', currentPage);
  
      return () => {
        socket.off('pageCounts');
        socket.emit('leavePage', currentPage); // Add proper cleanup
      };
    }, [location.pathname]);

  const currentPage = location.pathname.split('/')[1] || 'movies';
  const currentCount = counts[currentPage] || 0;

  return (
    <div className="live-users">
      🟢 {currentCount} live users on this page
    </div>
  );
};

export default LiveUsers;