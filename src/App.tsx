import { Outlet } from "react-router";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar></Navbar>
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
