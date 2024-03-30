import { useEffect, useRef, useState } from "react"
import { loadBGImage } from "../common/utils";

export function DotPhoto({photo, classes='', containerClass='', onClick, children, disableAnimation = false, threshold = .25, tab}) { 
    const [loadedPhoto, setLoadedPhoto] = useState('');
    const [isInView, setIsInView] = useState(false);
    const container = useRef(null);
    const observer = useRef(null);

    let BG = {
        backgroundImage: loadedPhoto,
        backgroundPosition: photo?.background_position || '50% 50%'
    }

    function loadPhoto(url) {
        loadBGImage(url, _ => {
            setLoadedPhoto(`url(${url})`);
        });
    }

    function onKeyDown(e) {
        if (e?.keyCode === 13) onClick();
    }

    useEffect(() => {
        observer.current = new IntersectionObserver(([entry]) => {
            if (entry?.isIntersecting) {
                setIsInView(true);
                observer.current?.disconnect();
            }
        }, {threshold});

        if (container?.current) observer?.current?.observe(container.current);

        return () => observer?.current?.disconnect();
    }, [])

    useEffect(() => {
        if (photo?.url && isInView) loadPhoto(photo.url);
    }, [photo, isInView]);

    return (<>
        <div ref={container} className={`dot-photo-container ${containerClass} ${loadedPhoto?.length || disableAnimation ? 'loaded' : ''}`}>
            <div tabIndex={tab ? 0 : null} onKeyDown={onKeyDown} onClick={onClick} className={`dot-photo ${classes}`} style={BG} />
            <div className="dots" />
        </div>
        {children}
    </>)
}