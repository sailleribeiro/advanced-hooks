import { useEffect, useReducer } from "react";
import { Data } from "../types";
import { routeUsers } from "@/services/api";

interface State {
  isloading: boolean;
  users: Data[];
  filteredUsers: Data[];
  nameNewUser: string;
}

const initialState: State = {
  isloading: false,
  users: [],
  filteredUsers: [],
  nameNewUser: "",
};

type Actions =
  | {
      type: "loadingData";
      payload: boolean;
    }
  | {
      type: "setUsers";
      payload: Data[];
    }
  | {
      type: "setFilter";
      payload: string;
    }
  | {
      type: "setNameNewUser";
      payload: string;
    };

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
    case "setNameNewUser":
      return { ...state, nameNewUser: action.payload };
    default:
      return state;
  }
};

export const useUsers = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const filterUsers = (users: Data[], filter: string) => {
    return users.filter((item: Data) => {
      return item.name.toLowerCase().includes(filter.toLowerCase());
    });

    const setFilter = (filter: string) => {
      const filteredUsers = filterUsers(state.users, filter);
      dispatch({ type: "setFilter", payload: filteredUsers });
    };


  const setNameNewUser = (name: string) => {
    dispatch({ type: "setNameNewUser", payload: name });
  };

  const handleNewUser = () => {
    if (!state.nameNewUser) {
      alert("O nome do usuário não pode estar vazio.");
      return;
    }

    const newUser: Data = {
      id: Math.random(),
      name: state.nameNewUser.trim(),
      username: state.nameNewUser.trim(),
      email: "",
      address: "",
      phone: "",
      website: "",
      company: "",
    };

    dispatch({ type: "setUsers", payload: [...state.users, newUser] });
  };

  const handleRemoveUser = (id: number) => {
    const newUsers = state.users.filter((item) => item.id !== id);
    dispatch({ type: "setUsers", payload: newUsers });
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
    setNameNewUser,
    handleNewUser,
    handleRemoveUser,
  };
};
