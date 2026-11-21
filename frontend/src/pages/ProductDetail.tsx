import { useParams } from 'react-router-dom';

export default function ProductDetail() {
  const { id } = useParams();
  return <h1>Detalle del producto {id}</h1>;
}