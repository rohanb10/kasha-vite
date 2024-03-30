import { useEffect } from "react";
import { DotPhoto } from "../components/DotPhoto";
import insta from '../assets/icons/instagram.svg';

export function Tiles({photos, handle}) {
    // useEffect(() => {
    //     if (!photos) return;
    //     console.log(photos);
    // }, [photos]);

    return (
        <div className="tiles-container">
            {photos?.map((p, i) => (
                <DotPhoto key={i} photo={p} containerClass="tile" />
            ))}
            <a target="_blank" href={`https://www.instagram.com/${handle}/`} className="tile follow-tile">
                <div className="follow-tile-container">
                    <img className="logo" src={insta} alt="Instagram logo" />
                    <div className="handle">
                        <span>@{handle}</span>
                    </div>
                </div>
            </a>
        </div>
    )
}