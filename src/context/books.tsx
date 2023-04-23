import { createContext, ReactNode, useState } from "react";
import { IBook } from "@/types/bookTypes";

interface BooksContextType {
  books: IBook[];
}

export const BooksContext = createContext<BooksContextType | any>(null);

interface ParentComponentProps {
  children: ReactNode;
}

const ContextProvider = ({ children }: ParentComponentProps) => {
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
  return (
    <BooksContext.Provider value={{ books, categories }}>
      {children}
    </BooksContext.Provider>
  );
};

export default ContextProvider;
