module.exports = ({ content }) => {
  return `
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Shoppe</title>
        
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" rel="stylesheet">
        <link href="main.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"></link>
      </head>

      <body>
        <header>
          <nav class="navbar navbar-top">
            <div class="container navbar-container">
              <div>
                <ul class="social">
                  <li>
                    <a href="/"><i class="fas fa-dumbbell"> O M E</i></a>
                  </li>
                  <li></li>
                  <li>
                    <a href=""><i class="fa fa-phone"></i>+1 (555) 987-6543</a>
                  </li>
                  <li>
                    <a href=""><i class="fa fa-envelope"></i> shop@myshoppe.com</a>
                  </li>
                </ul>
              </div>
              <div>
                <ul class="social">
                  <li><a href="/cart"><i class="fa fa-shopping-cart"></i> Cart</a></li>
                  <li><a href="/signin">Login</i></a></li>
                  <li><a href="/signup">Register</i></a></li>
                  <li><a href="/signout">Logout</i></a></li>
                </ul>
              </div>
            </div>
          </nav>
        </header>

        ${content}
      </body>
    </html>
  `;
};
