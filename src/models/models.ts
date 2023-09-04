import Realm from "realm";

export type BlogCategory = {
  _id: Realm.BSON.ObjectId;
  count?: number;
  name?: string;
  slug?: string;
};

export const BlogCategorySchema = {
  name: 'BlogCategory',
  properties: {
    _id: 'objectId',
    count: 'int?',
    name: 'string?',
    slug: 'string?',
  },
  primaryKey: '_id',
};

export type Brand = {
  _id: Realm.BSON.ObjectId;
  name: string;
};

export const BrandSchema = {
  name: 'Brand',
  properties: {
    _id: 'objectId',
    name: 'string',
  },
  primaryKey: '_id',
};

export type Category = {
  _id: Realm.BSON.ObjectId;
  name?: string;
  slug?: string;
};

export const CategorySchema = {
  name: 'Category',
  properties: {
    _id: 'objectId',
    name: 'string?',
    slug: 'string?',
  },
  primaryKey: '_id',
};

export type Media = {
  _id: Realm.BSON.ObjectId;
  height?: number;
  url?: string;
  width?: number;
};

export const MediaSchema = {
  name: 'Media',
  properties: {
    _id: 'objectId',
    height: 'int?',
    url: 'string?',
    width: 'int?',
  },
  primaryKey: '_id',
};

export type Post = {
  _id: Realm.BSON.ObjectId;
  author?: string;
  blog_categories: Realm.List<Category>;
  comments?: number;
  content?: string;
  date?: Date;
  image: Realm.List<Media>;
  slug?: string;
  tittle?: string;
};

export const PostSchema = {
  name: 'Post',
  properties: {
    _id: 'objectId',
    author: 'string?',
    blog_categories: 'Category[]',
    comments: 'int?',
    content: 'string?',
    date: 'date?',
    image: 'Media[]',
    slug: 'string?',
    tittle: 'string?',
  },
  primaryKey: '_id',
};

export type PostType = {
  _id: Realm.BSON.ObjectId;
  name: string;
};

export const PostTypeSchema = {
  name: 'PostType',
  properties: {
    _id: 'objectId',
    name: 'string',
  },
  primaryKey: '_id',
};

export type Product = {
  _id: Realm.BSON.ObjectId;
  brands: Realm.List<Brand>;
  categories: Realm.List<Category>;
  featured?: boolean;
  name: string;
  new?: boolean;
  pictures: Realm.List<Media>;
  price?: number;
  ratings?: number;
  review?: number;
  sale_price?: number;
  short_desc?: string;
  slug?: string;
  sm_pictures: Realm.List<Media>;
  sold?: number;
  stock?: number;
  top?: boolean;
  until?: string;
  variants: Realm.List<Variant>;
};

export const ProductSchema = {
  name: 'Product',
  properties: {
    _id: 'objectId',
    brands: 'Brand[]',
    categories: 'Category[]',
    featured: 'bool?',
    name: 'string',
    new: 'bool?',
    pictures: 'Media[]',
    price: 'double?',
    ratings: 'double?',
    review: 'int?',
    sale_price: 'double?',
    short_desc: 'string?',
    slug: 'string?',
    sm_pictures: 'Media[]',
    sold: 'int?',
    stock: 'int?',
    top: 'bool?',
    until: 'string?',
    variants: 'Variant[]',
  },
  primaryKey: '_id',
};

export type Size = {
  _id: Realm.BSON.ObjectId;
  name: string;
};

export const SizeSchema = {
  name: 'Size',
  properties: {
    _id: 'objectId',
    name: 'string',
  },
  primaryKey: '_id',
};

export type Variant = {
  _id: Realm.BSON.ObjectId;
  color?: string;
  color_name?: string;
  price?: number;
  size: Realm.List<Size>;
};

export const VariantSchema = {
  name: 'Variant',
  properties: {
    _id: 'objectId',
    color: 'string?',
    color_name: 'string?',
    price: 'double?',
    size: 'Size[]',
  },
  primaryKey: '_id',
};
