import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store";

export default function Cart() {
  let state = useSelector((state) => {
    return state;
  });
  let dispatch = useDispatch();

  console.log(state);

  return (
    <div>
      {state.user}
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
                  {" "}
                  <button
                    onClick={() => {
                      dispatch(setUser());
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
