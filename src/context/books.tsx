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
      category: "სათავგადასავლო",
    },

    {
      id: "2342",
      img: "/assets/book2.png",
      author: "ლევან სამადაშვილი",
      title: "English grammar",
      description:
        "„მივენდე ჩემი ბედის ვრასკვლავს და ისე დავადექი გზას, წარმოდგენაც არ მქონდა, რა საოცარი ამბები მელოდა წინ.“",
      price: "120",
      category: "სათავგადასავლო",
    },
    {
      id: "2342",
      img: "/assets/book3.png",
      author: "ლევან სამადაშვილი",
      title: "English grammar",
      description:
        "„მივენდე ჩემი ბედის ვრასკვლავს და ისე დავადექი გზას, წარმოდგენაც არ მქონდა, რა საოცარი ამბები მელოდა წინ.“",
      price: "120",
      category: "სათავგადასავლო",
    },
    {
      id: "2342",
      img: "/assets/book.jpg",
      author: "ლევან სამადაშვილი",
      title: "English grammar",
      description:
        "„მივენდე ჩემი ბედის ვრასკვლავს და ისე დავადექი გზას, წარმოდგენაც არ მქონდა, რა საოცარი ამბები მელოდა წინ.“",
      price: "120",
      category: "შემეცნებითი",
    },
    {
      id: "2342",
      img: "/assets/book2.png",
      author: "ლევან სამადაშვილი",
      title: "English grammar",
      description:
        "„მივენდე ჩემი ბედის ვრასკვლავს და ისე დავადექი გზას, წარმოდგენაც არ მქონდა, რა საოცარი ამბები მელოდა წინ.“",
      price: "120",
      category: "რომანი",
    },
    {
      id: "2342",
      img: "/assets/book3.png",
      author: "ლევან სამადაშვილი",
      title: "English grammar",
      description:
        "„მივენდე ჩემი ბედის ვრასკვლავს და ისე დავადექი გზას, წარმოდგენაც არ მქონდა, რა საოცარი ამბები მელოდა წინ.“",
      price: "120",
      category: "ბიოგრაფიული",
    },
    {
      id: "2342",
      img: "/assets/book.jpg",
      author: "ლევან სამადაშვილი",
      title: "English grammar",
      description:
        "„მივენდე ჩემი ბედის ვრასკვლავს და ისე დავადექი გზას, წარმოდგენაც არ მქონდა, რა საოცარი ამბები მელოდა წინ.“",
      price: "120",
      category: "სათავგადასავლო",
    },
    {
      id: "2342",
      img: "/assets/book2.png",
      author: "ლევან სამადაშვილი",
      title: "English grammar",
      description:
        "„მივენდე ჩემი ბედის ვრასკვლავს და ისე დავადექი გზას, წარმოდგენაც არ მქონდა, რა საოცარი ამბები მელოდა წინ.“",
      price: "120",
      category: "დეტექტივი",
    },
    {
      id: "2342",
      img: "/assets/book3.png",
      author: "ლევან სამადაშვილი",
      title: "English grammar",
      description:
        "„მივენდე ჩემი ბედის ვრასკვლავს და ისე დავადექი გზას, წარმოდგენაც არ მქონდა, რა საოცარი ამბები მელოდა წინ.“",
      price: "120",
      category: "სათავგადასავლო",
    },
  ]);

  const [categories] = useState([
    { category: "სათავგადასავლო" },
    { category: "რომანი" },
    { category: "შემეცნებითი" },
    { category: "დეტექტივი" },
    { category: "დეტექტივი" },
    { category: "დეტექტივი" },
    { category: "დეტექტივი" },
    { category: "დეტექტივი" },
    { category: "დეტექტივი" },
    { category: "დეტექტივი" },
    { category: "დეტექტივი" },
    { category: "დეტექტივი" },
    { category: "დეტექტივი" },
  ]);
  return (
    <BooksContext.Provider value={{ books, categories }}>
      {children}
    </BooksContext.Provider>
  );
};

export default ContextProvider;