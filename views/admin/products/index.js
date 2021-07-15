const layout = require('../layout');

module.exports = ({ products }) => {

    const renderedProducts = products
        .map(product => {
            return `
                <div>${product.title}</div>
            `
        }).join('');
    // by tacking on .join('') all product strings wil be joined together as we map through them

    return layout({
        content: `
            <h1 class="title">Products</h1>
            ${renderedProducts}
        `
    });
};

// defined a template function