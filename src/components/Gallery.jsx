import { useEffect, useRef, useState } from "react";
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import { DotPhoto } from "../components/DotPhoto";

export default function Gallery({photos, plans}) {
    const lightGallery = useRef(null);
    const [galleryItems, setGalleryItems] = useState();

    useEffect(() => {
        const next = [];
        const preparePhotoForGallery = (p = {}, isPlan = false) => {
            let object = Object.assign(p, {
                isPlan: isPlan,
                src: isPlan && p?.jpg ? p.jpg : p.url,
                subHtml: p?.caption || '' 
            })
            next.push(object);
        }
        plans?.map(p => preparePhotoForGallery(p, true));
        photos?.map(p => preparePhotoForGallery(p));
        setGalleryItems(next);
    }, [photos, plans]);

    const onInit = (detail) => {
        if (detail && detail.instance) lightGallery.current = detail.instance;
    }

    const openLightGallery = (i) => {
        lightGallery.current.openGallery(i);
    }

    return (<>
        {galleryItems?.map((item, i) => (
            <DotPhoto key={i} tab photo={item} classes="photo-preview" containerClass="photo-container" onClick={_ => openLightGallery(i)} disableAnimation>
                <div className="photo-caption">{item?.caption}</div>
            </DotPhoto>
        ))}
        <LightGallery
            onInit={onInit}
            plugins={[lgZoom, lgThumbnail]}
            dynamic={true}
            download={false}
            loadYouTubePoster={false}
            mobileSettings={{showCloseIcon: true}}
            supportLegacyBrowser={false}
            dynamicEl={galleryItems} 
        />
    </>)
}