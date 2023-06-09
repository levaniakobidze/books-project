import { createContext, ReactNode, useEffect, useState } from "react";
import { IBook } from "@/types/bookTypes";
import { useContext } from "react";
import { AuthContext } from "./auth";
import axios from "axios";

interface BooksContextType {
  books: IBook[];
  dispplayBook: IBook[];
}

export const BooksContext = createContext<BooksContextType | any>(null);

interface ParentComponentProps {
  children: ReactNode;
}

const ContextProvider = ({ children }: ParentComponentProps) => {
  const { user, token, isAuth } = useContext(AuthContext);
  const [showLoginRegisterModal, setShowLoginRegisterModal] = useState(false);
  const [showDeleteBookModal, setShowDeleteBookModal] = useState(false);
  const [selectedDeleteBookId, setSelectedDeleteBookId] = useState("");
  const [selectedBookId, setSelectedBookId] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [pagetTitle, setPageTitle] = useState("");
  const [books, setBooks] = useState<IBook[]>([]);
  const [displayBooks, setDisplayBooks] = useState<IBook[]>([]);
  const [categories, setCategories] = useState([]);
  const [showBuyBookModal, setShowBuyBookModal] = useState(false);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [showPurchaseSuccessModal, setShowPurchaseSuccessModal] =
    useState(false);
  const [showAccessWaitingModal, setShowAccessWaitingModal] = useState(false);
  const [purchase, setPurchase] = useState({
    cardName: "",
    userId: "",
    bookId: "",
  });
  const [pageContent, setPageContent] = useState({
    pageIndex: "",
    content: "",
  });
  const [bookContent, setBookContent] = useState({
    title: "",
    poster: "",
    author: "",
    price: "",
    description: "",
    categories: [],
    pages: [],
  });
  const [editBookContent, setEditBookContent] = useState({
    title: "",
    poster: "",
    author: "",
    price: "",
    description: "",
    categories: [],
    pages: [],
  });

  const getAllBooks = async () => {
    try {
      const resp = await axios.get(
        "https://books-project-back-production.up.railway.app/api/allbook"
      );
      setBooks(resp.data);
      setDisplayBooks(resp.data);
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

  const getPurchaseHistory = async () => {
    try {
      const resp = await axios.get(
        process.env.NEXT_PUBLIC_URL + "/api/alluser"
      );
      const userData = resp.data.find((u: any) => u.id === user.id);
      setPurchaseHistory(userData.history);
    } catch (error) {}
  };

  useEffect(() => {
    getPurchaseHistory();
  }, [user]);

  useEffect(() => {
    getAllBooks();
    getCategories();
  }, []);

  const handleBuyBook = (book: IBook) => {
    let findBook;
    if (book && Object.keys(user).length !== 0) {
      findBook = user.history.find((b: any) => b.bookId === book.id);
    }
    if (!token || !isAuth) {
      setShowLoginRegisterModal(true);
      return;
    } else if (!findBook) {
      setShowBuyBookModal(true);
      setPurchase({ ...purchase, userId: user.id, bookId: book.id });
    } else {
      setShowLoginRegisterModal(false);
    }
  };

  return (
    <BooksContext.Provider
      value={{
        editBookContent,
        setEditBookContent,
        selectedDeleteBookId,
        setSelectedDeleteBookId,
        setShowBuyBookModal,
        getPurchaseHistory,
        showDeleteBookModal,
        setShowDeleteBookModal,
        showAccessWaitingModal,
        setShowAccessWaitingModal,
        showPurchaseSuccessModal,
        setShowPurchaseSuccessModal,
        purchaseHistory,
        purchase,
        setPurchase,
        showBuyBookModal,
        books,
        displayBooks,
        setDisplayBooks,
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
        getAllBooks,
        selectedBookId,
        setSelectedBookId,
      }}>
      {children}
    </BooksContext.Provider>
  );
};

export default ContextProvider;
