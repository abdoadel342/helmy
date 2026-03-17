import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
