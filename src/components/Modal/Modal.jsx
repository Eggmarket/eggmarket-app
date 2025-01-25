export default function Modal({ id, children, onClose }) {
  return (
    <dialog id={id} className={`modal modal-bottom md:modal-middle`}>
      <div className="modal-box p-0 rounded-t-lg">{children}</div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>
          <span className="icon-light-bold-Close"></span>
        </button>
      </form>
    </dialog>
  );
}

