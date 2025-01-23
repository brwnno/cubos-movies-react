import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import "./Filters.scss";

interface FiltersProps {
  onGetBy: (value: string) => void;
  onIsExist: (value: boolean) => void;
}

const Filters: React.FC<FiltersProps> = ({ onGetBy, onIsExist }) => {
  const [search, setSearch] = useState<string>("");
  const [isExistOtherFilter, setIsExistOtherFilter] = useState<boolean>(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (search.length >= 3 || search.length === 0) {
        onGetBy(search);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [search, onGetBy]);

  const getBySearch = () => {
    onGetBy(search);
  };

  const open = () => {
    setIsExistOtherFilter(true);
    onIsExist(true);
  };

  const close = () => {
    setIsExistOtherFilter(false);
    onIsExist(false);
  };

  return (
    <main className="filters">
      <div className="search-container">
        <input
          type="text"
          placeholder="Pesquise por filmes"
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && getBySearch()}
        />
        <div className="search-icon">
          <Icon
            icon="lets-icons:search-alt-fill"
            className="icon"
            width="24"
            height="24"
          />
        </div>
      </div>

      <div className="icon">
        {!isExistOtherFilter ? (
          <span className="icon-container-medium" onClick={open}>
            <Icon
              icon="lets-icons:filter"
              className="icon"
              width="24"
              height="24"
            />
          </span>
        ) : (
          <span className="icon-container-medium" onClick={close}>
            <Icon
              icon="lets-icons:close-round"
              className="icon"
              width="24"
              height="24"
            />
          </span>
        )}
      </div>
    </main>
  );
};

export default Filters;
