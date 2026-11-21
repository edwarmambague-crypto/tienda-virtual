export default function Spinner({ text = 'Cargando...' }: { text?: string }) {
  return (
    <div className="state-box">
      <div className="spinner" />
      <p>{text}</p>
    </div>
  );
}