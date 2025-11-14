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