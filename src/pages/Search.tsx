import { useAppSelector } from "../store";
import Loading from "../components/Loading";
import { useAppDispatch } from "../store";
import { asyncGetStories, clearHN } from "../store/slices/hnSlice";
import { useEffect } from "react";

// Type definitions
interface Story {
  objectID: string;
  title: string;
  url: string;
  author: string;
}

interface SearchProps {
  initialQuery?: string;
}

export default function Search({ initialQuery }: SearchProps) {
  const { results, loading, error } = useAppSelector((state) => state.hnSearch);
  const dispatch = useAppDispatch();
  const query = initialQuery || "";

  // Fetch stories when component mounts or query changes
  useEffect(() => {
    if (query) {
      dispatch(clearHN());
      dispatch(asyncGetStories(query));
    }
  }, [query, dispatch]);

  // Handle error state
  if (error) {
    return (
      <div className="flex w-full px-5 sm:px-24">
        <div className="w-full max-w-4xl">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-red-800 mb-2">
              Error Loading Hacker News
            </h2>
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => {
                dispatch(clearHN());
                if (query) {
                  dispatch(asyncGetStories(query));
                }
              }}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full px-5 sm:px-24">
      <div className="w-full max-w-4xl">
        {loading && <Loading message="Loading stories..." />}

        {!loading && results && results.length > 0 && (
          <ul className="space-y-5 sm:py-6">
            {results.map((story: Story) => (
              <li
                key={story.objectID}
                className="border-b border-gray-200 pb-4"
              >
                <h1 className="font-mono dark:text-white text-xl text-gray-900 hover:text-blue-600 transition-colors">
                  {story.title}
                </h1>
                <a
                  href={story.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full truncate text-blue-500 text-sm hover:text-blue-700 after:content-['_↗']"
                  title={story.url}
                >
                  {story.url}
                </a>
                <p className="text-gray-600 text-sm">by {story.author}</p>
              </li>
            ))}
          </ul>
        )}

        {!loading && results && results.length === 0 && (
          <div className=" py-12">
            <p className="text-center py-12 text-gray-500">No stories found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
