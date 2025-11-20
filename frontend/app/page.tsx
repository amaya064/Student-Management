import React from 'react';
import Navigation from './Components/Navigation';
import Home from './pages/Home';
import Admin_Login from './Admin/page';

export default function HomePage() {
  return (
    <div>
      <Navigation />
      <Home />
    </div>
  );
}