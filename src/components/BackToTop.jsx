import "../styles/back_to_top.css"

export function BackToTop() {
    function top() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
    function onKeyDown(e) {
        if (e?.keyCode === 13) top();
    }
    return <div tabIndex={0} data-tooltip="Back to top" className="btt-btn" onKeyDown={onKeyDown} onClick={top}><span>&uarr;</span></div>
}