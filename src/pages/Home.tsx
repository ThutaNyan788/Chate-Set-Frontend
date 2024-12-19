import React from 'react';
import Hero from '../components/Hero';
import TopNavbar from '@/components/layout/TopNavbar';

const Home: React.FC = () => {
  return (
    <>
      <TopNavbar />
      <div>
        <div className="min-h-[91vh] bg-gradient-to-br from-indigo-50 to-white dark:from-gray-950 dark:to-gray-900">
          <Hero />
        </div>
      </div>
    </>
  );
};

export default Home;
