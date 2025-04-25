export enum BreadcrumbTypes {
  Navigation = 'navigation',
  Static = 'static',
}

export interface IBreadCrumbItem {
  label: string;
  link: string;
}
