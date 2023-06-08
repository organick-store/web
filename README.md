# Web
React SPA for Organick grocery store
This is a website for Organick, a fictional organic grocery store.
Organick is a website that offers a range of organic products, provides users with the ability to browse and purchase products.
The website has a modern and user-friendly design that emphasizes the importance of natural and organic living.

# Technologies
## This landing page has been designed with React:
### Styles
+ [SCSS](https://sass-lang.com/) (Sass) modules provide a modular and scoped approach to styling components in the project. This ensures that styles are encapsulated and don't interfere with other components, promoting reusability and maintainability. 

+ The [BEM](https://en.bem.info/) methodology is used for naming CSS classes, providing a clear structure and hierarchy for components and making it easier to understand and modify styles.

+ The [classnames library](https://www.npmjs.com/package/classnames) simplifies the process of conditionally applying class names, allowing for cleaner and more concise code when dealing with dynamic styling requirements. These styling dependencies contribute to a more organized and efficient styling workflow in the project.


### Global state management
In my project, I utilized [React Redux](https://redux.js.org/) to manage the state of my application. I employed three slices: productsSlice, userSlice, and cartSlice, to handle specific aspects of the state.

1. The productsSlice was responsible for managing the state related to product data. It provided actions and reducers to add products to the state, allowing me to easily update and retrieve product information across different components.

2. The userSlice handled the state related to user data and authentication. It offered actions and reducers to set user information, such as name, email, and address, as well as to manage the authentication status. This enabled me to keep track of the logged-in user and provide personalized experiences.

3. The cartSlice was responsible for managing the state of the shopping cart. It provided actions and reducers to add items to the cart, remove items, update quantities, and clear the cart. With the cartSlice, I could easily keep track of the cart items and the total cart counter.

### Axios
 [Axios](https://axios-http.com/) library as an HTTP client for making network requests. Axios provided a simple and intuitive way to communicate with the server-side API. I used Axios to handle asynchronous operations, such as fetching data from the server, sending POST requests, and intercepting requests to include authentication tokens.

### Multipage routings
[React Router](https://reactrouter.com/) is a popular library for handling routing in React applications. It allows you to define different routes for your application and navigate between them, enabling multi-page functionality in a single-page application. 

# Test it by yourself
### Install project locally:
1. Clone this repo:

```git clone (https://github.com/organick-store/web)```

2. Change directory to organick:

```cd organick/```

3. Install project dependencies

```npm install```

4. Start liveserver

```npm start```
