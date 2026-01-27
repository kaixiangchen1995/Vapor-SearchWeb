// import { useEffect } from "react";
import { useAppSelector } from "../store";
// import { asyncGetStories } from "../store/slices/hnSlice";
import Loading from "../components/Loading";
type Props = {};

export default function Search({}: Props) {
  const { results, loading } = useAppSelector((state) => state.hnSearch);
  // console.log();
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(asyncGetStories("foo"));
  // }, [dispatch]);

  // useEffect(() => {
  //   console.log("hn:", results);
  // }, [results]);

  return loading ? (
    <Loading />
  ) : (
    <div className=" flex w-full px-5 sm:px-24  ">
      <div className="w-full max-w-4xl">
        <ul className="space-y-5 sm:py-6">
          {results?.map(({ objectID, title, url, author }) => {
            return (
              <li key={objectID}>
                <h1 className="font-mono text-xl">{title}</h1>
                <a
                  href={url}
                  target="_blank"
                  className="block w-64 truncate text-blue-500 text-sm after:content-['_↗']"
                >
                  {url}
                </a>
                <p>author:{author}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
