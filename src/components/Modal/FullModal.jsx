export default function FullModal({ id, type = "primary", children }) {
  return (
    <dialog id={id} className="modal modal-middle">
      <div
        className={`modal-box fullModal rounded-none max-w-[440px] mx-auto max-h-[100vh] flex flex-col h-screen md:h-fit p-0 ${
          type === "primary" ? "bg-default-50" : "bg-surface-secondary"
        } `}
      >
        {children}
      </div>
    </dialog>
  );
}
