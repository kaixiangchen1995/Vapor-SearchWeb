import { Puff } from "react-loader-spinner";

type Props = {
  size?: "sm" | "md" | "lg";
  message?: string;
};

export default function Loading({ size = "md", message }: Props) {
  const sizeMap = {
    sm: { height: 40, width: 40 },
    md: { height: 80, width: 80 },
    lg: { height: 120, width: 120 },
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Puff
        visible={true}
        height={sizeMap[size].height}
        width={sizeMap[size].width}
        color="#4fa94d"
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
      {message && (
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          {message}
        </p>
      )}
    </div>
  );
}
