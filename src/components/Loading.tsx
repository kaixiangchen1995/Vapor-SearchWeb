import { Puff } from "react-loader-spinner";

type Props = {};

export default function Loading({}: Props) {
  return (
    <div className="flex justify-center items-center">
      <Puff
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
