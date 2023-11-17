import { useDispatch } from "react-redux";
import { sortOpt, statusOpt, typeOpt } from "../Helpers/constants";
import {
  filterBySearch,
  filterByStatus,
  filterByType,
  filterBySort,
  clearFilters,
} from "../redux/JobSlice";
import { useRef } from "react";

const Filter = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const typeRef = useRef();
  const statusRef = useRef();
  const sortRef = useRef();
  const handleReset = () => {
    dispatch(clearFilters());
    //inputlari temizle(sifirlama)
    inputRef.current.value = '';
    statusRef.current.value = "";
    typeRef.current.value = "";
    sortRef.current.value = "";
  };
  return (
    <div className="filter-sec">
      <h2>Filter Form</h2>
      <form>
        <div>
          <label>Search</label>
          <input
            ref={inputRef}
            onChange={(e) => {
              dispatch(filterBySearch(e.target.value));
            }}
            placeholder="Example:Amazon"
            type="text"
          />
        </div>
        <div>
          <label>Status</label>
          <select
            ref={statusRef}
            onChange={(e) => {
              dispatch(filterByStatus(e.target.value));
            }}
            name="status"
          >
            <option selected disabled>
              Choose
            </option>
            {statusOpt.map((opt, i) => (
              <option key={i}>{opt}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Type</label>
          <select
            ref={typeRef}
            onChange={(e) => dispatch(filterByType(e.target.value))}
            name="type"
          >
            <option selected disabled>
              Choose
            </option>
            {typeOpt.map((opt, i) => (
              <option key={i}>{opt}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Sort</label>
          <select
            ref={sortRef}
            onChange={(e) => dispatch(filterBySort(e.target.value))}
            name="type"
          >
            <option selected disabled>
              Choose
            </option>
            {sortOpt.map((opt, i) => (
              <option key={i}>{opt}</option>
            ))}
          </select>
        </div>

        <div className="button-area">
          <button type="button" onClick={handleReset}>
            Clear filter
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
