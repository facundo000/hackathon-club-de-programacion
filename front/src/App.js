import AppHeader from './components/AppHeader';
import LeftSidebar from './components/LeftSidebar';
import PostComposer from './components/PostComposer';
import RightSidebar from './components/RightSidebar';

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <AppHeader />
      <main className="mx-auto w-full max-w-7xl px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)_280px]">
          <div className="order-2 lg:order-none">
            <LeftSidebar />
          </div>
          <div className="order-1 space-y-5 lg:order-none">
            <PostComposer />
            <section className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
              Feed principal (siguiente paso)
            </section>
          </div>
          <div className="order-3 lg:order-none">
            <RightSidebar />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
