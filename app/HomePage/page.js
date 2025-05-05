'use client';
import ProtectedRoute from '../components/ProtectedRoute';
import HomePageContent from '../components/HomePageContent';

const HomePage = () => {
  return (
    <ProtectedRoute>
      <HomePageContent />
    </ProtectedRoute>
  );
};

export default HomePage;
