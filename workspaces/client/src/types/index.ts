export interface IAppRouter {
  path: string;
  element: JSX.Element;
  guard: boolean;
  children?: IAppRouter[];
}
