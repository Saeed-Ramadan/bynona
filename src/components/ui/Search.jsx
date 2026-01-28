import { useState, useEffect, useRef, useCallback } from "react";
import {
  Search as SearchIcon,
  X,
  Loader2,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../lib/axios";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";

const Search = ({ variant = "default", placeholder, className = "" }) => {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const searchRef = useRef(null);

  const fetchResults = useCallback(async (searchQuery, pageNum = 1) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setPagination(null);
      return;
    }
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/search?search=${searchQuery}&page=${pageNum}`,
      );
      if (response.data.success) {
        setResults(response.data.data.data);
        setPagination(response.data.data);
      }
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim().length >= 2) {
        fetchResults(query, 1);
        setPage(1);
        setIsOpen(true);
      } else {
        setResults([]);
        setPagination(null);
        setIsOpen(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query, fetchResults]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePageChange = (newPage, e) => {
    e.preventDefault();
    e.stopPropagation();
    setPage(newPage);
    fetchResults(query, newPage);
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <div className="relative group">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim().length >= 2 && setIsOpen(true)}
          placeholder={placeholder || t("search_placeholder")}
          className="w-full border border-input rounded-lg py-2 px-4 bg-secondary/50 focus:bg-background outline-none focus:ring-2 focus:ring-primary transition-all pr-12 rtl:pl-12 rtl:pr-4"
        />
        <div
          className={`absolute ${i18n.language === "ar" ? "left-0" : "right-0"} top-0 bottom-0 flex items-center justify-center`}
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground mx-3" />
          ) : query ? (
            <button
              onClick={() => {
                setQuery("");
                setIsOpen(false);
              }}
              className="mx-3 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X size={18} />
            </button>
          ) : (
            <Button
              size="icon"
              variant="primary"
              className="h-8 w-8 shadow-none hover:shadow-md transition-shadow"
            >
              <SearchIcon className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (results.length > 0 || loading) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-xl shadow-2xl z-50 overflow-hidden max-h-[80vh] flex flex-col"
          >
            <div className="overflow-y-auto no-scrollbar grow">
              {results.length > 0 ? (
                results.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 px-4 py-3 hover:bg-secondary transition-colors border-b border-border last:border-0 group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-secondary overflow-hidden flex-shrink-0">
                      <img
                        src={product.image_path}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <div className="flex flex-col grow min-w-0">
                      <span className="font-bold text-sm truncate">
                        {product.name}
                      </span>
                      <span className="text-primary font-bold text-sm">
                        {product.price} {t("currency", "EGP")}
                      </span>
                    </div>
                    <ChevronRight
                      size={16}
                      className="text-muted-foreground rtl:rotate-180"
                    />
                  </Link>
                ))
              ) : (
                <div className="p-8 text-center text-muted-foreground text-sm">
                  {t("no_results", "No results found")}
                </div>
              )}
            </div>

            {pagination && pagination.last_page > 1 && (
              <div className="p-3 border-t border-border bg-secondary/20 flex items-center justify-between gap-2">
                <button
                  disabled={page === 1}
                  onClick={(e) => handlePageChange(page - 1, e)}
                  className="p-1 rounded-md hover:bg-primary/20 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                >
                  <ChevronLeft size={20} className="rtl:rotate-180" />
                </button>
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar max-w-[150px]">
                  <span className="text-xs font-bold text-muted-foreground whitespace-nowrap">
                    {t("page", "Page")} {page} {t("of", "of")}{" "}
                    {pagination.last_page}
                  </span>
                </div>
                <button
                  disabled={page === pagination.last_page}
                  onClick={(e) => handlePageChange(page + 1, e)}
                  className="p-1 rounded-md hover:bg-primary/20 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                >
                  <ChevronRight size={20} className="rtl:rotate-180" />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Search;
