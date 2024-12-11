import HomeItem from "../components/HomeItem";
import { useSelector } from "react-redux";

const Home = () => {
  const items = useSelector((store) => store.items);
  // console.log("Items from Redux state:", items);

  return (
    <main>
      <div className="items-container">
        {items.map((item) => (
          <HomeItem key={item.id} items={item} />
        ))}
      </div>
    </main>
  );
};

export default Home;
