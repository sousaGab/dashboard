"use client";
import React from 'react';
import { CardsProvider } from '@/context/CardsContext';
import DashboardPage from '@/pages/DashboardPage';

const Background = () => (
  <div className='fixed inset-0 z-0'>
    <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
    <div className='absolute inset-0 backdrop-blur-sm' />
  </div>
);

export default function Home() {
  return (
    <main className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
      <Background />
      <CardsProvider>
        <DashboardPage />
      </CardsProvider>
    </main>
  );
}