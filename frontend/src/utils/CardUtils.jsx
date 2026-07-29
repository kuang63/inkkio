export function updateBookSize(windowHeight, windowWidth) {
    // Max width and height will always be 70% of window size 
    const maxWidth = windowWidth * 0.7;
    const maxHeight = windowHeight * 0.7;

    // Calculate width and height based on the aspect ratio of 2:3 (width:height)
    let height = maxHeight;
    let width = height * 5/7;

    // If width is bigger than maxWidth, set width to maxWidth and adjust height accordingly
    if (width > maxWidth) {
        width = maxWidth;
        height = width * 7/5;
    }
    return { width: width, height: height };
}