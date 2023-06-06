import { createContext, ReactNode, useEffect, useState } from "react";
import { IBook } from "@/types/bookTypes";
import { useContext } from "react";
import { AuthContext } from "./auth";
import axios from "axios";

interface BooksContextType {
  books: IBook[];
}

export const BooksContext = createContext<BooksContextType | any>(null);

interface ParentComponentProps {
  children: ReactNode;
}

const ContextProvider = ({ children }: ParentComponentProps) => {
  const { user, token, isAuth } = useContext(AuthContext);
  const [showLoginRegisterModal, setShowLoginRegisterModal] = useState(false);
  const [bookContent, setBookContent] = useState({
    title: "",
    poster: "",
    author: "",
    price: "",
    description: "",
    categories: [],
    pages: [],
  });
  const [bookTitle, setBookTitle] = useState("");
  const [pagetTitle, setPageTitle] = useState("");
  const [pageContent, setPageContent] = useState({
    pageIndex: "",
    content: "",
  });
  const [books, setBooks] = useState<IBook[]>([]);
  const [categories, setCategories] = useState([]);
  const getAllBooks = async () => {
    try {
      const resp = await axios.get(
        "https://books-project-back-production.up.railway.app/api/allbook"
      );
      console.log(resp.data);
      setBooks(resp.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getCategories = async () => {
    try {
      const resp = await axios.get(
        "https://books-project-back-production.up.railway.app/api/allcategory"
      );
      setCategories(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBooks();
    getCategories();
  }, []);

  const handleBuyBook = () => {
    console.log(token, isAuth);
    if (!token || !isAuth) {
      setShowLoginRegisterModal(true);
      return;
    } else {
      setShowLoginRegisterModal(false);
    }
  };

  return (
    <BooksContext.Provider
      value={{
        books,
        bookContent,
        setBookContent,
        categories,
        bookTitle,
        pagetTitle,
        pageContent,
        setPageContent,
        setPageTitle,
        setBookTitle,
        handleBuyBook,
        showLoginRegisterModal,
        setShowLoginRegisterModal,
        getCategories,
      }}>
      {children}
    </BooksContext.Provider>
  );
};

export default ContextProvider;
