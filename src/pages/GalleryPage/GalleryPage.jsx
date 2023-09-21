/* eslint-disable react/prop-types */
import { UserAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { imageData } from "../../components/Images";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState, useEffect } from "react";
import styles from "./GalleryPage.module.css";
import SearchBar from "../../components/SeachBar";
import _ from "lodash"; // Import lodash library
import Loader from "./../../components/Loader/Loader";

const GalleryPage = () => {
  const { user, logout } = UserAuth();
  const [tags, setTags] = useState(imageData);
  const navigate = useNavigate();

  const SortableUser = ({ image, index }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: image.id, threshold: 10 });

    const style = {
      transition,
      transform: CSS.Transform.toString(transform),
    };

    const [isLoading, setIsLoading] = useState(true);

    const delay = 30000 * index; // 30 seconds delay increment for each image

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        setIsLoading(false);
      }, delay);

      return () => clearTimeout(timeoutId);
    }, [delay]);

    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className={styles.grid}
      >
        <div
          className={styles.imageContainer}
          style={{
            width: `${image.width}px`,
            height: `${image.height}px`,
          }}
        >
          {isLoading && (
            <div className={styles.loader}>
              <Loader />
            </div>
          )}
          <img
            src={image.src}
            alt={image.name}
            onLoad={() => setIsLoading(false)}
            style={{ display: isLoading ? "none" : "block" }}
          />
        </div>
        <span>{image.name}</span>
      </div>
    );
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    const STORAGE_KEY = "gallery_sorting_order";
    const storedOrder = localStorage.getItem(STORAGE_KEY);
    if (storedOrder) {
      setTags(JSON.parse(storedOrder));
    }
  }, []);

  const [, setSearchText] = useState("");
  const [sortingTags, setSortingTags] = useState(_.cloneDeep(tags));

  const onDragStart = () => {
    document.body.classList.add("no-scroll");
  };

  const onDragEnd = (event) => {
    document.body.classList.remove("no-scroll");
    const { active, over } = event;
    if (active.id === over.id) {
      return;
    }

    const newSortingTags = sortingTags.slice();
    const oldIndex = sortingTags.findIndex((image) => image.id === active.id);
    const newIndex = sortingTags.findIndex((image) => image.id === over.id);

    const temp = newSortingTags[oldIndex];
    newSortingTags[oldIndex] = newSortingTags[newIndex];
    newSortingTags[newIndex] = temp;

    setSortingTags(newSortingTags);
    // Update tags array in local storage with the new order
    const STORAGE_KEY = "gallery_sorting_order";
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSortingTags));
  };

  const handleSearchChange = (query) => {
    setSearchText(query);
    filterImages(query); // Call the filter function when search text changes
  };

  const filterImages = (query) => {
    const filtered = tags.filter((image) =>
      image.name.toLowerCase().includes(query.toLowerCase())
    );
    setSortingTags(_.cloneDeep(filtered)); // Update sortingTags with the filtered results
  };

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.galleryHead}>
        <SearchBar onSearch={handleSearchChange} />
        <p>
          Account Details:<span> {user && user.email}</span>
          <span className={styles.logOut}>
            <button onClick={handleLogout}>Logout</button>
          </span>
        </p>
      </div>
      <h1>Meet the Team</h1>

      <div className={styles.gridItems}>
        <DndContext
          collisionDetection={closestCenter}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        >
          <SortableContext items={sortingTags} strategy={rectSortingStrategy}>
            {sortingTags.length === 0 ? (
              <span className={styles.notFound}>Not Found</span>
            ) : (
              sortingTags.map((image, index) => (
                <SortableUser key={image.id} image={image} index={index} />
              ))
            )}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default GalleryPage;
