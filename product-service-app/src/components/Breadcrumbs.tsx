import { Link, useLocation } from "react-router-dom";

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(x => x);

  if (location.pathname === "/") {
    return null;
  }

  return (
    <div className="page-title light-background">
      <div className="container d-lg-flex justify-content-between align-items-center">
        <h1 className="mb-2 mb-lg-0">
          {pathnames[pathnames.length - 1].replace("-", " ").toUpperCase()}
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
                    value.replace("-", " ")
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
