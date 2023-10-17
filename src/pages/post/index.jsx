import { useParams } from "react-router-dom";

export default function Post() {
  const params = useParams();

  return <div>POST ID : {params.id}</div>;
}
