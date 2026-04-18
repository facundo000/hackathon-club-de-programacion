import { useState } from 'react';
import AppHeader from '../components/AppHeader';
import LeftSidebar from '../components/LeftSidebar';
import PostComposer from '../components/PostComposer';
import PostFeed from '../components/PostFeed';
import RightSidebar from '../components/RightSidebar';

function DashboardPage() {
  const [selectedForumId, setSelectedForumId] = useState(null);
  const [selectedAuthorId, setSelectedAuthorId] = useState(null);
  const [feedKey, setFeedKey] = useState(0);

  const handleForumSelect = (forumId) => {
    setSelectedForumId(forumId);
    setSelectedAuthorId(null);
    setFeedKey((k) => k + 1);
  };

  const handleAuthorSelect = (authorId) => {
    setSelectedAuthorId(authorId);
    setSelectedForumId(null);
    setFeedKey((k) => k + 1);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <AppHeader />
      <main className="mx-auto w-full max-w-7xl px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)_280px]">
          <div className="order-2 lg:order-none">
            <LeftSidebar
              selectedForumId={selectedForumId}
              onForumSelect={handleForumSelect}
            />
          </div>
          <div className="order-1 space-y-5 lg:order-none">
            <PostComposer onPost={() => setFeedKey((k) => k + 1)} />
            <PostFeed key={feedKey} forumId={selectedForumId} authorId={selectedAuthorId} />
          </div>
          <div className="order-3 lg:order-none">
            <RightSidebar
              selectedAuthorId={selectedAuthorId}
              onAuthorSelect={handleAuthorSelect}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
