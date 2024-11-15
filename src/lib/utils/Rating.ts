export function getRatingColor(rating: number): string {
    if (rating < 1 || rating > 5) {
        return "#D9D9D9"; 
    }

    if (rating >= 1 && rating < 2) {
        return "#FF4D4F";
    } else if (rating >= 2 && rating < 3) {
        return "#FF7A45"; 
    } else if (rating >= 3 && rating < 4) {
        return "#FFA940"; 
    } else if (rating >= 4 && rating < 5) {
        return "#73D13D";
    } else if (rating === 5) {
        return "#52C41A"; 
    }

    return "#D9D9D9"; 
}
