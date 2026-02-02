import { useCallback, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { addPage } from "../store/slices/unsplashSlice";
import Loading from "../components/Loading";

type Props = {
  children?: React.ReactNode;
};

export default function Images({}: Props) {
  const { results, total_pages, page, loading, error } = useAppSelector(
    (state) => state.unsplashImg,
  );
  const dispatch = useAppDispatch();
  // Create a ref to store the IntersectionObserver
  const observer = useRef<IntersectionObserver | null>(null);

  // Create a callback ref to observe the last DOM element
  const lastImageElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading || error) return; // Don't trigger if loading or error

      // Disconnect existing observer
      if (observer.current) {
        observer.current.disconnect();
      }

      // Create new observer
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && page < total_pages) {
            dispatch(addPage());
          }
        },
        {
          threshold: 0.1, // Trigger when 10% of element is visible
        },
      );

      // Observe the node if it exists
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, page, total_pages, dispatch, error],
  );

  // Handle error state
  if (error) {
    return (
      <div className="p-5">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-4xl mx-auto">
          <h2 className="text-lg font-semibold text-red-800 mb-2">
            Error Loading Images
          </h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => {
              dispatch(addPage());
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5">
      <div className="max-w-7xl mx-auto">
        <div className="columns-2 lg:columns-3">
          {results?.map(
            ({ id, alt_description, urls: { regular }, links: { html } }) => {
              return (
                <div
                  key={id}
                  className="break-inside-avoid transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105"
                  style={{ breakInside: "avoid" }}
                >
                  <a
                    href={html}
                    target="_blank"
                    rel="noreferrer"
                    title={alt_description ?? undefined}
                    className="block"
                  >
                    <img
                      src={regular}
                      alt={alt_description ?? undefined}
                      loading="lazy"
                      className="w-full h-auto rounded-lg"
                    />
                  </a>
                </div>
              );
            },
          )}
        </div>
        {/* last HTML element  */}
        <div ref={lastImageElementRef} className="h-10" />

        {loading && <Loading message="Loading more images..." />}

        {!loading && results.length === 0 && (
          <p className="text-center py-12 text-gray-500">No images found.</p>
        )}
      </div>
    </div>
  );
}
