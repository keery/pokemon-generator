const isEmpty = (obj) => {
    for (const key in obj) {
        if (obj[key] !== null && obj[key] !== '') return false;
    }
    return true;
};

const remove = (array, val) => {
    const index = array.indexOf(val);
    if (index > -1) {
        array.splice(index, 1);
    }
};

const generateImg = (src) => {
    const img = new Image();
    img.src = src;
    return img;
};

export { generateImg, isEmpty, remove };
