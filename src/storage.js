export const STORAGE_ID = 'LOCALREPS'

let store = {
    get: function () {
        var data = JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
        console.log(data)
        // data.sort((a, b) => {
        //     return a.title.localeCompare(b.title);
        // })
        return data
    },
    put: function (item) {
        localStorage.setItem(STORAGE_ID, JSON.stringify(item));

    }
};


export default store