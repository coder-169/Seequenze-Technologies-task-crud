"use client";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [edit, setEdit] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [cards, setCards] = useState([]);
  const [cardDetails, setCardDetails] = useState({
    author: "",
    url: "",
    id: "",
  });
  //   This is function get's called when the user loads homepage and hits two api requests and get the data and set the cards using that
  const loadCards = async () => {
    try {
      // Getting api response from external api
      const response = await fetch(
        "https://picsum.photos/v2/list?page=1&limit=6",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      // Getting api response from application database
      const r2 = await fetch("/api/cards", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const d2 = await r2.json();
      // here destructuring the both arrays and make a new array one from picsum and one from db
      let mixed = [...data,...d2.authors];
      // let mixed = [...d2.authors];
      // so here we are updating the state with the new array
      setCards(mixed);
    } catch (error) {
      console.log(error.statusCode);
      toast.error(error.message);
    }
  };
  return (
    <AppContext.Provider
      value={{
        open,
        setOpen,
        openDetailModal,
        setOpenDetailModal,
        cardDetails,
        setCardDetails,
        cards,
        setCards,
        loadCards,
        showMenu,
        setShowMenu,
        setEdit,
        edit
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalHook = () => {
  return useContext(AppContext);
};

export default AppProvider;
