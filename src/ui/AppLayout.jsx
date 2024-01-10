import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";

export default function AppLayout() {
  return (
    <div>
      <Header />

      <main>
        <h1>Content</h1>
      </main>

      <CartOverview />
    </div>
  );
}
