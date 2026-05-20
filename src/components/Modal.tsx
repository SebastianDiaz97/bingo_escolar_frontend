type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ open, onClose, children }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button onClick={onClose} className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 w-full max-w-lg md:max-w-md lg:max-w-lg max-h-[90vh] rounded-3xl  overflow-y-auto bg-slate-900 p-6">
        {children}
      </div>
    </div>
  );
}
