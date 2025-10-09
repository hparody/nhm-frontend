import PropTypes from "prop-types";
import { useEffect, useCallback, useState } from "react";

import Avatar from "@mui/material/Avatar";

import DefaultManPhoto from "@/assets/man-icon.png";
import DefaultWomanPhoto from "@/assets/woman-icon.png";
import DefaultUserPhoto from "@/assets/user-icon.png";

const imagesBlobCache = new Map();

const getDefaultIconByGender = (gender) => {
  let icon = DefaultUserPhoto;
  if (gender == "Hombre") {
    icon = DefaultManPhoto;
  } else if (gender == "Mujer") {
    icon = DefaultWomanPhoto;
  }
  return icon;
};

const imageURLToBlob = async (imageURL) => {
  let url = "";
  try {
    const res = await fetch(imageURL, { cache: "force-cache" });
    const blob = await res.blob();
    url = URL.createObjectURL(blob);
  } catch (err) {
    console.error("Failed to load image", err);
  }
  return url;
};

const CampistPhoto = ({ alt = "", photoUrl, gender, sx, imageSx }) => {
  const [campistPhoto, setCampistPhoto] = useState(
    getDefaultIconByGender(gender)
  );

  const assignCampistPhoto = useCallback(
    async (photoUrl) => {
      if (photoUrl != "") {
        const src = await imageURLToBlob(photoUrl);
        imagesBlobCache.set(photoUrl, src);
        setCampistPhoto(src);
      }
    },
    [setCampistPhoto]
  );

  useEffect(() => {
    if (photoUrl && photoUrl !== "") {
      if (imagesBlobCache.has(photoUrl)) {
        setCampistPhoto(imagesBlobCache.get(photoUrl));
      } else {
        assignCampistPhoto(photoUrl);
      }
    } else {
      setCampistPhoto(getDefaultIconByGender(gender));
    }
  }, [photoUrl, gender, assignCampistPhoto, setCampistPhoto]);

  return (
    <Avatar
      alt={alt}
      src={campistPhoto}
      variant="rounded"
      sx={{
        minWidth: "100px",
        height: "auto",
        ...sx,
      }}
      slotProps={{
        img: {
          loading: "lazy",
          sx: {
            aspectRatio: 1,
            objectFit: photoUrl !== "" ? "cover" : "contain",
            objectPosition: photoUrl !== "" ? "50% 20%" : "50% 50%",
            ...imageSx,
          },
        },
      }}
    />
  );
};

CampistPhoto.propTypes = {
  alt: PropTypes.string,
  photoUrl: PropTypes.string,
  gender: PropTypes.string,
  sx: PropTypes.object,
  imageSx: PropTypes.object,
};

export default CampistPhoto;
