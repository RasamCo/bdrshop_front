/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AddCategoryRequest {
   parentId?: string | null;
  name: string;
  slug: string;
  description: string;
  icon?: string;
}

export interface CategoryTreeNode {
  id: string;
  name: string;
  slug: string;
  parentId?: string | null;
  children?: CategoryTreeNode[];
  IsActive:boolean;
  DisplayOrder:Int16Array;

}
///for update
 export interface GetCategoryByIdForUpdateQuery{
  Id:string;
 }

export interface CategoryResponseById {
  id: string;
  parentId: string;
  parentName: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  displayOrder: number;
  isActive: boolean;

}
export interface CategoryResultById {
  success: boolean;
  message: string;
  data?: CategoryResponseById;
  error?: any;
}


export interface UpdateCategoryRequest {
  id:string;
  parentId?: string | null;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  isactive:boolean;
}


