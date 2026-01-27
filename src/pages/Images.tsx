import { useCallback, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { addPage } from "../store/slices/unsplashSlice";
import Loading from "../components/Loading";

type Props = {};

export default function Images({}: Props) {
  const { results, total_pages, page, loading } = useAppSelector(
    (state) => state.unsplashImg,
  );
  const dispatch = useAppDispatch();
  //create a Ref to store the IntersectionObserver
  const observer = useRef<IntersectionObserver | null>(null);
  //carete a CallBack Ref to observe the last dom
  const lastImageElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return; // is loading not action
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entires) => {
        if (entires[0].isIntersecting && page < total_pages) {
          dispatch(addPage());
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading],
  );

  // useEffect(() => {
  //   dispatch(asyncGetImgs({ query: "decorated artprint", page }));
  // }, [page]);

  // useEffect(() => {
  //   console.log("unsplashImg:", results);
  // }, [results]);

  return (
    <div className="p-5">
      <ul className=" columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {results?.map(
          ({ id, alt_description, urls: { regular }, links: { html } }) => {
            return (
              <li
                key={id}
                className="break-inside-avoid transition delay-150 duration-300 ease-in-out hover:shadow-xl hover:scale-110"
              >
                <a
                  href={html}
                  target="_blank"
                  rel="noreferrer"
                  title={alt_description ?? undefined}
                >
                  <img
                    src={regular}
                    alt={alt_description ?? undefined}
                    loading="lazy"
                  />
                </a>
              </li>
            );
          },
        )}
      </ul>
      <div ref={lastImageElementRef}></div>
      {loading ? <Loading /> : null}
    </div>
  );
}
