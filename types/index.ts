import { LucideIcon } from "lucide-react";

export interface NavRoute {
  href: string;
  label: string;
  Icon: LucideIcon;
}

export type UploadFileResponse =
  | { data: UploadData; error: null }
  | { data: null; error: UploadError };

export type UploadData = {
  key: string;
  url: string;
  name: string;
  size: number;
};

export type UploadError = {
  code: string;
  message: string;
  data?: any;
};

export interface InventoryItem {
  id: string;
  element: string;
  class: string;
  subclass?: string | null;
  brand?: string | null;
  totalQuantity: number;
  availableQuantity: number;
}

export interface ReportPageProps {
  inventory: InventoryItem[];
}