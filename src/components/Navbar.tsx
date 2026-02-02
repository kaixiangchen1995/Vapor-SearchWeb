import { NavLink, useLocation, useNavigate } from "react-router-dom";
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

// Search Form Component
const SearchForm = ({
  onSubmit,
}: {
  onSubmit: (data: { query: string }) => void;
}) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      query: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-1 max-w-2xl">
      <Field className="w-auto">
        <Controller
          name="query"
          control={control}
          rules={{ required: "Cannot be empty" }}
          render={({ field }) => (
            <>
              <InputGroup className="rounded-full border border-gray-300 dark:border-gray-600 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                <InputGroupAddon align="inline-start">
                  <SearchIcon className="text-muted-foreground" />
                </InputGroupAddon>
                <InputGroupInput
                  {...field}
                  id="query-input"
                  placeholder="Search..."
                  autoComplete="off"
                />
              </InputGroup>
            </>
          )}
        />
      </Field>
    </form>
  );
};

// Theme Toggle Component
const ThemeToggle = ({
  darkTheme,
  setDarkTheme,
}: {
  darkTheme: boolean;
  setDarkTheme: (value: boolean) => void;
}) => {
  return (
    <button
      type="button"
      onClick={() => setDarkTheme(!darkTheme)}
      className="text-xl flex-shrink-0 whitespace-nowrap ml-auto btn-secondary"
      aria-label="Toggle theme"
    >
      {darkTheme ? "💡 Light" : "🌙 Dark"}
    </button>
  );
};

// Navigation Tabs Component
const NavigationTabs = ({ activeTab }: { activeTab: string }) => {
  return (
    <Tabs value={activeTab}>
      <TabsList variant="line">
        <NavLink to="/search">
          <TabsTrigger
            value="/search"
            className="after:bg-blue-600 data-[state=active]:text-blue-600"
          >
            Hacker News
          </TabsTrigger>
        </NavLink>

        <NavLink to="/images">
          <TabsTrigger
            value="/images"
            className="after:bg-blue-600 data-[state=active]:text-blue-600"
          >
            Unsplash
          </TabsTrigger>
        </NavLink>
      </TabsList>
    </Tabs>
  );
};

// Mobile Menu Component
const MobileMenu = ({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: (tab: string) => void;
}) => {
  return (
    <div className="md:hidden">
      <select
        value={activeTab}
        onChange={(e) => onTabChange(e.target.value)}
        className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
      >
        <option value="/search">Hacker News</option>
        <option value="/images">Unsplash</option>
      </select>
    </div>
  );
};

type Props = {
  darkTheme: boolean;
  setDarkTheme: (value: boolean) => void;
};

export default function Navbar({ darkTheme, setDarkTheme }: Props) {
  const { page } = useAppSelector((state) => state.unsplashImg);
  const [query, setquery] = useState("");
  const dispatch = useAppDispatch();

  //get location pathname
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname === "/images" ? "/images" : "/search";

  const submitQuery = (data: { query: string }) => {
    dispatch(clearImg());
    dispatch(clearHN());
    setquery(data.query);
  };

  useEffect(() => {
    if (query) {
      dispatch(asyncGetImgs({ query, page }));
      dispatch(asyncGetStories(query));
    }
  }, [dispatch, query, page]);

  const handleTabChange = (path: string) => {
    navigate(path);
  };

  return (
    <div className="p-5 pb-0 flex flex-wrap sm:justify-between justify-center items-center border-b dark:border-gray-700 border-gray-200">
      <div className="flex items-center space-x-5 w-full max-w-7xl mx-auto">
        <NavLink to="/" className="flex-shrink-0">
          <p className="text-base sm:text-2xl font-bold text-b py-1 px-2 rounded dark:text-whith">
            Vapor 🔎
          </p>
        </NavLink>
        <SearchForm onSubmit={submitQuery} />
        <ThemeToggle darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
      </div>

      {/* Desktop tabs */}
      <div className="hidden md:block w-full max-w-7xl mx-auto sm:px-36 justify-between">
        <NavigationTabs activeTab={currentPath} />
      </div>

      {/* Mobile menu */}
      <div className="md:hidden w-full max-w-7xl mx-auto px-4">
        <MobileMenu activeTab={currentPath} onTabChange={handleTabChange} />
      </div>
    </div>
  );
}
