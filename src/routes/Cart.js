import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../sotre/userSlice";
import { increaseAge } from "../sotre/userSlice";
import { addCount } from "../store";

export default function Cart() {
  let state = useSelector((state) => {
    return state;
  });
  let dispatch = useDispatch();

  console.log(state);

  return (
    <div>
      {state.user.age}
      <button
        onClick={() => {
          dispatch(increaseAge(100));
        }}
      >
        ++
      </button>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경</th>
          </tr>
        </thead>
        <tbody>
          {state.item.map((a, i) => {
            return (
              <tr key={i}>
                <td>{state.item[i].id}</td>
                <td>{state.item[i].name}</td>
                <td>{state.item[i].count}</td>
                <td>
                  <button
                    onClick={() => {
                      dispatch(addCount(state.item[i].id));
                    }}
                  >
                    +
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
