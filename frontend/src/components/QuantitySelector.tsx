import './QuantitySelector.css';

interface Props {
  value: number;
  max: number;
  onChange: (value: number) => void;
}

export default function QuantitySelector({ value, max, onChange }: Props) {
  return (
    <div className="qty">
      <button type="button" onClick={() => onChange(value - 1)} disabled={value <= 1} aria-label="Disminuir">
        −
      </button>
      <span>{value}</span>
      <button type="button" onClick={() => onChange(value + 1)} disabled={value >= max} aria-label="Aumentar">
        +
      </button>
    </div>
  );
}