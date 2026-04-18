import AppHeader from '../components/AppHeader';
import EventSwipeDeck from '../components/EventSwipeDeck';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';

function EventsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <AppHeader />
      <main className="mx-auto w-full max-w-7xl px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)_280px]">
          <div className="order-2 lg:order-none">
            <LeftSidebar />
          </div>
          <div className="order-1 lg:order-none">
            <EventSwipeDeck />
          </div>
          <div className="order-3 lg:order-none">
            <RightSidebar />
          </div>
        </div>
      </main>
    </div>
  );
}

export default EventsPage;
