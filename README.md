# Test task for frontend developer position at Scentbird

- It is necessary to develop the task, using the boilerplate, available at the link: [frontend-test](https://github.com/scentbird/frontend-test)

- Send a link to the repository with the completed task to andrei@scentbird.com


## Initializing

- Install the correct version of nodejs (nvm or asdf)

- Installing packages `npm install`

- Launch an application for development `npm start`

- Launching an application for a production build `npm run build`

- Accessing the application in a browser `http://localhost:8080`


## General

1. The task is to implement a SPA application on React and using TypeScript.

1. Use of types **mandatory** for all components.

1. It is mandatory to use react-router for routing.

1. For styles need to use SCSS styles (LESS, POSTCSS) using css modules.

1. Any library (formik, formular) can be used to work with the form.

1. In the description below in addition to the main tasks are additional tasks, it is marked as (DOP). They are not required, but will be a plus if you complete them.

1. We would like you to use modern language features.

1. If you have any questions about the task - do not hesitate to ask.


## Task

The application should have routing to navigate on the `/product/:id`, `/checkout` pages.

The design `design/App.sketch` does not provide page navigation - make the header links to these pages in any way you see fit. Links should have default and active styles.

### Product page

1. The page contains two columns (desktop, tablet landscape styles): a picture column on the left side / a product information column on the right side. These columns should be adaptive (width in %).

1. When selecting the volume of an item (1.7oz Subscription), the information in the selected item block (above) should change.

1. When you click on "Read more >" the inscription should be replaced by "< Show less" and open the text (you can use any text).

1. (DOP) Pay attention to the behavior of the "Add to queue" button on different screens: if it is placed in the same row as the "selected item" block, it should be on the same level with it, otherwise it is moved to a new line and occupies the entire width of the screen.

1. (DOP) On the mobile version, pay attention to "1.7 oz One-time", the word "purchase" is hidden there. Come up with a solution to hide it, otherwise you can write everywhere without the word.

### Form Page

1. The *"Use this address... "* checkbox should display the same form below as the *Shipping address* form above, except for the *"Telephone "* field. The title of this form should be *"Billing address "*.

1. Add validation to the form: only alphabetic characters can be used in First Name, Last Name fields. In Street address - numbers, spaces, dashes, letters. All fields except Apt/Suite should be required.

1. When the form is submitted, the console should display an object with field data

1. (DOP) You can use native selections in the form, but it would be a plus to write your own drop-down list component.

1. (DOP) The Back button should lead to the page from which the transition was made.


### Infrastructure

1. (DOP) Export styles to a separate file for production builds

2. (DOP) Use real data for the product page from public graphql.

Endpoint: `https://api.scentbird.com/graphql`

An example of a product request:
```graphql
query Product {
  product(input: { slug: "1000"}) {
    data {
      id
      name
      brandInfo {
        name
      }
      image(fullSizeImage: true)
      rating {
        avgRate
      }
      reviews {
        count
      }
      description
      descriptionSections {
       	id
        title
        ...on TextProductDescriptionSection {
          text
        }
      }
    }
  }
}

```
