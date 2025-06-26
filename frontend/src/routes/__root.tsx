import React from 'react';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { LanguageProvider } from 'context/LanguageContext';

import ThemeToggle from 'components/ThemeToggle';
import 'src/App.scss';

function AppContent() {

  return (
    <div className="App">
      <Link to='/sentences'> Sentences </Link>
      <ThemeToggle /> {/* Place the toggle here */}
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
