import { GraphQLString } from "graphql"
import gql from "graphql-tag"

export const INSERT_PRODUCT = gql`
  mutation INSERT_PRODUCT(
    $name: String!
    $description: String!
    $price: Float!
    $stock: Int!
    $categories: [ObjectId]!
    $images: [MediumInsertInput]
  ) {
    insertOneProduct(
      data: {
        name: $name
        description: $description
        price: $price
        stock: $stock
        categories: { link: $categories }
        images: { create: $images }
      }
    ) {
      _id
      name
      description
      price
      stock
      categories {
        name
      }
      images {
        url
      }
    }
  }
`
export const UPDATE_PRODUCT = gql`
  mutation UPDATE_PRODUCT(
    $_id: ObjectId!
    $name: String
    $description: String
    $price: Float
    $stock: Int
    $categories: [ObjectId]
    $images: [MediumInsertInput]
  ) {
    updateOneProduct(
      query: { _id: $_id }
      set: {
        name: $name
        description: $description
        price: $price
        stock: $stock
        categories: { link: $categories }
        images: { create: $images }
      }
    ) {
      _id
      name
      description
      price
      stock
      categories {
        name
      }
      images {
        url
      }
    }
  }
`

export const GET_PRODUCTS = gql`
  query products {
    products {
      _id
      name
      price
      sale_price
      review
      ratings
      until
      stock
      top
      featured
      new
      description
      categories {
        _id
        name
        slug
      }
      images {
        url
      }
      variants {
        color
        color_name
        price
        size {
          name
        }
      }
    }
  }
`

export const GET_PRODUCT = gql`
  query product($id: ObjectId!) {
    product(query: { _id: $id }) {
      _id
      name

      price
      sale_price
      review
      ratings
      until
      stock
      top
      featured
      new
      description
      categories {
        _id
        name
        slug
      }
      images {
        url
      }
      variants {
        color
        color_name
        price
        size {
          name
        }
      }
    }
  }
`

export const DELETE_PRODUCT = gql`
  mutation DELETE_PRODUCT($_id: ObjectId!) {
    deleteOneProduct(query: { _id: $_id }) {
      _id
    }
  }
`

export const product = {
  INSERT_PRODUCT,
  GET_PRODUCT,
  GET_PRODUCTS,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
}

export const GET_CATEGORIES = gql`
  query products {
    categories {
      _id
      name
    }
  }
`

export const GET_ELEMENT_PRODUCTS = gql`
  query elementProducts {
    elementProducts {
      id
      name
      slug
      price
      sale_price
      review
      ratings
      until
      stock
      top
      featured
      new
      category {
        name
        slug
      }
      sm_pictures {
        width
        height
        url
      }
      variants {
        color
        color_name
        price
        size {
          name
        }
      }
    }
  }
`

export const GET_ELEMENT_POSTS = gql`
  query elementPosts {
    elementPosts {
      id
      author
      comments
      content
      date
      slug
      title
      type
      blog_categories {
        name
        slug
      }
      image {
        width
        height
        url
      }
    }
  }
`

export const GET_POSTS_BY_PAGE = gql`
  query postsByPage($page: String!, $category: String) {
    postsByPage(page: $page, category: $category) {
      data {
        id
        author
        comments
        content
        date
        slug
        title
        type
        blog_categories {
          name
          slug
        }
        image {
          width
          height
          url
        }
      }

      categories {
        name
        slug
        count
      }
    }
  }
`

export const GET_POST = gql`
  query post($slug: String!) {
    post(slug: $slug) {
      single {
        id
        author
        comments
        content
        date
        slug
        title
        type
        blog_categories {
          name
          slug
        }
        image {
          width
          height
          url
        }
      }

      prev {
        id
        slug
        title
      }

      next {
        id
        slug
        title
      }

      related {
        id
        author
        comments
        content
        date
        slug
        title
        type
        blog_categories {
          name
          slug
        }
        image {
          width
          height
          url
        }
      }

      categories {
        name
        slug
        count
      }
    }
  }
`

export const GET_HOME_DATA = gql`
  query {
    homeResponse(id: "8fk058oo3m") {
      products {
        edges {
          node {
            id
            name
            slug
            price
            sale_price
            review
            rating
            until
            stock
            top
            featured
            new
            categories {
              edges {
                node {
                  name
                }
              }
            }
            sm_pictures {
              edges {
                node {
                  width
                  height
                  file {
                    url
                  }
                }
              }
            }
            variants {
              edges {
                node {
                  color
                  color_name
                  price
                  sizes {
                    edges {
                      node {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      posts {
        edges {
          node {
            id
            author
            comments
            date
            slug
            tittle
            type {
              name
            }
            blog_categories {
              edges {
                node {
                  name
                  slug
                }
              }
            }
            image {
              edges {
                node {
                  width
                  height
                  file {
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
