import { Outlet } from "react-router";
import Navbar from "./components/shared/Navbar";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar></Navbar>
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
