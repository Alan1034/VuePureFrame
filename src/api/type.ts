export interface ServerResponseBaseType<T = unknown> {
  status?: number;
  code?: number;
  message?: string;
  success?: boolean;
  data?: T;
}
