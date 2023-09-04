import { GraphQLString } from 'graphql';
import gql from 'graphql-tag';


export const TESTANDO = gql`
query{
  brands(order:objectId_ASC){
    edges{
      node{
        objectId
        name
        createdAt
      }
    }
  }
}
`

export const GET_PRODUCTS2 = gql`
query teste {
  products {
    edges {
      node {
        name
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
        categories {
            edges {
    node {
      name
      slug
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
}


`

export const GET_PRODUCTS3 = gql`
query products {
  products {
    _id
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
    short_desc
    categories {
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

export const GET_PRODUCTS = gql`
    query products($searchTerm: String, $color: [String], $size: [String], $brand: [String], $minPrice: Int, $maxPrice: Int, $category: String, $rating: [String], $sortBy: String, $page: Int = 1, $perPage: Int, $list: Boolean = false, $from: Int = 0) {
        products(demo: ${process.env.NEXT_PUBLIC_DEMO}, searchTerm: $searchTerm, color: $color, size: $size, brand: $brand, minPrice: $minPrice, maxPrice: $maxPrice, category: $category, rating: $rating, sortBy: $sortBy, page: $page, perPage: $perPage, list: $list, from: $from) {
            data {
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
                short_desc @include(if: $list)
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
            totalCount
        }
    }
`

export const GET_PRODUCT = gql`
    query product($slug: String!, $onlyData: Boolean = false) {
        product(demo: ${process.env.NEXT_PUBLIC_DEMO}, slug: $slug, onlyData: $onlyData) {
            single {
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
                short_desc
                category {
                    name
                    slug
                }
                brands {
                    name
                    slug
                }
                pictures {
                    width
                    height
                    url
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

            prev @skip(if: $onlyData) {
                slug
                name
                sm_pictures {
                    width
                    height
                    url
                }
            }

            next @skip(if: $onlyData) {
                slug
                name
                sm_pictures {
                    width
                    height
                    url
                }
            }

            related @skip(if: $onlyData) {
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
    query postsByPage ($page: String!, $category: String) {
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

export function translator_GET_PRODUCTS(data) {
  console.log("data")
  var translation = JSON.parse(data)
  console.log(translation);


  if(Array.isArray(translation)){
    translation.forEach((value, index) => {
      
      if(value.node){
        translation[index] = value.node
    
      }
    });
  }else{
    
      
      if(value.edges){
        translation= value.edges
    
      }


  }






//return translation
}


/*
export function translator_GET_PRODUCTS(data) {
  console.log("data")
  var translation = JSON.parse(data)
  console.log(translation);


  for(var i =0; i<translation.length; i++){
    translation[i] = translation[i].node;
    translation[i].sm_pictures = translation[i].sm_pictures.edges
    translation[i].sm_pictures.forEach((value, index) => {
      translation[i].sm_pictures[index] = value.node
    });
    //translation[i].sm_pictures = translation[i].sm_pictures.node
  }






return translation
}
*/