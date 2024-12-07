import { useEffect, useReducer } from "react";
import { Data } from "../types";
import { routeUsers } from "@/services/api";

const initialState = {
  isloading: false,
  users: [] as Data[],
  filteredUsers: [] as Data[],
};

type State = typeof initialState;

type LoadingDataAction = {
  type: "loadingData";
  payload: boolean;
};

type SetUsersAction = {
  type: "setUsers";
  payload: Data[];
};

type SetFilterAction = {
  type: "setFilter";
  payload: string;
};

type Actions = LoadingDataAction | SetUsersAction | SetFilterAction;

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case "loadingData":
      return { ...state, isloading: action.payload };
    case "setUsers":
      return { ...state, users: action.payload, filteredUsers: action.payload };
    case "setFilter":
      return {
        ...state,
        filteredUsers: state.users.filter((item: Data) => {
          return item.name.toLowerCase().includes(action.payload.toLowerCase());
        }),
      };
    default:
      return state;
  }
};

export const useUsers = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setFilter = (filter: string) => {
    dispatch({ type: "setFilter", payload: filter });
  };

  useEffect(() => {
    const getUsers = async () => {
      dispatch({ type: "loadingData", payload: true });
      await routeUsers()
        .then((response) => {
          dispatch({ type: "setUsers", payload: response.data });
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          dispatch({ type: "loadingData", payload: false });
        });
    };
    getUsers();
  }, []);

  return {
    isloading: state.isloading,
    users: state.users,
    filteredUsers: state.filteredUsers,
    setFilter,
  };
};
