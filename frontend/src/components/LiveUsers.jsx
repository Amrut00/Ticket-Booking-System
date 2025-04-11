import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { socket } from '../socket';
import axios from 'axios';

// Create a context to share LB URLs
export const LoadBalancerContext = React.createContext();

const LiveUsers = ({ lbUrls, setLbUrls }) => {
  const location = useLocation();
  const [counts, setCounts] = useState({ movies: 0, events: 0, sports: 0 });

  // Function to get LB URL from backend
  const getLoadBalancerUrl = async (service, count) => {
    try {
      const response = await axios.post('http://localhost:5000/get-load-balancer', {
        users: count
      });
      
      return response.data.url;
    } catch (error) {
      console.error('Error fetching LB URL:', error);
      return lbUrls[service]; // Return current URL if request fails
    }
  };

  // Update LB URLs when counts change
  useEffect(() => {
    const updateUrls = async () => {
      const newUrls = { };
      for (const service in counts) {
        newUrls[service] = await getLoadBalancerUrl(service, counts[service]);
      }
      setLbUrls(prev => ({ ...prev, ...newUrls }));
      console.log("Updated URLs:", newUrls);
    };
    updateUrls();
  }, [counts]);

  // Socket.io setup
  useEffect(() => {
    const currentPage = location.pathname.split('/')[1] || 'movies';
    
    socket.on('pageCounts', (newCounts) => {
      setCounts(newCounts);
    });

    socket.emit('joinPage', currentPage);

    return () => {
      socket.off('pageCounts');
      socket.emit('leavePage', currentPage);
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