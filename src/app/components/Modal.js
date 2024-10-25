export default function Modal({ id, children }) {
  return (
    // <div
    //   id={id}
    //   onClick={onClose}
    //   className={`fixed inset-0 flex justify-center items-center transition-colors ${
    //     open ? "visible bg-black/20" : "invisible"
    //   }`}
    // >
    //   <div
    //     onClick={(e) => e.stopPropagation()}
    //     className={`bg-white py-20 px-32 rounded-xl shadow  transition-all ${
    //       open ? "scale-100 opacity-100" : "scale-125 opacity-0"
    //     }`}
    //   >
    //     <button
    //       onClick={onClose}
    //       className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
    //     >
    //       X
    //     </button>
    //     {children}
    //   </div>
    // </div>

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
        {/* <form method="dialog" className="modal-backdrop">
        <button
          onClick={() => document.getElementById(id).close()}
          className="absolute inset-0 w-full h-full bg-black opacity-30"
        ></button>
      </form> */}
      </div>
    </dialog>
  );
}
