import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import "./App.scss";
import Error from "./Error";
import EndPage from "./components/EndPage";
import QuestionPage, {
  loader as questionPageLoader,
} from "./components/QuestionPage";
import StartPage from "./components/StartPage";
import { useEffect, useState } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StartPage />,
    errorElement: <Error />,
  },
  {
    path: "/question",
    element: <QuestionPage />,
    loader: questionPageLoader,
    errorElement: <Error />,
  },
  {
    path: "/end",
    element: <EndPage />,
    errorElement: <Error />,
  },
]);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Emulate a 3-second loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="loader">
        <p className="font-black40">...Please wait friend</p>
        <Oval
          height={90}
          width={90}
          color="#ef3d32"
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#ef3d32"
          strokeWidth={3}
          strokeWidthSecondary={4}
        />
      </div>
    );
  }
  return <RouterProvider router={router} />;
}

// const router = createBrowserRouter([
//   import { ErrorBoundary } from "react-error-boundary";
//   import Error from "./components/Error"; // import the Error component

//   function ErrorFallback({ error }: { error: Error }) {
//     return (
//       <div>
//         <h2>Something went wrong:</h2>
//         <p>{error.message}</p>
//       </div>
//     );
//   }

//   const routes = [
//     {
//       path: "/",
//       element: <StartPage />,
//       errorElement: (
//         <ErrorBoundary FallbackComponent={ErrorFallback}>
//           <Error /> {/* use the Error component */}
//         </ErrorBoundary>
//       ),
//     },

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" errorElement={Error} element={<StartPage />}>
//       <Route path="question" element={<QuestionPage />} />
//       <Route path="end" element={<EndPage />} />
//     </Route>,
//   ),
// );

// function App() {
//   return <RouterProvider router={router} />;
// }

// export default App;
