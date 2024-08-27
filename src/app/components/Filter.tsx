enum FilterOption {
  ALL = "all",
  COMPLETED = "true",
  NOT_COMPLETED = "false",
}

type Props = {
  getTodoList: (completed?: boolean) => void;
};

export default function Filter({ getTodoList }: Props) {
  const handleChange = (event: any) => {
    const { value } = event.target;
    getTodoList(value === "all" ? undefined : value === "true");
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-2xl">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Select an option filter
        </label>
        <select
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          defaultValue={"all"}
          onChange={handleChange}
        >
          <option selected value={FilterOption.ALL}>
            All
          </option>
          <option value={FilterOption.COMPLETED}>Completed</option>
          <option value={FilterOption.NOT_COMPLETED}>Not Completed</option>
        </select>
      </div>
    </div>
  );
}
