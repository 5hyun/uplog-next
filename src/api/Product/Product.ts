import {
  FailCreateProduct,
  FailProduct,
  ProductBody,
  ProductData,
  ProductEditBody,
  ProductEditData,
} from '@/typings/product.ts';
import { AxiosResponse } from 'axios';
import { instance } from '@/api';

// 제품 생성
export const products = async (data: ProductBody) => {
  try {
    const res: AxiosResponse<ProductData | FailProduct> = await instance.post(
      `/members/${data.memberId}/products`,
      data
    );

    return res.data;
  } catch (error) {
    return 'create product fail';
  }
};

// 제품 정보 수정
export const productEdit = async (data: ProductEditBody) => {
  try {
    const res: AxiosResponse<ProductEditData> = await instance.patch(
      `/products/${data.productId}`,
      data
    );

    return res.data;
  } catch (error) {
    return 'edit product fail';
  }
};

// 제품 정보 조회
export const eachProduct = async (productId: number) => {
  try {
    const res: AxiosResponse<ProductData | FailProduct> = await instance.get(
      `/products/${productId}`
    );

    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    return 'get product info fail';
  }
};
