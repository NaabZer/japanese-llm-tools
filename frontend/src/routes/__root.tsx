import React from 'react';
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { LanguageProvider } from 'context/LanguageContext';

import { NavBar } from 'components/NavBar';
import 'src/App.scss';

function AppContent() {

  return (
    <div className="App">
      <NavBar />
      <Outlet/>
    </div>
  );
}
//
// Wrapper component to provide the LanguageContext
function App() {
  return (
    <>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
      <TanStackRouterDevtools />
    </>
  );
}

export const Route = createRootRoute({
  component: App
})
