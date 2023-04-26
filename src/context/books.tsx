import { createContext, ReactNode, useState } from "react";
import { IBook } from "@/types/bookTypes";
import { useContext } from "react";
import { AuthContext } from "./auth";

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
  const [books, setBooks] = useState<IBook[]>([
    {
      id: "2342",
      img: "/assets/book.jpg",
      author: "ლევან სამადაშვილი",
      title: "English grammar",
      description:
        "„მივენდე ჩემი ბედის ვრასკვლავს და ისე დავადექი გზას, წარმოდგენაც არ მქონდა, რა საოცარი ამბები მელოდა წინ.“",
      price: "120",
      category: "Beginner's English",
    },

    {
      id: "2342",
      img: "/assets/book2.png",
      author: "ლევან სამადაშვილი",
      title: "English grammar",
      description:
        "„მივენდე ჩემი ბედის ვრასკვლავს და ისე დავადექი გზას, წარმოდგენაც არ მქონდა, რა საოცარი ამბები მელოდა წინ.“",
      price: "120",
      category: "Advanced English",
    },
    {
      id: "2342",
      img: "/assets/book3.png",
      author: "ლევან სამადაშვილი",
      title: "English grammar",
      description:
        "„მივენდე ჩემი ბედის ვრასკვლავს და ისე დავადექი გზას, წარმოდგენაც არ მქონდა, რა საოცარი ამბები მელოდა წინ.“",
      price: "120",
      category: "Advanced English",
    },
    {
      id: "2342",
      img: "/assets/book.jpg",
      author: "ლევან სამადაშვილი",
      title: "English grammar",
      description:
        "„მივენდე ჩემი ბედის ვრასკვლავს და ისე დავადექი გზას, წარმოდგენაც არ მქონდა, რა საოცარი ამბები მელოდა წინ.“",
      price: "120",
      category: "Beginner's English",
    },
    {
      id: "2342",
      img: "/assets/book2.png",
      author: "ლევან სამადაშვილი",
      title: "English grammar",
      description:
        "„მივენდე ჩემი ბედის ვრასკვლავს და ისე დავადექი გზას, წარმოდგენაც არ მქონდა, რა საოცარი ამბები მელოდა წინ.“",
      price: "120",
      category: "Advanced English",
    },
    {
      id: "2342",
      img: "/assets/book3.png",
      author: "ლევან სამადაშვილი",
      title: "English grammar",
      description:
        "„მივენდე ჩემი ბედის ვრასკვლავს და ისე დავადექი გზას, წარმოდგენაც არ მქონდა, რა საოცარი ამბები მელოდა წინ.“",
      price: "120",
      category: "Intermediate English",
    },
    {
      id: "2342",
      img: "/assets/book.jpg",
      author: "ლევან სამადაშვილი",
      title: "English grammar",
      description:
        "„მივენდე ჩემი ბედის ვრასკვლავს და ისე დავადექი გზას, წარმოდგენაც არ მქონდა, რა საოცარი ამბები მელოდა წინ.“",
      price: "120",
      category: "English Writing",
    },
    {
      id: "2342",
      img: "/assets/book2.png",
      author: "ლევან სამადაშვილი",
      title: "English grammar",
      description:
        "„მივენდე ჩემი ბედის ვრასკვლავს და ისე დავადექი გზას, წარმოდგენაც არ მქონდა, რა საოცარი ამბები მელოდა წინ.“",
      price: "120",
      category: "English Writing",
    },
    {
      id: "2342",
      img: "/assets/book3.png",
      author: "ლევან სამადაშვილი",
      title: "English grammar",
      description:
        "„მივენდე ჩემი ბედის ვრასკვლავს და ისე დავადექი გზას, წარმოდგენაც არ მქონდა, რა საოცარი ამბები მელოდა წინ.“",
      price: "120",
      category: "Intermediate English",
    },
  ]);

  const [categories] = useState([
    { category: "Beginner's English" },
    { category: "Intermediate English" },
    { category: "Advanced English" },
    { category: "English Grammar" },
    { category: "English Vocabulary" },
    { category: "English Conversation" },
    { category: "English Writing" },
    { category: "English Reading Comprehension" },
  ]);

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
        categories,
        handleBuyBook,
        showLoginRegisterModal,
        setShowLoginRegisterModal,
      }}>
      {children}
    </BooksContext.Provider>
  );
};

export default ContextProvider;
