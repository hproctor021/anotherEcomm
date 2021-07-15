const { getError } = require('../../helpers');
const layout = require('../layout');

module.exports = ({ product }) => {
    console.log(product)
    return layout({
        content: `
            <form method="POST">
                <input name="title" value="${product.title}" />
                <input name="title" value="${product.price}" />
                <input name="image" type="file" />
                <button>Update</button>
            </form>
        `
    });
};