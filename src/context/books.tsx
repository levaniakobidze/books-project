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
      id: "23242",
      img: "/assets/book.jpg",
      author: "ლევან სამადაშვილი",
      title: "English grammar",
      description:
        "„The Application UI Icon Pack comes with over 200 icons in 3 styles: outline, filled, and branded. This playful icon pack is tailored for complex application user interfaces with a friendly and legible look.“",
      price: "120",
      category: "Beginner's English",
    },

    {
      id: "23442",
      img: "/assets/book2.png",
      author: "ლევან სამადაშვილი",
      title: "English grammar",
      description:
        "„Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore illo similique ipsam optio, quae possimus minima omnis quia et adipisci velit, saepe, iusto fuga fugit eius voluptates ut aperiam laboriosam.Excepturi, saepe est magnam corporis alias doloribus impedit nobis nemo et explicabo quos sit quasi eius vero ducimus rerum mollitia harum voluptatem. Doloremque tenetur voluptas dolore cupiditate deleniti amet aut.“",
      price: "120",
      category: "Advanced English",
    },
    {
      id: "2323442",
      img: "/assets/book3.png",
      author: "ლევან სამადაშვილი",
      title: "English grammar",
      description:
        "„მივენდე ჩემი ბედის ვრასკვლავს და ისე დავადექი გზას, წარმოდგენაც არ მქონდა, რა საოცარი ამბები მელოდა წინ.“",
      price: "120",
      category: "Advanced English",
    },
    {
      id: "234432",
      img: "/assets/book.jpg",
      author: "ლევან სამადაშვილი",
      title: "English grammar",
      description:
        "„მივენდე ჩემი ბედის ვრასკვლავს და ისე დავადექი გზას, წარმოდგენაც არ მქონდა, რა საოცარი ამბები მელოდა წინ.“",
      price: "120",
      category: "Beginner's English",
    },
    {
      id: "2324242",
      img: "/assets/book2.png",
      author: "ლევან სამადაშვილი",
      title: "English grammar",
      description:
        "„მივენდე ჩემი ბედის ვრასკვლავს და ისე დავადექი გზას, წარმოდგენაც არ მქონდა, რა საოცარი ამბები მელოდა წინ.“",
      price: "120",
      category: "Advanced English",
    },
    {
      id: "232342542",
      img: "/assets/book3.png",
      author: "ლევან სამადაშვილი",
      title: "English grammar",
      description:
        "„მივენდე ჩემი ბედის ვრასკვლავს და ისე დავადექი გზას, წარმოდგენაც არ მქონდა, რა საოცარი ამბები მელოდა წინ.“",
      price: "120",
      category: "Intermediate English",
    },
    {
      id: "2345342",
      img: "/assets/book.jpg",
      author: "ლევან სამადაშვილი",
      title: "English grammar",
      description:
        "„მივენდე ჩემი ბედის ვრასკვლავს და ისე დავადექი გზას, წარმოდგენაც არ მქონდა, რა საოცარი ამბები მელოდა წინ.“",
      price: "120",
      category: "English Writing",
    },
    {
      id: "2342342",
      img: "/assets/book2.png",
      author: "ლევან სამადაშვილი",
      title: "English grammar",
      description:
        "„მივენდე ჩემი ბედის ვრასკვლავს და ისე დავადექი გზას, წარმოდგენაც არ მქონდა, რა საოცარი ამბები მელოდა წინ.“",
      price: "120",
      category: "English Writing",
    },
    {
      id: "232342442",
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
