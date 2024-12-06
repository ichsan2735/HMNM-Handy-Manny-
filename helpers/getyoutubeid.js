function getYoutubeId(url) {
    if (url.includes('watch?v=')) {
        return url.split('watch?v=')[1].slice(0, 11);
    }
    
    else if (url.includes('youtu.be/')) {
        return url.split('youtu.be/')[1].slice(0, 11);
    }
    
    else if (url.includes('/embed/')) {
        return url.split('/embed/')[1].slice(0, 11);
    }
    return false
}

module.exports = getYoutubeId
