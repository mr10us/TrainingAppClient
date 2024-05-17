import { useLocation } from "react-router-dom"

export const useCurrentPage = () => {
  const {pathname} = useLocation();

  const [currentPage] = pathname.split("/").filter(Boolean).slice(-1);

  return currentPage;
}