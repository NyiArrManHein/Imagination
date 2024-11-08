export default function Modal({ id, children }) {
  return (
    <dialog id={id}>
      <div
        onClick={() => document.getElementById(id).close()}
        className="fixed inset-0 flex justify-center items-center bg-black/20"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative bg-white rounded-xl shadow"
        >
          <button
            onClick={() => document.getElementById(id).close()}
            className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
          >
            X
          </button>
          {children}
        </div>
      </div>
    </dialog>
  );
}
