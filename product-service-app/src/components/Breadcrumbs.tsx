import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../apiConfig";


export default function Breadcrumbs() {
  const location = useLocation();
  const { productId } = useParams();
  const pathnames = location.pathname.split("/").filter(x => x);
  const [productName, setProductName] = useState<string | null>(null);
  const stateName = (location.state as { productName?: string })?.productName;

  useEffect(() => {
    if (!stateName && productId) {
      fetch(`${API_BASE_URL}/api/products/${productId}`)
        .then(res => res.json())
        .then(data => setProductName(data.productName));
    }
  }, [productId, stateName]);

  if (location.pathname === "/") {
    return null;
  }

  const title = stateName || productName || pathnames[pathnames.length - 1];

  return (
    <div className="page-title light-background">
      <div className="container d-lg-flex justify-content-between align-items-center">
        <h1 className="mb-2 mb-lg-0">
          {title.replace("-", " ").toUpperCase()}
        </h1>

        <nav className="breadcrumbs">
          <ol>
            <li><Link to="/">Home</Link></li>
            {pathnames.map((value, index) => {
              const to = "/" + pathnames.slice(0, index + 1).join("/");
              const isLast = index === pathnames.length - 1;
              return (
                <li key={to} className={isLast ? "current" : ""}>
                  {isLast ? (
                    title.replace("-", " ")
                  ) : (
                    <Link to={to}>{value.replace("-", " ")}</Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
}
