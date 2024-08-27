import { Modal } from "./Modal";

type Props = {
  handleDelete: () => void;
  handleClose: () => void;
};

export function ConfirmDelete({ handleDelete, handleClose }: Props) {
  return (
    <Modal>
      <div className="max-w-lg w-full h-1/3 bg-white border border-gray-200 rounded p-4">
        <h1 className="text-xl font-weight-bold "> Confirm delete? </h1>
        <p className="mt-4">Are you sure you want to delete this task?</p>
        <div className="flex justify-end items-end gap-2  mt-10">
          <button
            onClick={handleDelete}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Confirm
          </button>
          <button
            onClick={handleClose}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
