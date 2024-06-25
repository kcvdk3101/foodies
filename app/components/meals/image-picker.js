'use client';

import Image from 'next/image';
import React, { useRef, useState } from 'react';

import classes from './image-picker.module.css';

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState();
  const imageRef = useRef();

  function handlePickImage() {
    imageRef.current.click();
  }

  function handleChangeImage(e) {
    const file = e.target.files[0];
    if (!file) {
      setPickedImage(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPickedImage(reader.result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image src={pickedImage} alt="The image is selected by user" fill />
          )}
        </div>
        <input
          required
          ref={imageRef}
          className={classes.input}
          type="file"
          id="image"
          accept="image/png, image/jpeg, image/jpg"
          name={name}
          onChange={handleChangeImage}
        />
        <button
          className={classes.button}
          type="button"
          onClick={handlePickImage}
        >
          Pick an image
        </button>
      </div>
    </div>
  );
}
