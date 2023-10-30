import { useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <h2>Something went wrong.</h2>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.status}</i> <i>{error.statusText || error.message}</i>
      </p>
      <span>
        <i>{error.data}</i>
      </span>
    </div>
  );
}
