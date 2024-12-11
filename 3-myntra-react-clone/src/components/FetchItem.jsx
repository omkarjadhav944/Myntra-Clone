import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemsAction } from "../store/itemsSlice";
import { fetchStatusAction } from "../store/fetchStatusSlice";

const FetchItem = () => {
  const fetchStatus = useSelector((state) => state.fetchStatus);
  const dispatch = useDispatch();
  // console.log(fetchStatus);

  useEffect(() => {
    if (fetchStatus.fetchDone) return;

    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(fetchStatusAction.markFetchingStarted()); // Update fetch status to 'fetching'

    fetch("http://localhost:8080/items", { signal })
      .then((res) => res.json())
      .then(({ items }) => {
        dispatch(fetchStatusAction.markFetchDone()); // Update fetch status to 'done'
        dispatch(fetchStatusAction.markFetchingFinished()); // Update fetching to 'finished'
        dispatch(itemsAction.addInitial(items)); // Add items to the store
        // console.log("Items Fetched", items);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });

    return () => {
      // console.log("Cleaning up UseEffect.");
      controller.abort();
    };
  }, [fetchStatus.fetchDone, dispatch]);

  return <></>;
};

export default FetchItem;
