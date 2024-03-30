export function HTMLContent({content, classes}) {
    if (content && content.length) {
        return <div className={classes} dangerouslySetInnerHTML={{__html: content}}/>
    } else {
        <></>
    }
}