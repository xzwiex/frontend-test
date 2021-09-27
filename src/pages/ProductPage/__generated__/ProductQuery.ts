/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductGender } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: ProductQuery
// ====================================================

export interface ProductQuery_product_data_brandInfo {
  __typename: "BrandInfo";
  /**
   * brand name
   */
  name: string;
}

export interface ProductQuery_product_data_rating {
  __typename: "Rating";
  /**
   * average rating mark
   */
  avgRate: number | null;
}

export interface ProductQuery_product_data_reviews {
  __typename: "ProductReviews";
  /**
   * total reviews count
   */
  count: number;
}

export interface ProductQuery_product_data_descriptionSections_DataProductDescriptionSection {
  __typename: "DataProductDescriptionSection";
  id: string;
  title: string;
}

export interface ProductQuery_product_data_descriptionSections_TextProductDescriptionSection {
  __typename: "TextProductDescriptionSection";
  id: string;
  title: string;
  text: string;
}

export type ProductQuery_product_data_descriptionSections = ProductQuery_product_data_descriptionSections_DataProductDescriptionSection | ProductQuery_product_data_descriptionSections_TextProductDescriptionSection;

export interface ProductQuery_product_data {
  __typename: "Product";
  /**
   * product id
   */
  id: any;
  /**
   * product name
   */
  name: string;
  /**
   * use brandInfo
   *  brand info
   */
  brandInfo: ProductQuery_product_data_brandInfo;
  /**
   * product image (on request from front-end team)
   */
  image: string;
  /**
   * product rating statistics
   */
  rating: ProductQuery_product_data_rating | null;
  /**
   * user reviews
   */
  reviews: ProductQuery_product_data_reviews | null;
  /**
   * product description
   */
  description: string | null;
  /**
   * product type
   */
  type: string;
  /**
   * product sex
   */
  gender: ProductGender;
  /**
   * unit of product
   */
  unit: string | null;
  /**
   * product description sections, eg 'How to use', 'Ingredients', 'Disclaimer'
   */
  descriptionSections: ProductQuery_product_data_descriptionSections[] | null;
}

export interface ProductQuery_product {
  __typename: "ProductPayload";
  data: ProductQuery_product_data | null;
}

export interface ProductQuery {
  /**
   * get product
   */
  product: ProductQuery_product;
}

export interface ProductQueryVariables {
  slug: string;
}
