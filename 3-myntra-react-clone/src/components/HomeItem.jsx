import { useDispatch, useSelector } from "react-redux";
import { bagAction } from "../store/bagSlice";
import { IoBagAddOutline } from "react-icons/io5";
import { AiTwotoneDelete } from "react-icons/ai";

const HomeItem = ({ items }) => {
  const dispitch = useDispatch();
  const handleAddToBag = () => {
    dispitch(bagAction.addToBag(items.id));
  };
  const handleRemoveFromBag = () => {
    dispitch(bagAction.removeFromBag(items.id));
  };
  const bag = useSelector((state) => state.bag);

  const search = bag.indexOf(items.id) >= 0;
  console.log(items.id, search);

  return (
    <>
      <div className="item-container">
        <img className="item-image" src={items.image} alt="item image" />
        <div className="rating">
          {items.rating.stars} ⭐ | {items.rating.count}
        </div>
        <div className="company-name">{items.company}</div>
        <div className="item-name">{items.item_name}</div>
        <div className="price">
          <span className="current-price">Rs {items.current_price}</span>
          <span className="original-price">Rs {items.original_price}</span>
          <span className="discount">(${items.discount_percentage}% OFF)</span>
        </div>
        {search ? (
          <button
            type="button"
            onClick={handleRemoveFromBag}
            className="btn btn-add-bag btn-danger"
          >
            <AiTwotoneDelete />
            Remove
          </button>
        ) : (
          <button
            type="button"
            onClick={handleAddToBag}
            className="btn btn-success btn-add-bag"
          >
            <IoBagAddOutline />
            Add to Bag
          </button>
        )}
      </div>
      `
    </>
  );
};

export default HomeItem;
