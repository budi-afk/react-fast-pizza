import Header from "./Header";
import Loader from "./Loader";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";

export default function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="layout">
      <Header />
      {isLoading && <Loader />}

      <main>
        <Outlet />
      </main>

      <CartOverview />
    </div>
  );
}
