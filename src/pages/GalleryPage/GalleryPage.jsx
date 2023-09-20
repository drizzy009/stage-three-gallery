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
import styles from "../GalleryPage/GalleryPage.module.css";

const GalleryPage = () => {
  const { user, logout } = UserAuth();
  const [tags, setTags] = useState(imageData);
  const navigate = useNavigate();

  const SortableUser = ({ image }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: image.id });

    const style = {
      transition,
      transform: CSS.Transform.toString(transform),
    };
    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className={styles.grid}
      >
        <img src={image.src} alt={image.tag} />
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

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (active.id === over.id) {
      return;
    }

    const newTags = tags.slice(); // Create a copy of the tags array
    const oldIndex = tags.findIndex((image) => image.id === active.id);
    const newIndex = tags.findIndex((image) => image.id === over.id);
    newTags.splice(oldIndex, 1);
    newTags.splice(newIndex, 0, tags[oldIndex]);

    setTags(newTags);

    const STORAGE_KEY = "gallery_sorting_order"; // Define the STORAGE_KEY locally
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTags));
  };

  return (
    <div className={styles.galleryContainer}>
      <p>User Email: {user && user.email}</p>
      <div className={styles.gridItems}>
        <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={tags} strategy={rectSortingStrategy}>
            {tags.map((image) => (
              <SortableUser key={image.id} image={image} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default GalleryPage;
