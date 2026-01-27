import { NavLink } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { Field } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "@/store";
import { asyncGetStories, clearHN } from "@/store/slices/hnSlice";
import { asyncGetImgs, clearImg } from "@/store/slices/unsplashSlice";
import { useEffect, useState } from "react";

type Props = {
  darkTheme: boolean;
  setDarkTheme: (value: boolean) => void;
};

export default function Navbar({ darkTheme, setDarkTheme }: Props) {
  const { page } = useAppSelector((state) => state.unsplashImg);
  const [query, setquery] = useState("");
  const dispatch = useAppDispatch();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      query: "",
    },
  });

  interface QueryFormData {
    query: string;
  }

  const submitQuery = (data: QueryFormData) => {
    dispatch(clearImg());
    dispatch(clearHN());
    dispatch(asyncGetStories(data.query));
    dispatch(asyncGetImgs({ query: data.query, page }));
    setquery(data.query);
  };

  useEffect(() => {
    query && dispatch(asyncGetImgs({ query, page }));
  }, [page]);

  const activeTab = (() => {
    const path = location.pathname;
    switch (true) {
      case path.startsWith("/images"):
        return "Unsplash";
      case path.startsWith("/search"):
        return "Hacker News";
      default:
        return "Hacker News";
    }
  })();

  return (
    <div className="p-5 pb-0 flex flex-wrap sm:justify-between justify-center items-center border-b dark:border-gray-700 border-gray-200 ">
      <div className="flex items-center space-x-5 w-full max-w-7xl mx-auto">
        <NavLink to="/" className="flex-shrink-0">
          <p className="text-base sm:text-2xl font-bold text-b py-1 px-2 rounded dark:text-whith">
            Vapor 🔎
          </p>
        </NavLink>
        <form onSubmit={handleSubmit(submitQuery)} className="flex-1 max-w-2xl">
          <Field className="w-auto">
            {/* <FieldLabel htmlFor="query-input">input</FieldLabel> */}
            <Controller
              name="query"
              control={control}
              rules={{ required: "Cannot be empty" }}
              render={({ field }) => (
                <>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id="query-input"
                      placeholder="Search..."
                      autoComplete="off"
                      className="w-full h-12 text-md rounded-full pl-12 transition-shadow"
                    />
                    <InputGroupAddon align="inline-start">
                      <SearchIcon className="text-muted-foreground" />
                    </InputGroupAddon>
                  </InputGroup>
                  {/* {fieldState.error && (
                    <FieldDescription>
                      {fieldState.error.message}
                    </FieldDescription>
                  )} */}
                </>
              )}
            />
          </Field>
        </form>

        <button
          type="button"
          onClick={() => setDarkTheme(!darkTheme)}
          className="text-xl flex-shrink-0 whitespace-nowrap ml-auto"
        >
          {darkTheme ? "💡 Light" : "🌙 Dark"}
        </button>
      </div>
      <div className="w-full max-w-7xl mx-auto sm:px-36 justify-between">
        <Tabs defaultValue={activeTab}>
          <TabsList variant="line">
            <NavLink to="/search">
              <TabsTrigger
                value="Hacker News"
                className="after:bg-blue-600 data-[state=active]:text-blue-600"
              >
                Hacker News
              </TabsTrigger>
            </NavLink>

            <NavLink to="/images">
              <TabsTrigger
                value="Unsplash"
                className="after:bg-blue-600 data-[state=active]:text-blue-600"
              >
                Unsplash
              </TabsTrigger>
            </NavLink>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
